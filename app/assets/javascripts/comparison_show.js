function loadComparison() {
	var ids = window.location.pathname.match(/\d+/g);
	var path = `/items/${ids[0]}/comparisons/${ids[1]}`

	$.getJSON(path,function(response){
		console.log(response)
	});
}

$(function() {
	if (location.pathname.match(/items.*comparisons/)) {
		loadComparison();
	}	
});