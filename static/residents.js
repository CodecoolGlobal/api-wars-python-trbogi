let modalTable = document.querySelector(".modal-body .table tbody")
let modalTitle = document.querySelector(".modal-title")

function triggerModalButtons(){
    let buttons = document.getElementsByClassName("modalButton")
    for (let button of buttons){
        button.addEventListener("click", changeModalContent)
}
}


function changeModalContent(e) {
    let stringAPILinks = e.target.dataset['residents']
    let APILinks = stringAPILinks.split(",");
    let planetName = e.target.dataset['planet']
    modalTitle.innerHTML = "Residents of " + planetName
    modalTable.innerHTML = ""
    for (let link of APILinks){
            fetch(link).then(response => response.json())
            .then(data => {
                let tr = document.createElement('TR');
                tr.classList.add("row");
                let dataForTable = [data["name"],
                                    convertHeightToMeter(data["height"]),
                                    convertStringToNumberWithKg(data["mass"]),
                                    data["skin_color"],
                                    data["hair_color"],
                                    data["eye_color"],
                                    data["birth_year"],
                                    createGenderEmoji(data["gender"])]
                for(let j=0; j<dataForTable.length; j++){
                    let td = document.createElement('TD');
                    td.classList.add("col");
                    td.innerHTML = dataForTable[j]
                    tr.appendChild(td);
                }
                modalTable.appendChild(tr)

            })
    }
}

function convertStringToNumberWithKg(string){
    if (string != "unknown"){
        return string + " kg";
    }else{
        return "unknown"
    }
}

function convertHeightToMeter(string){
    if (string != "unknown"){
        let heightInCm = parseInt(string)
        let heightInM = heightInCm / 100
        return heightInM + " m";
    }else{
        return "unknown"
    }
}

function createGenderEmoji(gender){
    if (gender != "n/a"){
        if (gender == "female"){
            return '♂️'
        }else{
            return '♀️'
        }
    }else{
        return "n/a"
    }
}
