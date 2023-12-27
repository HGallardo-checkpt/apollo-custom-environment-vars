const nameVariable = document.getElementById("name-variable");
const valueVariable = document.getElementById("value-variable");
const submitButton = document.getElementById( "submit-button" );
const checkButton = document.getElementById( "check-button");

function loadVariablesFile(){
    cockpit.file("/tmp/environment/file-env-vars.txt").read()
    .then((content, tag) => {

        var data = content.split("\n");
        data.forEach(element => {
            console.log(element)
            console.log("**************")
            values =  element.split("=")
            nameVariable.value = values[0]
            valueVariable.value = values[1]
        });
 
       
       
       
    })
    .catch(error => {
        console.log("xxxxxxxxxxxxxxxxx")
        console.log(error)
    });
}

function submit(){
   
    cockpit.script("echo " + nameVariable.value.toUpperCase() + "=" + valueVariable.value + " >> /tmp/environment/file-env-vars.txt");

}
checkButton.addEventListener("click", loadVariablesFile);
submitButton.addEventListener("click", submit);