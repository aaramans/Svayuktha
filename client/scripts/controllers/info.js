

function ajax_get(url, callback) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

ajax_get('data.json', function(data) {
    var html='',desc='';
    for(var i=0;i<data.length;i++){
        console.log(data.length);
         html += "<div class='col s12 m3'><div class='card'><div class='card-image waves-effect waves-block waves-light'><img class='activator' src='"
            + data[i]["src"] +
            "'></div><div class='card-content'><span class='card-title activator grey-text text-darken-4'>"
            +data[i]["name"]+
            "<i class='material-icons right'>more_vert</i></span><h5>"
            +data[i]["role"]+
            "</h5></div><div class='card-reveal'><span class='card-title grey-text text-darken-4'>"
            +data[i]["role"]+
            "<i class='material-icons right'>close</i></span><p>"
            +data[i]["description"]+
            "</p><h6>Releases Worked</br><ul>";
       for(var j=0;j<data[i].Releases.length;j++){
            console.log(data[i].Releases.length);
          desc= data[i]["Releases"][j]["name"];
           console.log("First Time"+data[i]["Releases"][j]["name"]);


           html += "<strong><li>"+
           data[i]["Releases"][j]["name"]

            +"</br></li></strong>";

       }
        html+= "</ul></h6></div></div></div>";
        document.getElementById("title").innerHTML ="<div class='container third-block'><div class='row'>"+html+"</div></div>";
    }
});
