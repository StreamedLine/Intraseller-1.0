//POST BULLET-POINTS TO PAGE
function initializeBulletForm() {
	$('form#new_bullet').on('submit',function(e){
		e.preventDefault();

		var $form = $(this),
				action = $form.attr('action'),
				params = $form.serialize();

		$.ajax({
			url: action,
			data: params,
			dataType: 'json',
			method: 'POST'
		})
		.success(function(response){
				if (response.id != null) {
					var source = $('#bullet_partial').html();
					var template = Handlebars.compile(source);

					$(template(response)).insertBefore('#new_bullet');	
					$('#bullet_nugget').val('');
				}
				$('input[type=submit]').attr('disabled', false);
		});
	})
}


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