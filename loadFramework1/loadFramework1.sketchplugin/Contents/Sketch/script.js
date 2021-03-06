let sketch = require('sketch')
var Settings = require('sketch/settings')

let fiber = require('sketch/async').createFiber()
let main

var onRun = function(context) {
    if (main) {
        closeMyPanel()
    } else {
        loadFramework()
        try {
            runPlugin()
        } catch(e) {
            console.error(e)
        }
    }
}

function loadFramework() {
    let bundlePath = process.cwd() + "/Contents/Resources"
    let loadFramework = Mocha.sharedRuntime().loadFrameworkWithName_inDirectory('HelloSketch', bundlePath)

    if (loadFramework) {
        return true
    } else {
        return false
    }
}

function closeMyPanel() {
    try {
        main.closePanel()
    } catch(e) {
        console.error(e)
    }
}

function runPlugin() {
    main = HSMain.alloc().init()
    sketch.UI.message(main.helloText())
    main.loadNibFile()

    main.setCallbackButtonClick((object) => {
        console.log("Button Clicked")
        sketch.UI.message("Button Clicked")
    })

    main.setCallbackForClose((object) => {
        console.log("Closing")
        sketch.UI.message('Closing...')
        main = null
        fiber.cleanup()
    })
}
