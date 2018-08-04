var filter = "";



var HOST_PATH_PUBLIC = 'http://' + window.location.host + '/public';
var HOST_PATH = 'http://' + window.location.host + '/';

//var userList = $('#userList').dataTable();
//var trashUserList = $('#trashUserList').dataTable();
var _websiteAccess = null;
function addOverLay()

{
	
	if( $("div#overlay").length == 0)
	{
		
		var overlay = $("<div id='overlay'><img id='img-load' src='" +  HOST_PATH_PUBLIC + "/images/back_end/ajax-loader.gif'/></div>");
		overlay.appendTo(document.body);
		$t = $(document.body); // CHANGE it to the table's id you have
		$("#img-load").css({
		  top  : ($t.height() / 2),
		  left : ($t.width() / 2)
		});
	} 
		
}
/**
 * remove overlay
 * @author kraj
 */
function removeOverLay()
{
	$('div#overlay').remove();
	return true ;
}
/**
 * function only use for unique message
 * for javascript files
 * @author kraj
 */
var l10n = {'Enter your Username':'l10'};
function jsMsgTranslate(msg)
{
	return l10n['Enter your Username'];
	//return typeof l10n[s] != 'undefined' ? l10n[s] : s;
}
function ucfirst(str) {
	var firstLetter = str.substr(0, 1);
	return firstLetter.toUpperCase() + str.substr(1);
}

function changeDateFormat(date){
	date = date.split('-');
	return date['2']+'-'+date['1']+'-'+date['0'];
}

function addWidgetPopup()
{
	
	if( $("div#overlay").length == 0)
	{
		
		var overlay = $('<div id="overlay"><div class="fancybox-skin" style="padding: 15px;">'+$('#widgetListUserdefined').html()+'</div>');
		overlay.appendTo(document.body);
		$t = $(document.body); // CHANGE it to the table's id you have
		$(".fancybox-skin").css({
		  top  : (($t.height() / 2)-($('.fancybox-skin').height()/2)),
		  left : (($t.width() / 2)-($('.fancybox-skin').width()/2))
		});
	} 
	$('div#overlay').css({ opacity: 1.0 });
}

