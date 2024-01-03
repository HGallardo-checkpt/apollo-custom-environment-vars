const nameVariable = document.getElementById("name-variable");
const valueVariable = document.getElementById("value-variable");

const submitButton = document.getElementById( "submit-button" );
const checkButton = document.getElementById( "check-button");

const addButton = document.getElementById( "add-button");
const container = document.getElementById("container");
const counterVars = document.getElementById("counter");

counterVars.style.visibility = 'hidden'
const date = new Date();

function loadVariablesFile(){
    cockpit.file("/tmp/environment/file-env-vars.txt").read()
    .then((content, tag) => {
        var n = 0

        var data = content.split("\n");
        data.forEach(element => {
           if(element){
            values =  element.split("=")
            var inputName = document.createElement("input");
            inputName.id = n + "-var" ;
            inputName.name = n + "-var" ;
            inputName.type = "text";
            inputName.size = 55
            inputName.value = values[0]
            var inputValue = document.createElement("input");
            inputValue.id = n + "-value";
            inputValue.name = n + "-value";
            inputValue.type = "text";
            inputValue.size = 55
            inputValue.value = values[1].replace("'","")

            container.appendChild(inputName);
            container.appendChild(inputValue);
           }
            
        });
 
       
       
       
    })
    .catch(error => {
        console.log(error)
    });
}

function submit(){
   
    backupChanges()
    var x =  counterVars.getAttribute('value');
    for(i = 0; i <= x; i++){
        
        var variable = document.getElementById(i + "-var");
        var value = document.getElementById(i + "-value");
        cockpit.script("echo " + variable.value.toUpperCase() + "=" + value.value.toUpperCase() + " >> /tmp/environment/file-env-vars.txt");


    }
    clean()
    loadVariablesFile();

}

function addVariable(){
    clean();
    cockpit.script("echo " + nameVariable.value.toUpperCase() + "=" + valueVariable.value.toUpperCase() + " >> /tmp/environment/file-env-vars.txt");
    loadVariablesFile()
}

function backupChanges(){
    var timestamp = date.getTime()
    cockpit.script( "mv /tmp/environment/file-env-vars.txt  /tmp/environment/file-env-vars"+ timestamp +".txt ").then(result => {
        console.log("****************")
        console.log(result)
        console.log("****************")

   
    })
    .fail((exception, data) => {
        console.error(`get os list returned error: "${JSON.stringify(exception)}", data: "${JSON.stringify(data)}"`);
    });

}
function clean(){
    nameVariable.value = "";
    valueVariable.value = "";
    container.innerHTML = "";
}

checkButton.addEventListener("click", loadVariablesFile);
submitButton.addEventListener("click", submit);
addButton.addEventListener("click", addVariable);