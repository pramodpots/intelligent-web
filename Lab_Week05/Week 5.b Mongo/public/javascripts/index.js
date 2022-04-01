function sendAxiosQuery(url, data) {
    axios.post(url, data)
        .then((dataR) => {// no need to JSON parse the result, as we are using
            // we need to JSON stringify the object
            document.getElementById('results').innerHTML = JSON.stringify(dataR.data);
        })
        .catch(function (response) {
            alert(response.toJSON());
        })
}

function onSubmit() {
    var formArray= $("form").serializeArray();
    var data={};
    for (index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }
    // const data = JSON.stringify($(this).serializeArray());
    sendAxiosQuery('/index', data);
    event.preventDefault();
}

