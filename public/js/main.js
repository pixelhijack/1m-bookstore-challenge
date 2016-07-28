var BookApp = function(options){
	var NUMBER_OF_BOOKS = 100000,
		itemsRendered = 100,
		apiPath = options.apiPath,
		templateSelector = options.templateSelector,
		containerSelector = options.containerSelector, 
		model, 
		currentModel, // Tech debt: Immutable model object (React stores, ES6 constants) instead of copying model as currentModel when sorting / filtering
		view = $(containerSelector),
		template = _.template(
            $(templateSelector).html()
        );

		// some strange business logic:
		// a private function to generate 1M books by mixing the 100 sample
        function generateBooks(model, numberOfBooks){
        	var sampleLength = model.length;
        	// a while-- would be possibly quicker
        	for(var i = sampleLength, max = numberOfBooks;i<=max;i++){
        		model.push({
        			id: i + 1,
        			name: model[Math.floor(Math.random() * sampleLength)].name,
        			author: model[Math.floor(Math.random() * sampleLength)].author,
        			genre: model[Math.floor(Math.random() * sampleLength)].genre,
        			publish_date: model[Math.floor(Math.random() * sampleLength)].publish_date
        		});
        	}
        	return model;
        };

	return {
		// initialize: Backbone-style imperative antipattern
		// could be refactored with lifecycle events in React
		initialize: function(){
	        this.fetch();
	        this.parse(model);
	        currentModel = this.getCurrentModel();
	        this.render(currentModel);
	        this.renderGenreOptions();
		},
		fetch: function(){
			// forcing sync for the sake of simplicity here: 
			$.ajax({
				type: 'GET',
				url: apiPath,
				dataType: 'json',
				async: false,
				success: function(response){
					model = response;
				}				
			});
		}, 
		parse: function(model){
			// normally any response transform & schema validation come here after fetch
			// let's suppose making 1million from the 100 books is one of this logic
			return generateBooks(model, NUMBER_OF_BOOKS);
		},
		getCurrentModel: function(){
			return model.slice(0, itemsRendered);
		},
		addItemsToView: function(toAdd){
			var additionalItems = model.slice(itemsRendered, itemsRendered + toAdd);
			itemsRendered += toAdd;
			currentModel = this.getCurrentModel();
			this.render(additionalItems);
		},
		renderGenreOptions: function(){
			var genres = _.uniq(_.pluck(model, 'genre'));
			var options = _.map(genres, function(genre){
				// should be extracted out as a template
				return '<option value="'+ genre +'">'+ genre +'</option>';
			});
			// selector should not be hardcoded here
			$('.book__filterby-genre select').append(options);
		},
		// view rendering: as dumb and stateless as it can be
		render: function(modelItemsToRender){
			var viewModel = _.map(modelItemsToRender, function(book, idx){
	        	return template(book);
	        });

			view.append(viewModel);
		}, 
		sortBy: function(prop){
			var sorted = _.sortBy(currentModel, prop);
			
			view.empty();
			this.render(sorted);
		}, 
		filterBy: function(conditions){
			var conditions = Array.prototype.slice.call(arguments);
			var filtered = conditions.reduce(function(result, condition){
				return _.filter(result, function(book){
					return book[condition.prop] === condition.val;
				});
			}, currentModel);

			view.empty();
			this.render(filtered);
		},
		onScrollHandler: function(){
			var viewHeight = view.outerHeight(),
				yOffset = window.pageYOffset,
				y = yOffset + window.innerHeight;

			if(y >= viewHeight){
				this.addItemsToView(100);
			}
		}
	};
};

/*
* Kick off the app on doc ready: 
*/

$(document).ready(function(){
	// INITIALIZE
	var app = BookApp({
		apiPath: 'data/BOOKS.json',
		templateSelector: 'script.book-template', 
		containerSelector: '.book__container'
	});
	
	app.initialize();

	// EVENT LISTENERS - could be bound inside the app
	$('.book__sortby-name').on('click', function(e){
		app.sortBy('name');
	});

	$('.book__sortby-author').on('click', function(e){
		app.sortBy('author.name');
		console.log('TODO: sort by a nested property could be solved with Lodash sortByAll, or should be implemented more generally with Underscore here...');
	});

	$('.book__filterby-genre select').change(function(){
		var selectedGenre = $(this).val();
		app.filterBy({
			prop: 'genre', 
			val: selectedGenre
		});
	});

	$('.book__filterby-halloween').on('click', function(e){
		app.filterBy({
			prop: 'genre', 
			val: 'Horror'
		}, {
			prop: 'publish_date', 
			val: '10/31/2015'
		});
	});

	window.onscroll = app.onScrollHandler.bind(app);
});
