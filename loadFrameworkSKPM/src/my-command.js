import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/

const NibUI = require('../assets/modalContentView.xib')
var nib = NibUI()

export default function() {
  sketch.UI.message("It's alive 🙌")

  let buttonTargetFunction = (sender) => {
    console.log("button clicked")
    let url = NSURL.alloc().initWithString('https://www.apple.com')
    NSWorkspace.sharedWorkspace().openURL(url)
  }

  nib.button.setCOSJSTargetFunction(sender => buttonTargetFunction(sender))

  let dialog = NSAlert.alloc().init()
  dialog.setAccessoryView(nib.getRoot())
  dialog.runModal()
}
