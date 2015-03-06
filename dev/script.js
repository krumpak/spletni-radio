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
//out += "<li><a href='#' onclick='zamenjaj(\""+arr[i].kodno+"\");'>" + arr[i].ime+"</a></li>";
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
    setCookie("spletni-radio", str+":default", 1);
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var cvalue = document.cookie.replace(cname+"=", "").split(':');
    for(var i=0; i<cvalue.length; i++) {
        var valuesarray = cvalue[i];
        /*while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);*/
    }
    return cvalue;
}


function play(url) {
    var audioElement = document.getElementById('streamer');
    audioElement.setAttribute('src', url);
    audioElement.play();
}
function checkCookie() {
    var cookie = getCookie("spletni-radio");
        //alert(cookie[0]+'-'+cookie[1]);
     /*if (cookie[0] == "null") {
        //setTimeout(function() { checkCookie(); }, 500);
    }*/
    if( typeof cookie[0] == 'string' && cookie[0].length > 1 && cookie[0] != "0"){
        var postaja1=cookie[0];
        var postaja2=data();
        var i;
        var ta;
        for(i = 0; i < postaja2.length; i++) {
            if(postaja2[i].kodno==postaja1){
                ta=(postaja2[i].stream);
                play(ta);
            }
        }
    } else {
        setCookie("spletni-radio", "0:default", 1);
    }
}
checkCookie();