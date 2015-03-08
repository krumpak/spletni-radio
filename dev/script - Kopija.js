function $(id)
{
    return document.getElementById(id);
}

function ShowMenu(page)
{
    var buttons = ['predvajalnik', 'teme', 'credits'];

    for(var i = 0; i < buttons.length; i++)
    {
        if(page==buttons[i])
        {
            $(buttons[i]).style.display = "block";
        } else {
            $(buttons[i]).style.display = "none";
        }
    }
    $('seznam').style.display = "block";
}

function AllRadioStations()
{
    var searchStr = $("iskanje").value;
    searchStr = $("iskanje").value;
    var listData=RadioStationList();
    var list = "<ul>";

    checkedStr=searchStr.toLowerCase();
        for(i = 0; i < listData.length; i++)
        {
            if(listData[i].ime.toLowerCase().indexOf(checkedStr)>=0){
            list += "<li><a href='#' onclick='ChangeCookieRadioStationValue(\""+listData[i].kodno+"\");'>" + listData[i].ime+"</a></li>";
        }
    }
    list += "</ul>"
    $("postaje").innerHTML = list;
}

function setCookie(cValue)
{
    var cName = "spletni-radio";
    var d = new Date();
    d.setTime(d.getTime() + (1*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires;
}

function getCookieValues()
{
    var cName = "spletni-radio";
    var cContent = document.cookie.replace(cName+"=", "").split(':');
    return cContent;
}

function getCookieRadioStation()
{
    var cValue = getCookieValues();
    return cValue[0];
}

function getCookieTheme()
{
    var cValue = getCookieValues();
    return cValue[1];
}

function setCookieRadioStationValue(RadioStation)
{
    return RadioStation+":"+getCookieTheme()+":"+getCookieVolume();
}

function setCookieThemeValue(Theme)
{
    return getCookieRadioStation()+":"+Theme+":"+getCookieVolume();
}

function ChangeTheme(Theme)
{
    setCookie( setCookieThemeValue(Theme) );
    $("tema").className = Theme;
}

function ChangeCookieRadioStationValue(RadioStation)
{
    setCookie( setCookieRadioStationValue(RadioStation) );
    window.location.replace("/?"+RadioStation);
}

function getUrlRadioStation()
{
    return window.location.search.substring(1);
}

function PlayRadio(stream) {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('id', 'streamer');
    audioElement.setAttribute('src', stream);
    document.body.appendChild(audioElement);
    audioElement.play();
}

function checkSettings() 
{
    var Theme = getCookieTheme();
    $("tema").className = Theme;
    var urlRadioStation = getUrlRadioStation();
    var CookieRadioStation = getCookieRadioStation();
    var SelectedRadioStation ='';

    if( urlRadioStation != '' && CookieRadioStation == '' ){
        SelectedRadioStation =urlRadioStation;
        setCookie(SelectedRadioStation+":bela:0.7");
    }
    else if( urlRadioStation != '' && CookieRadioStation != '' ){
        SelectedRadioStation =urlRadioStation;
        setCookie(SelectedRadioStation+":bela:"+getCookieVolume());
    } else {
        SelectedRadioStation = CookieRadioStation;
        if( getUrlRadioStation() != SelectedRadioStation )
        {
            window.location.replace("/?"+SelectedRadioStation);
        }
    }

    if( typeof SelectedRadioStation == 'string' && SelectedRadioStation.length > 1 && SelectedRadioStation != "0")
    {
        var AllRadioStations=RadioStationList();
        for(var i = 0; i < AllRadioStations.length; i++)
        {
            if(AllRadioStations[i].kodno==SelectedRadioStation)
            {
                var StreamURL=(AllRadioStations[i].stream);
                if($('streamer') == null)
                {
                    PlayRadio(StreamURL);
                    $('RadionName').innerHTML = "<a href='?"+AllRadioStations[i].kodno+"' target='_self'>"+AllRadioStations[i].ime+"</a>";
                    document.title = AllRadioStations[i].ime;
                }
            }
        }
    } else {
        setCookie("0:bela:0.7");
    }

    var cVolume = getCookieVolume();
    cVolume = cVolume;
    if( cVolume >= 0 && cVolume <= 1)
    {
        $('streamer').volume = cVolume;
        var max = 40;
        var bar = max*cVolume;
        for(var i=1;i<=max;i++){
            var element = "bar"+i;
            if(i<=bar){
                $(element).className = 'volumeBar over';
            } else {
                $(element).className = 'volumeBar';
            }
        }
    } else {
        setCookieVolumeValue(cVolume);
    }
}

function StartStopRadio(){
    if( $('streamer').paused )
    {
        $('streamer').play();
        $('predvajaj').style.display='block';
        $('ustavi').style.display='none';
    } else {
        $('streamer').pause();
        $('predvajaj').style.display='none';
        $('ustavi').style.display='block';
    }
}

function muteRadio(){
    if( $('streamer').muted )
    {
        $('mute').style.display='none';
        $('muted').style.display='block';
        $('streamer').muted = false;
    } else {
        $('mute').style.display='block';
        $('muted').style.display='none';
        $('streamer').muted = true;
    }
}

/* VOLUME SLIDER*/
function VolumeSlider(){
    var NumberOfColumns=30;
    var height=30;
    var width=100-NumberOfColumns;

    var barWidth = parseInt(width/NumberOfColumns);
    var Slider = '';
    var SliderCline = height/NumberOfColumns;
    var SliderHeight = 0;
    var SliderTop = 100-SliderHeight;
    for(var i = 1; i <= NumberOfColumns; i++){
        SliderHeight += SliderCline;
        SliderTop = 100-SliderHeight;
        Slider += '<div id="bar'+i+'" onmousedown="ChangeMouseVolumeSlider('+i+','+NumberOfColumns+')" class="volumeBar" style="height:'+parseInt(SliderHeight)+'px;width:'+barWidth+'px;margin-top:'+parseInt(SliderTop-100+height)+'px"></div>';
    }
    $('volume').innerHTML = Slider;
}

function getCookieVolume()
{
    var cValue = getCookieValues();
    return cValue[2];
}

function setCookieVolumeValue(Volume)
{
    return getCookieRadioStation()+":"+getCookieTheme()+":"+(parseFloat(Volume).toFixed(2));
}

function ChangeVolume(Volume)
{
    $('streamer').volume = Volume;
    var cContent = setCookieVolumeValue(Volume);
    setCookie( cContent );
}

function ChangeMouseVolumeSlider(bar,max){
    var volume = bar/max;
    ChangeVolume(volume);

    for(var i=1;i<=max;i++){
        var element = "bar"+i;
        if(i<=bar){
            $(element).className = 'volumeBar over';
        } else {
            $(element).className = 'volumeBar';
        }
    }
}
