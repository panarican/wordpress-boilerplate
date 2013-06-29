Wordpress Boilerplate
================================

Requirements
-------------------------

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