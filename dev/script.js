function meni(str){
var gumbi = ['predvajalnik', 'seznam', 'teme', 'credits'];
    var k;
	for(k = 0; k < gumbi.length; k++) {
		if(str==gumbi[k]){
			document.getElementById(gumbi[k]).style.display = "block";
		} else {
			document.getElementById(gumbi[k]).style.display = "none";
		}
	}
}

function postaje() {
var search='';
search=document.getElementById("iskanje").value;
    var arr=data();
    var i;
    var out = "<ul>";
j=search.toLowerCase();
    for(i = 0; i < arr.length; i++) {
        if(arr[i].ime.toLowerCase().indexOf(j)>=0){
out += "<li><a href='#' onclick='zamenjaj(\""+arr[i].kodno+"\");window.location.replace(\"?p="+arr[i].kodno+"\");'>" + arr[i].ime+"</a></li>";
    }
}
    out += "</ul>"
    document.getElementById("postaje").innerHTML = out;
}
function tema(barva)
    {
        document.getElementById("tema").className = barva;
    }

function zamenjaj(str){

}