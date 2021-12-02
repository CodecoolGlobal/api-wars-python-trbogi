let PLANETS = "https://swapi.dev/api/planets/"
let tableBody = document.querySelector("#tablebody")

console.log(tableBody)

fetch(PLANETS).then(response => response.json())
.then(data => {
    console.log(data.results)
    for(let i=0; i<data.results.length; i++){
        var tr = document.createElement('TR');
        tr.classList.add("row");
        console.log(tr);
        let dataForTable = [data.results[i]["name"], data.results[i]["diameter"], data.results[i]["climate"], data.results[i]["terrain"], data.results[i]["surface_water"], data.results[i]["population"] ]
        for(let j=0; j<dataForTable.length; j++){
            var td = document.createElement('TD');
            td.classList.add("col");
            td.innerHTML = dataForTable[j]
            tr.appendChild(td);
        }
        tableBody.appendChild(tr);

}})


    /*
            for(let j=0; i<dataForTable.length; j++){
            var td = document.createElement('TD');
            td.innerText(dataForTable[j])
            tr.appendChild(td);
        }
        tableBody.appendChild(tr);
    }*/