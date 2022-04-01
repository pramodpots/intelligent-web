function sendAjaxQuery(url, data) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (dataR) {
            // no need to JSON parse the result, as we are using
            // dataType:json, so JQuery knows it and unpacks the
            // object for us before returning it
            let ret = dataR;
            // in order to have the object printed by alert
            // we need to JSON stringify the object
            document.getElementById('results').innerHTML= JSON.stringify(ret);
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });
}

function onSubmitChild() {
    let formArray= $("form").serializeArray();
    let data={};
    for (let index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }
    let parent= {"name": data.firstname, "surname": data.lastname}
    data.parent= parent;

    // const data = JSON.stringify($(this).serializeArray());
    sendAjaxQuery('/child', data);
    event.preventDefault();
}


function onSubmitAdult() {
    let formArray= $("form").serializeArray();
    let data={};
    for (let index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }
    // const data = JSON.stringify($(this).serializeArray());
    sendAjaxQuery('/adult', data);
    event.preventDefault();
}

