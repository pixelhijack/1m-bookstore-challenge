The 1M Bookstore Challenge
===================

Usage
-------------
```
npm install
npm run server
```
check localhost:8080

The challenge
------------

- Generate a list of one million books
	* A book should have a name, an author, a genre, and a publish date
	* An author should have a name and a gender
- Display a scrollable list of all one million books
- Add any or all of the following functionality:
	* Sort by Book Name
	* Sort By Author Name
	* Filter By Book Genre
	* Filter By Author Gender
	* Indicate books in the "horror" genre, published on Halloween
	* Indicate books in the "finance" genre, published on the last Friday of any month
	
The implementation
-------------
- Native JavaScript, because of the 4 hours deadline taken seriously (though no-config React etc could be used, no boilerplate code was preferred). 
- Uses revealing module pattern. Could be also solved with a more OOP style (classes), also reveal less public methods, split into multiple modules by views (list, controls)
- Has a lot of imperative style and controller logic which is an antipattern. Should be solved much elegantly in a declarative functional reactive manner with React. 
- Client-side dependencies should be extracted with Bower, modularisation and packaging could be solved by Webpack for nicer HTML and source maps
- Optimised to render 1 million items: handling 1 million JavaScript model object is easy for the browser, but you can't simply render 1 million DOM-elements otherwise will crush. This is where virtual dom diffing libraries (React, Preact, Deku, VirtualDom) gets handy. My solution is to dynamically render more and more DOM elements generated from the model.
- Methods are not pure and operate with side effects. If it would have been created in TDD unit tests, it would cause hard times to mock out for a good coverage. Use Redux / MobX for an event-driven pure reactive one-way data-flow architecture with much better testing possibilities. 
- CSS is used a BEM-like syntax and kept minimal for the sake of functionality, though using Flexbox with table fallback
 
Sources
-------------
- HTML5 Boilerplate for bootstrapping reasons, custom build with the fewest added fancy stuff and helper. 
- Sample mock data generator: https://www.mockaroo.com/
- Book title generator: http://fantasynamegenerators.com/book-title-generator.php#.V5ngk_l97IW
- 1M optimalisation concept & benchmark: http://w2ui.com/web/blog/7/JavaScript-Grid-with-One-Million-Records
