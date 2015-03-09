function $(id)
{
    return document.getElementById(id);
}

function ShowMenu(page)
{
    var buttons = ['predvajalnik', 'credits'];

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
            list += "<li><a href='#' onclick='ChangeRadioStation(\""+listData[i].kodno+"\");'>" + listData[i].ime+"</a></li>";
        }
    }
    list += "</ul>"
    $("postaje").innerHTML = list;
}

function setLS(lsStation, lsTheme, lsValoume)
{
    localStorage.setItem("RadioStation", lsStation);
    localStorage.setItem("RadioTheme", lsTheme);
    localStorage.setItem("RadioVolume", lsValoume);
}

function getLS_Station()
{
    var LS_value = localStorage.getItem("RadioStation");
    var value = localStorage.getItem("RadioStation"); 
    if( LS_value == '' || LS_value == null || LS_value == undefined ){ value = ''; }
    return value;  
}

function getLS_Revert()
{
    var LS_value = localStorage.getItem("RadioStationRevert");
    var value = localStorage.getItem("RadioStationRevert"); 
    if( LS_value == '' || LS_value == null || LS_value == undefined ){ value = ''; }
    return value;  
}

function getLS_Theme()
{
    var LS_value = localStorage.getItem("RadioTheme");
    var value = localStorage.getItem("RadioTheme");
    if( LS_value == '' || LS_value == null || LS_value == undefined ){ value = ''; }
    return value; 
}

function getLS_Volume()
{
    var LS_value = localStorage.getItem("RadioVolume");
    var value = localStorage.getItem("RadioVolume");
    if( LS_value == '' || LS_value == null || LS_value == undefined ){ value = ''; }
    return value; 
}

function setLS_RadioStationValue(RadioStation)
{
    return localStorage.setItem("RadioStation", RadioStation);
}

function setLS_RadioStationRevertValue(Previous, Next)
{
    if( Previous != Next )
    {
        return localStorage.setItem( "RadioStationRevert", Previous );
    }
}

function setLS_ThemeValue(RadioTheme)
{
    return localStorage.setItem("RadioTheme", RadioTheme);
}

function setLS_VolumeValue(RadioVolume)
{
    return localStorage.setItem("RadioVolume", RadioVolume);
}

function ChangeRadioStation(RadioStation)
{
    setLS_RadioStationRevertValue( getLS_Station(), RadioStation );
    setLS_RadioStationValue(RadioStation);
    window.location.replace("/?"+RadioStation);
}

function ChangeTheme(Theme)
{
    setLS_ThemeValue(Theme);
    $("tema").className = Theme;
}

function ChangeVolume(Volume)
{
    setLS_VolumeValue(Volume);
    $('streamer').volume = Volume;
}

function getUrlStation()
{
    return window.location.search.substring(1);
}

function getStationDataArray(Station)
{
    var StationAllData = RadioStationList();
    var StationData = '';
    for(var i = 0; i < StationAllData.length; i++)
    {
        if( StationAllData[i].kodno == Station )
        {
            StationData = StationAllData[i];//[StationData[i].id, StationData[i].ime, StationData[i].kodno, StationData[i].stream, StationData[i].slika ];
        }
    }
    return StationData;
}

function PlayRadio(stream) {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('id', 'streamer');
    audioElement.setAttribute('src', stream);
    document.body.appendChild(audioElement);
    audioElement.play();
}

function initiateRadio() 
{
    if(typeof(Storage) == "undefined") {
		$('RadionName') = "Browser does not support this radio!";
		alert('ne podpira');
	}

	var URL_Station = getUrlStation();
	var LS_Station = getLS_Station();
	var LS_Theme = getLS_Theme();
	var LS_Volume = getLS_Volume();


	if( URL_Station != '' && LS_Station == '' && LS_Theme == '' &&  LS_Volume == '' )
	{
		setLS( URL_Station, "bela", "0.5" );
		location.reload(); 
	}
	else if( URL_Station != '' && LS_Station != '' && LS_Theme != '' && LS_Volume != '' && URL_Station != LS_Station && URL_Station != '0' )
	{
		setLS( URL_Station, LS_Theme, LS_Volume );
		location.reload();
	}
	else if( URL_Station == '' && LS_Station != '' && LS_Theme != '' && LS_Volume != '' && LS_Station != '0' )
	{
		window.open("/?"+LS_Station, '_self');
	} 
	else if( LS_Station != '' && LS_Theme != '' &&  LS_Volume != '' && LS_Station != '0' )
	{
	    LS_Theme = getLS_Theme();
	    $("tema").className = LS_Theme;

        RadioData = getStationDataArray(LS_Station);

        if($('streamer') == null)
        {
            PlayRadio(RadioData.stream);
            $('RadionName').innerHTML = "<a href='?"+RadioData.kodno+"' target='_self'>"+RadioData.ime+"</a>";
            document.title = RadioData.ime;
            RevertStationButton();
        }

	    var cVolume = getLS_Volume();
	    if( cVolume >= 0 && cVolume <= 1)
	    {
	        $('streamer').volume = cVolume;
	        var max = 30;
	        var bar = max*cVolume;
            var element = '';
	        for(var i=1;i<=max;i++){
	            element = 'bar'+i;
	            if(i<=bar){
                    $('bar'+i).className = 'volumeBar over';
	            } else {
                    $('bar'+i).className = 'volumeBar';
	            }
	        }
	    } else {
	        setLS_VolumeValue(cVolume);
	    }
	} else {
		setLS( "0", "bela", "0.5" );
	} 
}

function StartStopRadio(){
    if( $('streamer').paused )
    {
        var RadioData = getStationDataArray( getLS_Station() );
        $('streamer').setAttribute('src', RadioData.stream);
        $('streamer').play();
        $('predvajaj').style.display='inline-block';
        $('ustavi').style.display='none';
    } else {
        //$('streamer').pause();
        $('streamer').setAttribute('src', '');
        $('predvajaj').style.display='none';
        $('ustavi').style.display='inline-block';
    }
}

function muteRadio(){
    if( $('streamer').muted )
    {
        $('mute').style.display='none';
        $('muted').style.display='inline-block';
        $('streamer').muted = false;
    } else {
        $('mute').style.display='inline-block';
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

function RevertStationButton()
{
    var revertStationData = getStationDataArray( getLS_Revert() );
    var name = revertStationData.ime;
    if( name != '' && name.length >= 1 )
    {
        $('revert').style.display='block';
        $('revert').innerHTML = name+' <span class="icon icon-revert"></span>'
    } else {
        $('revert').style.display='none';
        $('revert').innerHTML = "";
    }
}

function RevertStation()
{
    var revertStationData = getStationDataArray( getLS_Revert() );
    ChangeRadioStation( revertStationData.kodno );
}