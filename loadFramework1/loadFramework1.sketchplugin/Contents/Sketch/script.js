let sketch = require('sketch')

let fiber = require('sketch/async').createFiber()

var onRun = function(context) {
    try {
        runPlugin()
    }
    catch(e) {
        let pluginURL = context.plugin.url()
        let bundlePath = NSBundle.bundleWithURL(pluginURL).resourceURL().path()
        let loadFramework = Mocha.sharedRuntime().loadFrameworkWithName_inDirectory('HelloSketch', bundlePath)
        console.log(pluginURL, bundlePath, loadFramework)
        if (loadFramework) {
            runPlugin()
        }
    }
};

function runPlugin() {
    let main = HSMain.alloc().init()
    sketch.UI.message(main.helloText())
    main.loadNibFile()

    main.setCallbackButtonClick((object) => {
        console.log(object)
        sketch.UI.message("Button Clicked")
    })
}
