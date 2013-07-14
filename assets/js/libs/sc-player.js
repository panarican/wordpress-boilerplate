define(['jquery', 'sugar', 'jquery.cookie', 'jquery.mobile.events'], function($){

// Had to modify the plugin to generate different markup and offer two diff templates

/*
*   SoundCloud Custom Player jQuery Plugin
*   Author: Matas Petrikas, matas@soundcloud.com
*   Copyright (c) 2009  SoundCloud Ltd.
*   Licensed under the MIT license:
*   http://www.opensource.org/licenses/mit-license.php
*
*   Usage:
*   <a href="http://soundcloud.com/matas/hobnotropic" class="sc-player">My new dub track</a>
*   The link will be automatically replaced by the HTML based player
*/

(function($) {
  // Convert milliseconds into Hours (h), Minutes (m), and Seconds (s)
  var timecode = function(ms) {
    var hms = function(ms) {
          return {
            h: Math.floor(ms/(60*60*1000)),
            m: Math.floor((ms/60000) % 60),
            s: Math.floor((ms/1000) % 60)
          };
        }(ms),
        tc = []; // Timecode array to be joined with '.'

    if (hms.h > 0) {
      tc.push(hms.h);
    }

    tc.push((hms.m < 10 && hms.h > 0 ? "0" + hms.m : hms.m));
    tc.push((hms.s < 10  ? "0" + hms.s : hms.s));

    return tc.join('.');
  };
  // shuffle the array
  var shuffle = function(arr) {
    arr.sort(function() { return 1 - Math.floor(Math.random() * 3); } );
    return arr;
  };

  var debug = true,
      useSandBox = false,
      $doc = $(document),
      log = function(args) {
        try {
          if(debug && window.console && window.console.log){
            window.console.log.apply(window.console, arguments);
          }
        } catch (e) {
          // no console available
        }
      },
      domain = useSandBox ? 'sandbox-soundcloud.com' : 'soundcloud.com',
      secureDocument = (document.location.protocol === 'https:'),
      // convert a SoundCloud resource URL to an API URL
      scApiUrl = function(url, apiKey) {
        var resolver = ( secureDocument || (/^https/i).test(url) ? 'https' : 'http') + '://api.' + domain + '/resolve?url=',
            params = 'format=json&consumer_key=' + apiKey +'&callback=?';

        // force the secure url in the secure environment
        if( secureDocument ) {
          url = url.replace(/^http:/, 'https:');
        }

        // check if it's already a resolved api url
        if ( (/api\./).test(url) ) {
          return url + '?' + params;
        } else {
          return resolver + url + '&' + params;
        }
      };

  // TODO Expose the audio engine, so it can be unit-tested
  var audioEngine = function() {
    var html5AudioAvailable = function() {
        var state = false;
        try{
          var a = new Audio();
          state = a.canPlayType && (/maybe|probably/).test(a.canPlayType('audio/mpeg'));
          // uncomment the following line, if you want to enable the html5 audio only on mobile devices
          // state = state && (/iPad|iphone|mobile|pre\//i).test(navigator.userAgent);
        }catch(e){
          // there's no audio support here sadly
        }

        return state;
    }(),
    callbacks = {
      onReady: function() {
        $doc.trigger('scPlayer:onAudioReady');
      },
      onPlay: function() {
        $doc.trigger('scPlayer:onMediaPlay');
      },
      onPause: function() {
        $doc.trigger('scPlayer:onMediaPause');
      },
      onEnd: function() {
        $doc.trigger('scPlayer:onMediaEnd');
      },
      onBuffer: function(percent) {
        $doc.trigger({type: 'scPlayer:onMediaBuffering', percent: percent});
      }
    };

    var html5Driver = function() {
      var player = new Audio(),
          onTimeUpdate = function(event){
            var obj = event.target,
                buffer = ((obj.buffered.length && obj.buffered.end(0)) / obj.duration) * 100;
            // ipad has no progress events implemented yet
            callbacks.onBuffer(buffer);
            // anounce if it's finished for the clients without 'ended' events implementation
            if (obj.currentTime === obj.duration) { callbacks.onEnd(); }
          },
          onProgress = function(event) {
            var obj = event.target,
                buffer = ((obj.buffered.length && obj.buffered.end(0)) / obj.duration) * 100;
            callbacks.onBuffer(buffer);
          };

      $('<div class="sc-player-engine-container"></div>').appendTo(document.body).append(player);

      // prepare the listeners
      player.addEventListener('play', callbacks.onPlay, false);
      player.addEventListener('pause', callbacks.onPause, false);
      // handled in the onTimeUpdate for now untill all the browsers support 'ended' event
      player.addEventListener('timeupdate', onTimeUpdate, false);
      player.addEventListener('progress', onProgress, false);


      return {
        load: function(track, apiKey) {
          player.pause();
          player.src = track.stream_url + (/\?/.test(track.stream_url) ? '&' : '?') + 'consumer_key=' + apiKey;
          player.load();
          player.play();
        },
        play: function() {
          player.play();
        },
        pause: function() {
          player.pause();
        },
        stop: function(){
          if (player.currentTime) {
            player.currentTime = 0;
            player.pause();
          }
        },
        seek: function(relative){
          player.currentTime = player.duration * relative;
          player.play();
        },
        getDuration: function() {
          return player.duration * 1000;
        },
        getPosition: function() {
          return player.currentTime * 1000;
        },
        setVolume: function(val) {
          player.volume = val / 100;
        }
      };

    };



    var flashDriver = function() {
      var engineId = 'scPlayerEngine',
          player,
          flashHtml = function(url) {
            var swf = (secureDocument ? 'https' : 'http') + '://player.' + domain +'/player.swf?url=' + url +'&amp;enable_api=true&amp;player_type=engine&amp;object_id=' + engineId;
            if ($.browser.msie) {
              return '<object height="100%" width="100%" id="' + engineId + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" data="' + swf + '">'+
                '<param name="movie" value="' + swf + '" />'+
                '<param name="allowscriptaccess" value="always" />'+
                '</object>';
            } else {
              return '<object height="100%" width="100%" id="' + engineId + '">'+
                '<embed allowscriptaccess="always" height="100%" width="100%" src="' + swf + '" type="application/x-shockwave-flash" name="' + engineId + '" />'+
                '</object>';
            }
          };


      // listen to audio engine events
      // when the loaded track is ready to play
      soundcloud.addEventListener('onPlayerReady', function(flashId, data) {
        player = soundcloud.getPlayer(engineId);
        callbacks.onReady();
      });

      // when the loaded track finished playing
      soundcloud.addEventListener('onMediaEnd', callbacks.onEnd);

      // when the loaded track is still buffering
      soundcloud.addEventListener('onMediaBuffering', function(flashId, data) {
        callbacks.onBuffer(data.percent);
      });

      // when the loaded track started to play
      soundcloud.addEventListener('onMediaPlay', callbacks.onPlay);

      // when the loaded track is was paused
      soundcloud.addEventListener('onMediaPause', callbacks.onPause);

      return {
        load: function(track) {
          var url = track.uri;
          if(player){
            player.api_load(url);
          }else{
            // create a container for the flash engine (IE needs this to operate properly)
            $('<div class="sc-player-engine-container"></div>').appendTo(document.body).html(flashHtml(url));
          }
        },
        play: function() {
          player && player.api_play();
        },
        pause: function() {
          player && player.api_pause();
        },
        stop: function(){
          player && player.api_stop();
        },
        seek: function(relative){
          player && player.api_seekTo((player.api_getTrackDuration() * relative));
        },
        getDuration: function() {
          return player && player.api_getTrackDuration && player.api_getTrackDuration() * 1000;
        },
        getPosition: function() {
          return player && player.api_getTrackPosition && player.api_getTrackPosition() * 1000;
        },
        setVolume: function(val) {
          if(player && player.api_setVolume){
            player.api_setVolume(val);
          }
        }

      };
    };

    return html5AudioAvailable? html5Driver() : flashDriver();

  }();

  var apiKey,
      didAutoPlay = false,
      players = [],
      updates = {},
      currentUrl,
      loadTracksData = function($player, links, key) {

        var index = 0,
            playerObj = {node: $player, tracks: []},
            loadUrl = function(link) {

              var apiUrl = scApiUrl(link.url, apiKey);


$.ajax({
  dataType: "jsonp",
  type: 'get',
  url: apiUrl,
  async: true,
  success: function(data){


                // log('data loaded', link.url, data);
                index += 1;
                if(data.tracks){
                  // log('data.tracks', data.tracks);
                  playerObj.tracks = playerObj.tracks.concat(data.tracks);
                }else if(data.duration){
                  // a secret link fix, till the SC API returns permalink with secret on secret response
                  data.permalink_url = link.url;
                  // if track, add to player
                  playerObj.tracks.push(data);
                }else if(data.creator){
                  // it's a group!
                  links.push({url:data.uri + '/tracks'});
                }else if(data.username){
                  // if user, get his tracks or favorites
                  if(/favorites/.test(link.url)){
                    links.push({url:data.uri + '/favorites'});
                  }else{
                    links.push({url:data.uri + '/tracks'});
                  }
                }else if($.isArray(data)){
                  playerObj.tracks = playerObj.tracks.concat(data);
                }
                if(links[index]){
                  // if there are more track to load, get them from the api
                  loadUrl(links[index]);
                }else{
                  // if loading finishes, anounce it to the GUI
                  playerObj.node.trigger({type:'onTrackDataLoaded', playerObj: playerObj, url: apiUrl});
                }



             //}); //end get json



  }
});


             
           };
        // update current API key
        apiKey = key;
        // update the players queue
        players.push(playerObj);
        // load first tracks
        loadUrl(links[index]);
      },
      artworkImage = function(track, usePlaceholder) {
        if(usePlaceholder){
          return '<div class="sc-loading-artwork">Loading Artwork</div>';
        }else if (track.artwork_url) {
          return '<img src="' + track.artwork_url.replace('-large', '-t300x300') + '"/>';
        }else{
          return '<div class="sc-no-artwork">No Artwork</div>';
        }
      },
      updateTrackInfo = function($player, track) {
        // update the current track info in the player
        // log('updateTrackInfo', track);
        $('.sc-info', $player).each(function(index) {

          if(!$(this).find('.copy').hasClass('expanded')) {
              $(this).html('<div class="copy"> <span class="track-title">' + track.title + '</span> <span class="track-divider">—</span> ' + '<span class="track-description">' + ( track.description || 'no Description' ) + '</span> </div> <div class="copy-toggle">Read More</div> ' );
          }

        });
 
        // update duration for player "mainly main player"
        $player.find('.sc-duration').html(timecode(track.duration));

        $player.trigger('onPlayerTrackSwitch.scPlayer', [track]);

        $.scPlayer.updateTrackWidth();
      },
      play = function(track) {
        var url = track.permalink_url;
        if(currentUrl === url){
          // log('will play');
          audioEngine.play();
        }else{
          currentUrl = url;
          // log('will load', url);
          audioEngine.load(track, apiKey);
        }
      },
      getPlayerData = function(node) {
      
        return players[$(node).data('sc-player').id];
      },
      updatePlayStatus = function(player, status) {
        if(status){
          // reset all other players playing status
          $('div.sc-player.playing').removeClass('playing');
        }
        $(player)
          .toggleClass('playing', status)
          .trigger((status ? 'onPlayerPlay' : 'onPlayerPause'));
      },
      onPlay = function(player, id) {


        var track = getPlayerData(player).tracks[id || 0];
      
        updateTrackInfo(player, track);
        // cache the references to most updated DOM nodes in the progress bar
        updates = {
          $buffer: $('.sc-buffer', player),
          $played: $('.sc-played', player),
          position:  $('.sc-position', player)[0]
        };
        updatePlayStatus(player, true);
        play(track);
      },
      onPause = function(player) {
        updatePlayStatus(player, false);
        audioEngine.pause();
      },
      onFinish = function() {
        var $player = updates.$played.closest('.sc-player'),
            $nextItem;
        // update the scrubber width
        updates.$played.css('width', '0%');
        // show the position in the track position counter
        updates.position.innerHTML = timecode(0);
        // reset the player state
        updatePlayStatus($player, false);
        // stop the audio
        audioEngine.stop();
        $player.trigger('onPlayerTrackFinish');
      },
      onSeek = function(player, relative) {
        audioEngine.seek(relative);
        $(player).trigger('onPlayerSeek');
      },
      onSkip = function(player) {
        var $player = $(player);
        // continue playing through all players
        log('track finished get the next one');
        $nextItem = $('.sc-trackslist li.active', $player).next('li');
        // try to find the next track in other player
        if(!$nextItem.length){
          $nextItem = $player.nextAll('div.sc-player:first').find('.sc-trackslist li.active');
        }
        $nextItem.click();
      },
      soundVolume = function() {
        var vol = 80,
            cooks = document.cookie.split(';'),
            volRx = new RegExp('scPlayer_volume=(\\d+)');
        for(var i in cooks){
          if(volRx.test(cooks[i])){
            vol = parseInt(cooks[i].match(volRx)[1], 10);
            break;
          }
        }
        return vol;
      }(),
      onVolume = function(volume) {
        var vol = Math.floor(volume);
        // save the volume in the cookie
        var date = new Date();
        date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
        soundVolume = vol;
        document.cookie = ['scPlayer_volume=', vol, '; expires=', date.toUTCString(), '; path="/"'].join('');
        // update the volume in the engine
        audioEngine.setVolume(soundVolume);
      },
      positionPoll;

    // listen to audio engine events
    $doc
      .bind('scPlayer:onAudioReady', function(event) {
        log('onPlayerReady: audio engine is ready');
        audioEngine.play();
        // set initial volume
        onVolume(soundVolume);
      })
      // when the loaded track started to play
      .bind('scPlayer:onMediaPlay', function(event) {
        clearInterval(positionPoll);
        positionPoll = setInterval(function() {
          var duration = audioEngine.getDuration(),
              position = audioEngine.getPosition(),
              relative = (position / duration);

          // update the scrubber width
          updates.$played.css('width', (100 * relative) + '%');
          // show the position in the track position counter
          updates.position.innerHTML = timecode(position);
          // announce the track position to the DOM
          $doc.trigger({
            type: 'onMediaTimeUpdate.scPlayer',
            duration: duration,
            position: position,
            relative: relative
          });
        }, 500);
      })
      // when the loaded track is was paused
      .bind('scPlayer:onMediaPause', function(event) {
        clearInterval(positionPoll);
        positionPoll = null;
      })
      // change the volume
      .bind('scPlayer:onVolumeChange', function(event) {
        onVolume(event.volume);
      })
      .bind('scPlayer:onMediaEnd', function(event) {
        onFinish();
      })
      .bind('scPlayer:onMediaBuffering', function(event) {
        updates.$buffer.css('width', event.percent + '%');
      });


  // Generate custom skinnable HTML/CSS/JavaScript based SoundCloud players from links to SoundCloud resources
  $.scPlayer = function(options, node) {


    var opts = $.extend({}, $.scPlayer.defaults, options),
        playerId = players.length,
        $source = node && $(node),
        sourceClasses = $source[0].className.replace('sc-player', ''),
        links = opts.links || $.map($('a', $source).add($source.filter('a')), function(val) { return {url: val.href, title: val.innerHTML}; }),

        $player = $('<div class="sc-player loading"></div>').data('sc-player', {id: playerId}),
        //$artworks = $('<ol class="sc-artwork-list"></ol>').appendTo($player),
        $info = $('<div class="sc-toggle-tracklist icon-up"></div>').appendTo($player),
        $info = $('<div class="sc-info"></div>').appendTo($player),
        $controls = $('<div class="sc-controls"></div>').appendTo($player),
        $scrubber = $('<div class="sc-scrubber"></div>').appendTo($player),
        $bottom = $('<div class="bottom"><div class="icon-pager-previous"></div><div class="icon-pager-next"></div></div>').appendTo($player),
        $listWrap = $('<div class="sc-tracklist-wrap"></div>').appendTo($bottom),
        $list = $('<ol class="sc-trackslist"></ol>').appendTo($listWrap);

        // add the classes of the source node to the player itself
        // the players can be indvidually styled this way
        if(sourceClasses || opts.customClass){
          $player.addClass(sourceClasses).addClass(opts.customClass);
        }


        // adding controls to the player
        $player
          .find('.sc-controls')
            .append('<a href="#prev" class="sc-prev icon-previous"></a> <a href="#play" class="sc-play icon-play"></a> <a href="#pause" class="sc-pause icon-pause"></a> <a href="#next" class="sc-next icon-next"></a>')
          .end().find('.sc-scrubber')
          .append('<div class="sc-time-span"><div class="sc-waveform-container"></div><div class="sc-buffer"></div><div class="sc-played"></div></div><div class="sc-time-indicators"><span class="sc-position"></span> <span class="sc-divider">|</span> <span class="sc-duration"></span></div>')

        // load and parse the track data from SoundCloud API
        loadTracksData($player, links, opts.apiKey);

     

        // init the player GUI, when the tracks data was laoded
        $player.bind('onTrackDataLoaded.scPlayer', function(event) {
          // log('onTrackDataLoaded.scPlayer', event.playerObj, playerId, event.target);
          var tracks = event.playerObj.tracks;
          if (opts.randomize) {
            tracks = shuffle(tracks);
          }


                // create the playlist
                $.each(tracks, function(index, track) {
                  var active = index === 0;
                  // create an item in the playlist
        

          if(opts.customClass == "main") {

                  // li template
                  var li = '<li>';
                      li += artworkImage(track, false);
                      li += '<a href="' + track.permalink_url + '">';
                      li += track.title;
                      li += '</a>';
                      li += '<span class="sc-track-duration">';
                      li += timecode(track.duration);
                      li += '</span>';
                      li += '<span class="icon-pause"></span>';
                      li += '<span class="icon-play"></span>';
                      li += '<span class="icon-remove" data-track="'+track.permalink_url+'"></span>';
                      li += '</li>'; 

              } else {


                  // li template
                  var li = '<li>';
                      li += '<a href="' + track.permalink_url + '">';
                      li += track.title;
                      li += '</a>';
                      li += '<span class="sc-track-duration">';
                      li += timecode(track.duration);
                      li += '</span>';
                      li += '</li>'; 

              }        


                  $(li).data('sc-track', {id:index}).toggleClass('active', active).appendTo($list);

                });



          // update the element before rendering it in the DOM
          $player.each(function() {
            if($.isFunction(opts.beforeRender)){
              opts.beforeRender.call(this, tracks);
            }
          });


          // set the first track's duration
          if(typeof $('.sc-duration', $player)[0] != "undefined") {
              $('.sc-duration', $player)[0].innerHTML = timecode(tracks[0].duration);
              $('.sc-position', $player)[0].innerHTML = timecode(0);
              // set up the first track info
              updateTrackInfo($player, tracks[0]);
          }

          // if continous play enabled always skip to the next track after one finishes
          if (opts.continuePlayback) {
            $player.bind('onPlayerTrackFinish', function(event) {
              onSkip($player);
            });
          }

          // announce the succesful initialization
          $player
            .removeClass('loading')
            .trigger('onPlayerInit');

          // if auto play is enabled and it's the first player, start playing
          if(opts.autoPlay && !didAutoPlay){
            onPlay($player);
            didAutoPlay = true;
          }
        });


    // replace the DOM source (if there's one)
    $source.each(function(index) {
      $(this).replaceWith($player);
    });

    return $player;
  };




$.scPlayer.updateTrackWidth = function(){
    // set width of ul
 if(!$('.main-player.sc-player').length) return false;
    var currPlayerId = $('.main-player').data('sc-player').id,
        currPlayer = players[currPlayerId],
        $playlist = $('.main-player-wrap').find('.sc-trackslist'),
        playListArrows = $playlist.find('.icon-pager-previous').outerWidth(true) + $playlist.find('.icon-pager-next').outerWidth(true),
        playListWidth = ( $playlist.find('li').outerWidth(true) *  currPlayer.tracks.length  ) + playListArrows;

    $playlist.css('width', playListWidth);

}


  $.scPlayer.addTrack = function(url) {

      var url = url,
          apiUrl = scApiUrl(url, '2a4aaa627cb0ca3b6809ec29aa2f2cea'),
          $playList = $('.main-player').find('ol');
      
          // return false if no playlist
          if( ! $playList.find('li').length ) return false;

      var currPlayer = $('.main-player').data('sc-player').id;

      // return false if track already been clicked (addTrack already called)
      if( $('.post-players [data-track*="'+url+'"]').hasClass('clicked') ) return false;

      // click flag
      $('.post-players [data-track*="'+url+'"]').addClass('clicked');

      $.getJSON(apiUrl, function(data) {

             // li template
            var li = '<li onclick="return false;">';
                li += artworkImage(data, false);
                li += '<a href="' + data.permalink_url + '" onclick="return false;">';
                li += data.title;
                li += '</a>';
                li += '<span class="sc-track-duration">';
                li += timecode(data.duration);
                li += '</span>';
                li += '<span class="icon-pause"></span>';
                li += '<span class="icon-play"></span>';
                li += '<span class="icon-remove" data-track="'+data.permalink_url+'"></span>';
                li += '</li>'; 

                // add li to playlist
              $(li).data('sc-track', {id: ( players[currPlayer].tracks.length ) }).appendTo($playList);

              // update Player queue
              players[currPlayer].tracks.push(data);

              // once it's in the main player set the class to added
              $('.post-players [data-track*="'+url+'"]')
              .removeClass('icon-add').addClass('icon-added');

              // add active class if only one track
              if ( players[currPlayer].tracks.length == 1 ) {
                $playList.find('li').addClass('active');
              }

              $.scPlayer.updateTrackWidth();
              setTimeout(function(){
                $.scPlayer.updateTrackWidth();
              },1000);
      });


  
  };


  $.scPlayer.removeTrack = function(url) {

      // remove url protocol
      var url = url.remove(/.*?:\/\//g).split('?')[0];

      // remove li 
      var $track = $('.main-player a[href*="'+url+'"]').closest('li');

      // current player
      var currPlayer = $('.main-player').data('sc-player').id;

      // remove track
      $track.remove();

      // pause all audio when removeTracks allows for error free playing of tracks
      $.scPlayer.stopAll();

      // update playlist data
      $('.main-player ol li').each(function(i){
          $(this).data('sc-track', {id: i});
      });


      // update player queue
      players[currPlayer].tracks.remove(function(n) {
          return ( 
               n['permalink_url'] == ("http://" + url) 
            || n['permalink_url'] == ("https://" + url) 
            );      
      });

      // if no tracks then hide player
    if(players[currPlayer].tracks.length == 0 ) {
        $('.main-player').empty().removeClass('sc-player main expanded');
    }

    $.scPlayer.updateTrackWidth();

    setTimeout(function(){
      $.scPlayer.updateTrackWidth();
    },1000);+

    
      // reset fields
      $('.main-player').find('.track-title').empty()
      .end().find('.sc-duration, .sc-position').text("0.00");

      // set first li as active
      $('.main-player li').removeClass('active');
      $('.main-player li:eq(0)').addClass('active');

}

  // stop all players, might be useful, before replacing the player dynamically
  $.scPlayer.stopAll = function() {
        audioEngine.stop();
        var $scPlayers = $('.sc-player, .main-player');
        $scPlayers.removeClass('playing').find('.sc-played')
        .css('width', '0%').end()
        .end().find('.sc-position').html('0.00');
  };


  $.scPlayer.nextTrack = function() {
        var $track = $('.main-player').find('li.active').next(),
            _trackIndex = $track.index();

        // play track
        $track.trigger('click');

        // scrollRight 
        if (_trackIndex == -1) return false;        
        $.scPlayer.scrollRight(_trackIndex);

     
  };


  $.scPlayer.prevTrack = function() {
     var $track = $('.main-player').find('li.active').prev(),
          _trackIndex = $track.index();

     // play track
     $track.trigger('click');
    
      // scrollLeft
     if(_trackIndex == -1) return false;   
     $.scPlayer.scrollLeft(_trackIndex);
  };


  $.scPlayer.scrollLeft = function(trackIndex) {
    var $scroll = $('.sc-tracklist-wrap'),
        _scrollAmount = 190,
        _itemWidth = (trackIndex) ? trackIndex * _scrollAmount : '-=' + _scrollAmount;

    $scroll.stop().animate({
      'scrollLeft': _itemWidth
    });

  }


  $.scPlayer.scrollRight = function(trackIndex) {
      var $scroll = $('.sc-tracklist-wrap'),
          _scrollAmount = 190,
          _itemWidth = (trackIndex) ? trackIndex * _scrollAmount : '+=' + _scrollAmount;

    $scroll.stop().animate({
      'scrollLeft': _itemWidth
    });

  }


  // destroy all the players and audio engine, usefull when reloading part of the page and audio has to stop
  $.scPlayer.destroy = function() {
    $('.sc-player, .sc-player-engine-container').remove();
  };

  // plugin wrapper
  $.fn.scPlayer = function(options) {
    // reset the auto play
    didAutoPlay = false;
    // create the players
    this.each(function() {
      $.scPlayer(options, this);
    });
    return this;
  };

  // default plugin options
  $.scPlayer.defaults = $.fn.scPlayer.defaults = {
    customClass: null,
    // do something with the dom object before you render it, add nodes, get more data from the services etc.
    beforeRender  :   function(tracksData) {
      var $player = $(this);
    },
    // initialization, when dom is ready
    onDomReady  : function() {
      $('a.sc-player, div.sc-player').not('.main-player').scPlayer();
    },
    autoPlay: false,
    continuePlayback: true,
    randomize: false,

// dev 2a4aaa627cb0ca3b6809ec29aa2f2cea
// live 52507f3fdd13dbe8b078be073621b69f


    apiKey: '2a4aaa627cb0ca3b6809ec29aa2f2cea'
  };


  // the GUI event bindings
  //--------------------------------------------------------

  // toggling play/pause
  $(document).on('tap click','a.sc-play, a.sc-pause', function(event) {
    var $list = $(this).closest('.sc-player').find('ol.sc-trackslist');
    // simulate the click in the tracklist
    $list.find('li.active').click();
    return false;
  });

  // previous track
  $(document).on('tap click','a.sc-prev', function(event) {
    $.scPlayer.prevTrack();
    return false;
  });

  // next track
  $(document).on('tap click','a.sc-next', function(event) {
    $.scPlayer.nextTrack();
    return false;
  });

  // tracklist scroll right
  $(document).on('tap', '.main-player .icon-pager-next', function(event) {
    $.scPlayer.scrollRight();
    return false;
  });

  // tracklist scroll left
  $(document).on('tap', '.main-player .icon-pager-previous', function(event) {
    $.scPlayer.scrollLeft();
    return false;
  });

  // toggle tracklist
  $(document).on('tap', '.sc-toggle-tracklist', function(event){
    var $this = $(this);

    // update width of tracklist
    $.scPlayer.updateTrackWidth();

    // expand tracklist and update icon
    if($this.hasClass('icon-up')) {
      $this.closest('.sc-player').addClass('expanded');
      $this.removeClass('icon-up').addClass('icon-down');
    } else {
      $this.closest('.sc-player').removeClass('expanded');
      $this.removeClass('icon-down').addClass('icon-up');
    }
  });

  // selecting tracks in the playlist
  $(document).on('tap click','.sc-trackslist li', function(event) {
    var $track = $(this),
        $player = $track.closest('.sc-player'),
        trackId = $track.data('sc-track').id,
        play = $player.is(':not(.playing)') || $track.is(':not(.active)'),
        currPlayer = $player.data('sc-player').id;

    if (play) {
      onPlay($player, trackId);

    }else{
      onPause($player);
    }
    $track.addClass('active').siblings('li').removeClass('active');
    $('.artworks li', $player).each(function(index) {
      $(this).toggleClass('active', index === trackId);
    });
    return false;
  });

  var scrub = function(node, xPos) {
    var $scrubber = $(node).closest('.sc-time-span'),
        $buffer = $scrubber.find('.sc-buffer'),
        $available = $scrubber.find('.sc-waveform-container'),
        $player = $scrubber.closest('.sc-player'),
        relative = Math.min($buffer.width(), (xPos  - $available.offset().left)) / $available.width();
    onSeek($player, relative);
  };

  var onTouchMove = function(ev) {
    if (ev.targetTouches.length === 1) {
      scrub(ev.target, ev.targetTouches && ev.targetTouches.length && ev.targetTouches[0].clientX);
      ev.preventDefault();
    }
  };

  // seeking in the loaded track buffer
  $(document)
    .on('tap click','.sc-time-span', function(event) {
      scrub(this, event.pageX);
      return false;
    })
    .on('touchstart','.sc-time-span', function(event) {
      this.addEventListener('touchmove', onTouchMove, false);
      event.originalEvent.preventDefault();
    })
    .on('touchend','.sc-time-span', function(event) {
      this.removeEventListener('touchmove', onTouchMove, false);
      event.originalEvent.preventDefault();
    });

  // changing volume in the player
  var startVolumeTracking = function(node, startEvent) {
    var $node = $(node),
        originX = $node.offset().left,
        originWidth = $node.width(),
        getVolume = function(x) {
          return Math.floor(((x - originX)/originWidth)*100);
        },
        update = function(event) {
          $doc.trigger({type: 'scPlayer:onVolumeChange', volume: getVolume(event.pageX)});
        };
    $node.bind('mousemove.sc-player', update);
    update(startEvent);
  };

  var stopVolumeTracking = function(node, event) {
    $(node).unbind('mousemove.sc-player');
  };

  $(document)
    .on('mousedown','.sc-volume-slider', function(event) {
      startVolumeTracking(this, event);
    })
    .on('mouseup','.sc-volume-slider', function(event) {
      stopVolumeTracking(this, event);
    });

  $doc.bind('scPlayer:onVolumeChange', function(event) {
    $('span.sc-volume-status').css({width: event.volume + '%'});
  });
  // -------------------------------------------------------------------

  // the default Auto-Initialization
  $(function() {
    if($.isFunction($.scPlayer.defaults.onDomReady)){
      $.scPlayer.defaults.onDomReady();
    }
  });

})(jQuery);



}); // end define