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
- [x] Custom splash screen
- [x] Network download
- [ ] Network upload
- [ ] Barcode scanner
- [ ] Location update (background)
- [ ] Push notification
- [ ] Expandable listview
- [ ] Thumbnail view with preview
- [ ] Sidebar drawer
- [ ] Performance testing for listview (load a few thousands record to our listview)


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
# Jest Tests
* run the tests
  * Run "npm test <test suit name>" to test a special suit;
  * or simply run "npm test" to get through all test suits in verbose mode.

* generate test coverage
  * Run "npm run coverage" to generate both a simple coverage chart within console and html coverage report under /coverage/

![alt tag](https://github.com/LynxITDigital/Screenshots/blob/master/test_coverage.png)


#Screenshots
## Search

![alt tag](https://github.com/LynxITDigital/Screenshots/blob/master/Search.gif)

## Toast
### iOS
![alt tag](https://github.com/LynxITDigital/Screenshots/blob/master/Toast.gif)

### Android
![alt tag](https://github.com/LynxITDigital/Screenshots/blob/master/Toast_Android.gif)

## Tab Bar
### iOS
![alt tag](https://github.com/LynxITDigital/Screenshots/blob/master/Tabbar_iOS.gif)

### Android
![alt tag](https://github.com/LynxITDigital/Screenshots/blob/master/Tabbar_Android.gif)
