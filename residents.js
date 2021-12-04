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
                                    data["height"],
                                    data["mass"],
                                    data["skin_color"],
                                    data["hair_color"],
                                    data["eye_color"],
                                    data["birth_year"],
                                    data["gender"]]
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
