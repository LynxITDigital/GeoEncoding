# GeoEncoding [![Build Status](https://travis-ci.org/LynxITDigital/GeoEncoding.svg?branch=master)](https://travis-ci.org/LynxITDigital/GeoEncoding)

A react-native example for ListView, MapView, ImageView, NavigationBar, react-redux which runs on both iOS and Android

Install node modeules
```shell
npm install
```

# CodePush
Now you can update your app remotely without going through app store using CodePush. Currently it work for iOS only.

To bundle
```shell
react-native bundle --platform ios --entry-file index.ios.js --bundle-output main.jsbundle --dev false
```

To release
```shell
code-push release GeoEncoding main.jsbundle 1.0.0 --deploymentName Production
```
