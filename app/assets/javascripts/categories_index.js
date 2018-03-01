class Category {
	constructor(category) {
		this.id = category.id;
		this.name = category.name;
		this.updated_at = category.updated_at;
		this.tags = category.tags;
	}

	static success(json) {
		var categories = Category.createCategories(json),
				html = Category.categoriesHtml(categories);

		Category.appendHTML(html);
	}

	static createCategories(json) {
		var categories = [];
		for (let i = 0; i < json.length; i++) {
			categories.push(new Category(json[i]));
			//debugger
			categories[i].formatDate()
		}
		return categories
	}

	static categoriesHtml(categories) {
		var source = $('#category_index_item_template').html();
		Handlebars.registerPartial("tags", $("#category_tags_partial").html());
		Handlebars.registerPartial("category", $("#category_partial").html());

		var template = Handlebars.compile(source);
		var html = template(categories);
		return html
	}

	static appendHTML(html) {
		$('.basic_only').append(html);
	}

	formatDate() {
		this.updated_at = this.updated_at.match(/\d*-\d*-\d*/)[0] + ' ' + this.updated_at.match(/\d*:\d*:\d*/)[0];
	}
}


function loadCategories() {
	$.getJSON('/categories', function(response){
		Category.success(response)
	});
}

$( document ).on('turbolinks:load', function(){
	if (location.pathname.match(/categories/)) {
		loadCategories();
	}	
})
