let sketch = require('sketch')

var onRun = function(context) {
    sketch.UI.message("Hello There 👋")

    sketch.UI.alert("Error", "Please try again")

    sketch.UI.getInputFromUser(
        "What's your name",
        { initialValue: "Appleseed" },
        (error, value) => {
            if (error) {
            // most likely the user canceled the input
            return
            }
            // do something with value
            sketch.UI.message(value)
        }
    )
}
