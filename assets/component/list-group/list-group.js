$('body').on('click','.list-group-item',function(event){
	var $t = $(this),
		$p = $t.parent(),
		ev = event || window.event,
		tar = ev.target || ev.srcElement,
		$tar = $(tar);
	if($tar.hasClass('list-group-delete')){
		return false;
	}
	$p.children('.list-group-item').removeClass('active');
	$t.addClass('active');
});
