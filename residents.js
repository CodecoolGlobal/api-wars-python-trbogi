/*$(document).ready(function(){

 $('.modalButton').click(function(){

   var links = $(this).data('data-residents');

   // AJAX request
    for (let aLink of links ){
        showResidents(aLink)
    }
      $('#residentsModal').modal('show');

  });
 });
*/
let modalTable = document.querySelector(".modal-body .table .tbody")
let modal = document.querySelector("#residentsModal")
let modalButtons = document.querySelectorAll(".modalButton")

function showResidents(APILinks){
    console.log(APILinks)
    /*for (let link of APILinks){
            fetch(link).then(response => response.json())
            .then(data => {
                console.log(data)
               /* let tr = document.createElement('TR');
                tr.classList.add("row");
                let dataForTable = [data.results["name"],
                                    data.results["height"],
                                    data.results["mass"],
                                    data.results["skin_color"],
                                    data.results["hair_color"],
                                    data.results["eye_color"],
                                    data.results["birth_year"],
                                    data.results["gender"]]
                for(let j=0; j<dataForTable.length; j++){
                    let td = document.createElement('TD');
                    td.classList.add("col");
                    td.innerHTML = dataForTable[j]
                    tr.appendChild(td);
                }
                modalTable.appendChild(tr)
          })
         }*/
}

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
    let modalTable = document.querySelector(".modal-body .table tbody")
    let modalTitle = document.querySelector(".modal-title")
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
                    console.log(dataForTable[j])
                    let td = document.createElement('TD');
                    td.classList.add("col");
                    td.innerHTML = dataForTable[j]
                    tr.appendChild(td);
                }
                modalTable.appendChild(tr)

            })
    }


}
