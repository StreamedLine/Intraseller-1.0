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
	Handlebars.registerPartial("tags", $("#category_tags_partial").html());
	Handlebars.registerPartial("category", $("#category_partial").html());

	var template = Handlebars.compile(source);
	var html = template(data);
	return html
}

function loadCategories() {
	$.getJSON('/categories',function(response){
		$('.basic_only').append(Category.html(response));
	});
}

$(function(){
	loadCategories();
})

//helper
function formatDate(dateStr) {
	//DEV <<<=========
	//format date here
	return dateStr
}