const nameVariable = document.getElementById("name-variable");
const valueVariable = document.getElementById("value-variable");
const modifyButton = document.getElementById( "submit-button" );
const checkButton = document.getElementById( "check-button");
const addButton = document.getElementById( "add-button");
const container = document.getElementById("container");

function loadVariablesFile(){
    cockpit.file("/tmp/environment/file-env-vars.txt").read()
    .then((content, tag) => {

        var data = content.split("\n");
        data.forEach(element => {
           if(element){
            values =  element.split("=")
            nameVariable.value = values[0]
            valueVariable.value = values[1].replace("'","")
            var inputName = document.createElement("input");
            var inputValue = document.createElement("input");
            inputName.type = "text";
            inputName.name = nameVariable;
            inputName.size = 55
            inputValue.type = "text";
            inputValue.name = nameVariable;
            inputValue.size = 55

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
   
    cockpit.script("echo " + nameVariable.value.toUpperCase() + "=" + valueVariable.value.toUpperCase() + " >> /tmp/environment/file-env-vars.txt");
    loadVariablesFile()
}

 
checkButton.addEventListener("click", loadVariablesFile);
submitButton.addEventListener("click", submit);