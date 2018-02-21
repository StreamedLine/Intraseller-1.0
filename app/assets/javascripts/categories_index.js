class Category {
	constructor(category) {
		this.id = category.id;
		this.name = category.name;
		this.updated_at = category.updated_at;
		this.tags = category.tags;
	}
}

Category.html = function(data) {
	var source = $('#category_index_item_template').html();
	var template = Handlebars.compile(source);

	var html = '';
	for (var i = 0; i < data.length; i++) {
		console.log(data[i])
		let category = new Category(data[i]);
		console.log(category)
		html += template(category)
	}
	return html
}

$(function(){
	$.getJSON('/categories',function(response){
		var html = Category.html(response);
		$('.basic_only')[0].innerHTML = html;
	});
})

