//
//  HSMain.h
//  HelloSketch
//
//  Created by Kevin Gutowski on 8/17/19.
//  Copyright © 2019 Kevin. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Cocoa/Cocoa.h>

NS_ASSUME_NONNULL_BEGIN

@interface HSMain : NSObject <NSWindowDelegate> {
	IBOutlet NSPanel *panel;
}

- (NSString *)helloText;
- (void)closePanel;

@end

NS_ASSUME_NONNULL_END
