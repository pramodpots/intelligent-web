/*
 *  Copyright (C) The University of Sheffield - All Rights Reserved
 *  Written by Fabio Ciravegna (f.ciravegna@shef.ac.uk)
 *
 */

/**
 * it submits the form and writes the result and the other equivalent operations in
 * the element "results"
 */
function submitForm(){
    document.getElementById('results').innerHTML='';
    let data= serialiseForm();
    let sum= parseInt(data.no1)+parseInt(data.no2);
    storeSumData({no1: data.no1, no2: data.no2, sum: sum})
        .then(response => console.log('inserting worked!!'))
        .catch(error => console.log("error  inserting: "+ JSON.stringify(error)))

    // and now it retrieves all the sums that have given the same result
    getSumData(sum)
        .then(response => console.log('getting sum worked!!'))
        .catch(error => console.log("error  getting: "+ + JSON.stringify(error)))
}


function serialiseForm() {
    let formArray = $("form").serializeArray();
    let data = {};
    for (let index in formArray) {
        data[formArray[index].name] = formArray[index].value;
    }
    return data;
}


/**
 * given the sum data retrieved in the database, it returns all the numbers that have summed to a value X
 * @param dataR the data returned by the db
 */
function addToResults(dataR) {
    if (document.getElementById('results') != null) {
        const row = document.createElement('div');
        // appending a new row
        document.getElementById('results').appendChild(row);
        // formatting the row by applying css classes
        row.classList.add('card');
        row.classList.add('my_card');
        row.classList.add('bg-faded');
        // the following is far from ideal. we should really create divs using javascript
        // rather than assigning innerHTML
        row.innerHTML = "<div class='card-block'>" +
            "<div class='row' style='width: 100%'>" +
            "<div class='col-sm'>"+ dataR.no1 + "</div>" +
            "<div class='col-sm'>+</div>" +
            "<div class='col-sm'>" + dataR.no2 + "</div>" +
            "<div class='col-sm'>=</div>" +
            "<div class='col-sm'>"+dataR.sum + "</div>" +
            "</div></div>";
    }
}
