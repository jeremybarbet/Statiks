Statiks
========

Statiks is a mobile application for iPhone allowing you to connect several social networks and retrieve your details stats.
You can reload your networks and consult for each network how many followers you gained (or lost) through dynamic graph.

I keep improving, fixing, adding new networks and more stats. Feel free to contribute.

[Visit the application's website](http://statiks.jeremybarbet.com)

TODO
----

* Save on AsyncStorage before making an update
* Export the fetch logic with parse.res() and catch(err)
* Add response ok check and throw error otherwise
* When release pressure remove item
* Interpolate x offset to scale the delete icon with gesture value instead of a fix value

Changelog
---------

__v0.0.1__

* Current developement version

Development
-----------

If you think about a new feature, or just fix some issues, feel free to fork this project.
There are only few things to set up.

__Repository__

You need first to [fork](https://github.com/statiks/statiks-react-native/fork) the project.

Now, make a clone of this fork on your computer.

`git clone https://github.com/[your_github_username]/statiks-react-native.git`  

__Running__

Statiks run with react-native npm dependencies.

`npm install`  
`npm start`

__Launching__

* Follow the react-native [docs](http://facebook.github.io/react-native/releases/0.20/docs/getting-started.html#requirements) to set up the dev environnement
* Go to `cd statiks-react-native`
* Open `ios/statiks.xcodeproj` and hit run in Xcode.
* Hit `⌘-R` in your iOS simulator to reload the app and see your change!
* Voilà

Contributors
------------

* Jérémy Barbet [@JeremDsgn](https://twitter.com/JeremDsgn)
