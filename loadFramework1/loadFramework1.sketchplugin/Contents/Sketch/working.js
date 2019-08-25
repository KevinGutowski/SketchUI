let sketch = require('sketch')
var Settings = require('sketch/settings')

let threadID = "com.loadFramework"
let threadDictionary = NSThread.mainThread().threadDictionary()

var onRun = function(context) {
    if (threadDictionary[threadID]) {
        console.log("triggered")
        closeMyPanel()
    } else {

        loadFramework()
        try {
            let tryToRunPlugin = runPlugin()
        } catch(e) {
            console.error(e)
        }

        if (tryToRunPlugin) {
            let fiber = require('sketch/async').createFiber()
        }
    }
}

function loadFramework() {
    let bundlePath = process.cwd() + "/Contents/Resources"
    console.log(bundlePath)
    let loadFramework = Mocha.sharedRuntime().loadFrameworkWithName_inDirectory('HelloSketch', bundlePath)
    if (loadFramework) {
        return true
    } else {
        return false
    }
}

function closeMyPanel() {
    let main = threadDictionary[threadID]

    try {
        console.log(main)
        main.closePanel()
        threadDictionary[threadID] = null
    } catch(e) {
        console.error(e)
    }
}

function runPlugin() {
    let main = HSMain.alloc().init()
    threadDictionary[threadID] = main
    sketch.UI.message(main.helloText())
    main.loadNibFile()

    main.setCallbackButtonClick((object) => {
        console.log("Button Clicked")
        sketch.UI.message("Button Clicked")
    })

    main.setCallbackForClose((object) => {
        console.log("Closing")
        sketch.UI.message('Closing...')
        threadDictionary[threadID] = null
        fiber.cleanup()
    })

    return true
}
