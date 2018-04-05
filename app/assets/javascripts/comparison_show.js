//GET SHOW PAGE
function comparisonHTML(data) {
	const source = $('#comparison_show_template').html();
	Handlebars.registerPartial("bullet", $("#bullet_partial").html());
	Handlebars.registerPartial("post_bullet", $("#post_bullet_partial").html());

	const template = Handlebars.compile(source);
	return template(data);
}

function loadComparison() {
	const path = location.pathname;

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