/**
 * Appcelerator Titanium Mobile
 * This is generated code. Do not modify. Your changes will be lost.
 * Generated code is Copyright (c) 2009 by Appcelerator, Inc.
 * All Rights Reserved.
 */
#import <Foundation/Foundation.h>

@protocol TitaniumAppAssetResolver
- (NSData*) resolveAppAsset:(NSURL*)url;
- (oneway void)release;
- (id)retain;
@end

@interface ApplicationRouting : NSObject<TitaniumAppAssetResolver> {
}
- (NSData*) resolveAppAsset:(NSURL*)url;
- (NSData*) pageNamedAbout;
- (NSData*) pageNamedIndex;
- (NSData*) pageNamedResults;
- (NSData*) pageNamedSearch;
- (NSData*) styleNamedCss_app;
- (NSData*) styleNamedCss_smoothness_jquery_ui_1_7_1_custom;
- (NSData*) scriptNamedJs_index;
- (NSData*) scriptNamedJs_jquery_1_3_2_min;
- (NSData*) scriptNamedJs_jquery_ui_1_7_1_custom_min;
- (NSData*) scriptNamedJs_json2_min;
- (NSData*) scriptNamedJs_results;
- (NSData*) scriptNamedJs_search;
- (NSData*) scriptNamedJs_util;
- (NSData*) styleNamedTiui_css_tiui;
- (NSData*) scriptNamedTiui_js_tiui;

@end
