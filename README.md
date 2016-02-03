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
- [ ] Toast notification (When adding an address to Favourites)
- [ ] Network download
- [ ] Network upload
- [ ] Barcode scanner


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
