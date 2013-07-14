Wordpress Boilerplate
================================

About
-----
Wordpress boilerplate was created to make building themes faster and smarter. I used <a href="https://github.com/magic-fields-team/Magic-Fields-2" target="_blank">magicfields 2</a> in the past but wanted to make something my own that didn't rely on a plugin. I ran into Tammy Hart's <a href="https://github.com/tammyhart/Reusable-Custom-WordPress-Meta-Boxes" target="_blank">metabox repo</a> and thought it was awesome. The repo is no longer being supported so I figured I'd expand and improve upon it. 

Donate
------
Like Wordpress Boilerplate?
<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Q8SZJQDLXXMB4" target="_blank">Please Donate Here</a>

Requirements
-------------------------

- Wordpress 3.5+ (I haven't tested on anything lower)
- Ruby
- Compass (has Sass bundled)
- nodejs
- grunt

Installation OSX
-------------------------------

- open terminal
- "paste this in terminal if you don't have homebrew"
- ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"
- brew install node
- sudo gem install compass
- "put password then you may have to restart terminal when install is done"
- npm install -g grunt-cli
- "make sure you cd to the root of wordpress-boilerplate before you run npm install"
- npm install
- grunt

Installation Windows
------------------------------

- open cmd in administrator mode
- "paste and run the following if you don't have chocolatey package manager"
- @powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%systemdrive%\chocolatey\bin - See more at: http://chocolatey.org/#sthash.h0aLYwyK.dpuf
- cinst ruby
- cinst nodejs.install
- "close cmd when install completes then open it up again in administrator mode"
- gem install compass
- npm install -g grunt-cli
- "make sure you cd to the root of wordpress-boilerplate before you run npm install"
- npm install
- grunt

Documentation on custom metabox class is coming soon
----------------------------------------------------

- Reference /inc/metabox/sample.php file for all the available types of fields
- You can also check this <a href="https://github.com/tammyhart/Reusable-Custom-WordPress-Meta-Boxes/wiki/Field-Arrays">wiki page</a> out from the original author

Future
------

- I'm planning on adding html5 input validation along with a shim for older browsers that don't support html5 validation
- I'll add a parameter for setting position of the metabox if it appears in sidebar or not
- I'll add additional helper functions for themeing along with some documentation and examples on how to use them