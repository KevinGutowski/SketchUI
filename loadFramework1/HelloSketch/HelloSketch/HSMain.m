//
//  HSMain.m
//  HelloSketch
//
//  Created by Kevin Gutowski on 8/17/19.
//  Copyright © 2019 Kevin. All rights reserved.
//

#import "HSMain.h"
@import AppKit;

@implementation HSMain

- (NSString *)helloText {
	NSLog(@"HelloSketch (Sketch Plugin)");
	return @"Hiya, sending singal from HSMain";
}

- (id)loadNibFile {
	// The myNib file must be in the bundle that defines self's class.
	NSArray *topLevelObjects;
	NSBundle *myBundle = [NSBundle bundleForClass:[HSMain class]];
	if (! [myBundle loadNibNamed:@"HSPanel" owner:self topLevelObjects:&topLevelObjects])
	{
		NSLog(@"Warning! Could not load myNib file.\n");
		return NULL;
	} else {
		return topLevelObjects;
	}
}

@end
