/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "RCTRootView.h"
#import "CodePush.h"
#import "RCTSplashScreen.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  #ifdef DEBUG
    // run with Scheme "GeoEncoding DEBUG" to load jscode from Packager and be able to debug in Chrome
    // set dev=false to enable optimisation/minifying process.
    // Use this for running on simulator.
    jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
  #elif RUN_DEVICE
    // run with scheme "GeoEncoding RUN_DEVICE" to bundle jscode with app and bypass CodePush.
    // Use this for running your own jscode changes that haven't been pushed to CodePush
    jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  #elif DEBUG_DEVICE
    // run with scheme "GeoEncoding DEBUG_DEIVCE" and change <YOUR_MACHINE_IP> in URLWithString to be your own machines ip address
    // Use this for running on device with debugging in Chrome
    jsCodeLocation = [NSURL URLWithString:@"http://<YOUR_MACHINE_IP>:8081/index.ios.bundle?platform=ios&dev=true"];
  #else
    // run with Scheme "GeoEncoding RELEASE" to load jscode from optimised/minified jsbundle on disk (performed by CodePush)
    // under this mode, jsbundle on disk is generated during "Bundle React Native code and images" build phase
    // and you will LOSE the ability to debug in Chrome
    jsCodeLocation = [CodePush bundleURL];
  #endif

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"GeoEncoding"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  [RCTSplashScreen show:rootView];
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
