class Category {
	constructor(category) {
		this.id = category.id;
		this.name = category.name;
		this.updated_at = formatDate(category.updated_at);
		this.tags = category.tags;
	}
}

Category.html = function(data) {
	var source = $('#category_index_item_template').html();
	var template = Handlebars.compile(source);

	var html = template(data);
	return html
}

$(function(){
	$.getJSON('/categories',function(response){
		var html = Category.html(response);
		console.log(response, html)
		$('.basic_only')[0].innerHTML = html;
	});
})

//helper
function formatDate(dateStr) {
	//DEV <<<=========
	//format date here
	return dateStr
}