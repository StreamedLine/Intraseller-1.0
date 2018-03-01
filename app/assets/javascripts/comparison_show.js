//GET SHOW PAGE
function comparisonHTML(data) {
	var source = $('#comparison_show_template').html();
	Handlebars.registerPartial("bullet", $("#bullet_partial").html());
	Handlebars.registerPartial("post_bullet", $("#post_bullet_partial").html());

	var template = Handlebars.compile(source);
	return template(data);
}

function loadComparison() {
	var path = location.pathname;

	$.getJSON(path, function(response){
		$('.comparison_main').append(comparisonHTML(response));
		initializeBulletForm();
	});
}

$( document ).on('turbolinks:load', function() {
	if (location.pathname.match(/comparisons/)) {
		loadComparison();
	}	
});