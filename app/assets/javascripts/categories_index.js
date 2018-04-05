class Category {
	constructor(category) {
		this.id = category.id;
		this.name = category.name;
		this.updatedAt = category.updated_at;
		this.tags = category.tags;
	}

	static success(json, filter) {
		if (filter) {
			json = json.filter(category=> category.items.length > 0);
		}

		var categories = Category.createCategories(json),
				html = Category.categoriesHtml(categories);

		Category.appendHTML(html);
	}

	static createCategories(json) {
		var categories = [];
		for (let i = 0; i < json.length; i++) {
			categories.push(new Category(json[i]));
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
		this.updatedAt = this.updatedAt.match(/\d*-\d*-\d*/)[0] + ' ' + this.updatedAt.match(/\d*:\d*:\d*/)[0];
	}
}

function addFilterButton() {
	const button = $('<button>Filter Empty Categories</button>');
	$('h3').first().after(button);
	return button
}

function addFilter() {
	const button = addFilterButton();
	button.click(()=> {
		$('.basic_only').html('');
		loadCategories(true);
	});
}

function loadCategories(filter) {
	$.getJSON('/categories', function(response){
		Category.success(response, filter)
	});
}

$( document ).on('turbolinks:load', function(){
	if (location.pathname.match(/categories/)) {
		loadCategories();
		addFilter();
	}	
})
