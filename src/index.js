const logLevelVariable = document.getElementById("log-level-variable");
const logLevelValue = document.getElementById("log-level-value");

function loadVariablesFile(){
    cockpit.file("/tmp/environment/file-env-vars.txt").read()
    .then((content, tag) => {

        var row = content.split("\n");
        var values = row.split("=")
        logLevelVariable.value = values[0]
        logLevelValue.value = values[1]
        console.log(content)
        console.log("**************")
        console.log(tag)
    })
    .catch(error => {
        console.log("xxxxxxxxxxxxxxxxx")
        console.log(error)
    });
}

function submit(){
   
    cockpit.script("echo " + logLevelVariable.value.toUpperCase() + "=" + logLevelValue.value + " >> /tmp/environment/file-env-vars.txt");

}
check_button.addEventListener("click", loadVariablesFile);
submit_button.addEventListener("click", submit);