function comparisonHTML(data) {
	var source = $('#comparison_show_template').html();

	var template = Handlebars.compile(source);
	return template(data);
}

function loadComparison() {
	var ids = window.location.pathname.match(/\d+/g);
	var path = `/items/${ids[0]}/comparisons/${ids[1]}`

	$.getJSON(path,function(response){
		$('.comparison_main').append(comparisonHTML(response))
	});
}

$(function() {
	if (location.pathname.match(/items.*comparisons/)) {
		loadComparison();
	}	
});