//
//  HSMain.m
//  HelloSketch
//
//  Created by Kevin Gutowski on 8/17/19.
//  Copyright © 2019 Kevin. All rights reserved.
//

#import "HSMain.h"
@import AppKit;
@import JavaScriptCore;

// __attribute__((weak_import)) means "hey compiler, don't expect this class to be defined in this framework, it's not"
__attribute__((weak_import)) @interface MOJavaScriptObject : NSObject

@property (readonly) JSObjectRef JSObject;
@property (readonly) JSContextRef JSContext;

@end

// Declare a helper function we can use to call it easily
JSValue* callFunctionWithArguments(MOJavaScriptObject* boxedFunction, NSArray* argumentsArray) {
	JSContext *context = [JSContext contextWithJSGlobalContextRef:(JSGlobalContextRef)boxedFunction.JSContext];
	JSValue *function = [JSValue valueWithJSValueRef:boxedFunction.JSObject inContext:context];
	
	return [function callWithArguments:argumentsArray];
}

@implementation HSMain {
	MOJavaScriptObject *_buttonCallback;
	MOJavaScriptObject *_closeCallback;
}

- (NSString *)helloText {
	NSLog(@"HelloSketch (Sketch Plugin)");
	return @"Hiya, sending singal from HSMain";
}

- (id)loadNibFile {
	NSArray *topLevelObjects;
	NSBundle *myBundle = [NSBundle bundleForClass:[HSMain class]];
	if (! [myBundle loadNibNamed:@"HSPanel" owner:self topLevelObjects:&topLevelObjects])
	{
		NSLog(@"Warning! Could not load the nib file.\n");
		return NULL;
	} else {
		return topLevelObjects;
	}
}

- (IBAction)buttonClicked:(id)sender {
	if (!_buttonCallback) return;
	
	callFunctionWithArguments(_buttonCallback, @[@"Hi there"]);
}

- (void)setCallbackButtonClick:(MOJavaScriptObject*)function {
	_buttonCallback = function;
}

- (void)setCallbackForClose:(MOJavaScriptObject*)function {
	_closeCallback = function;
}

- (void)closePanel {
	NSLog(@"Closing from closepanel in framework");
	[panel close];
}

- (void)windowWillClose:(NSNotification *)notification {
	if (!_closeCallback) return;
	
	NSLog(@"Closing!! Inside framework");
	callFunctionWithArguments(_closeCallback, @[notification]);
}

@end
