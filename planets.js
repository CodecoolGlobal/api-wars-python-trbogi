let PLANETS = "https://swapi.dev/api/planets/"
let tableBody = document.querySelector("#tablebody")
let nextPageLink = null
let previousPageLink = null


fetch(PLANETS).then(response => response.json())
.then(data => {
    nextPageLink = data.next
    showHideButton(previousPageLink,previousButton)
    showHideButton(nextPageLink,nextButton)
    for(let i=0; i<data.results.length; i++){
        var tr = document.createElement('TR');
        tr.classList.add("row");
        let dataForTable = [data.results[i]["name"], convertStringToNumberWithUnit(data.results[i]["diameter"]), data.results[i]["climate"], data.results[i]["terrain"], convertStringToNumberWithPercentage(data.results[i]["surface_water"]), convertStringToNumberWithDecimals(data.results[i]["population"])]
        for(let j=0; j<dataForTable.length; j++){
            var td = document.createElement('TD');
            td.classList.add("col");
            td.innerHTML = dataForTable[j]
            tr.appendChild(td);
        }
        tableBody.appendChild(tr);
}})

let nextButton = document.querySelector("#next");
nextButton.addEventListener("click", e => loadNextOrPreviousPage(nextPageLink))

let previousButton = document.querySelector("#previous");
previousButton.addEventListener("click", e => loadNextOrPreviousPage(previousPageLink))



function showHideButton(link, buttonToLink){
    if (link == null){
    buttonToLink.classList.add("invisible")
}else{
    buttonToLink.classList.remove("invisible")
}
}


function loadNextOrPreviousPage(APILink){
    fetch(APILink).then(response => response.json())
    .then(data => {
        nextPageLink = data.next;
        previousPageLink = data.previous;
        showHideButton(previousPageLink,previousButton)
        showHideButton(nextPageLink,nextButton)
        let rows = tableBody.querySelectorAll(".row")
        for(let i=0; i<data.results.length; i++){
            var tr = rows[i]
            let dataForTable = [data.results[i]["name"], convertStringToNumberWithUnit(data.results[i]["diameter"]), data.results[i]["climate"], data.results[i]["terrain"], convertStringToNumberWithPercentage(data.results[i]["surface_water"]), convertStringToNumberWithDecimals(data.results[i]["population"])]
            let cells = tr.querySelectorAll(".col")
                for(let j=0; j<dataForTable.length; j++){
                    var td = cells[j]
                    td.innerHTML = dataForTable[j]}
        }
    })
}

function convertStringToNumberWithDecimals(string){
    if (string != "unknown"){
        let number = parseInt(string)
        return new Intl.NumberFormat('en-US', {style: 'decimal'}).format(number);
    }else{
        return "unknown"
    }
}

function convertStringToNumberWithPercentage(string){
    if (string != "unknown"){
        let number = parseInt(string)
        return number + "%";
    }else{
        return "unknown"
    }
}

function convertStringToNumberWithUnit(string){
    if (string != "unknown"){
        let number = parseInt(string)
        return new Intl.NumberFormat('en-US', {style: 'decimal'}).format(number) + " km";
    }else{
        return "unknown"
    }
}