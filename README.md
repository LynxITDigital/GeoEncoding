# GeoEncoding [![Build Status](https://travis-ci.org/LynxITDigital/GeoEncoding.svg?branch=master)](https://travis-ci.org/LynxITDigital/GeoEncoding)

A react-native example for ListView, MapView, ImageView, NavigationBar, react-redux which runs on both iOS and Android

#Features
- [x] Listview
- [x] Imageview
- [x] Mapview
- [x] Redux
- [x] Router
- [x] Jest tests
- [x] Sqlite
- [x] Tabbar
- [x] CodePush
- [x] Travis
- [x] Video Player
- [x] Network request
- [x] Toast notification (When adding an address to Favourites)
- [ ] Network download
- [ ] Network upload
- [ ] Barcode scanner
- [x] Custom splash screen


Install node modeules
```shell
npm install
```

# CodePush
Now you can update your app remotely without going through app store using CodePush. It works with both iOS and Android.

To bundle
```shell
react-native bundle --platform ios --entry-file index.ios.js --bundle-output main.jsbundle --dev false
```

To release
```shell
code-push release GeoEncoding main.jsbundle 1.0.0 --deploymentName Production
```
# Run Scheme and debug in Chrome
* OPTION 1
Run with Scheme "GeoEncoding DEBUG" to load jscode from Packager and be able to debug in Chrome

* OPTION 2
Run with Scheme "GeoEncoding RELEASE" to load jscode from optimised/minified jsbundle on disk (performed by CodePush)
Under this mode, jsbundle within GeoEncoding.app is generated during "Bundle React Native code and images" build phase;
and you will LOSE the ability to debug in Chrome
