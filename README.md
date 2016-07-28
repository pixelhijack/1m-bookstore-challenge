The 1M Bookstore Challenge
===================

Usage
-------------
```
npm install
npm run server
```
check localhost:8080

Architectural considerations
-------------
- I tried to take the maximum 4 hours seriously as a strict deadline, this was the main bottleneck for the whole implementation. Sure you can write perfectly OOP and optimalised code but a good developer consider the deadlines, work in iterations and dare to write the minimal viable solution and refactor only after. Make it run, make it right, make it fast, and know your technical debt. 
- The first KISS iteration which fitted into the 4 hours use a native approach with jQuery and Underscore for quicker development (but you really not need jQuery), built upon HTML5 Boilerplate, served with http-server
- The implementation followed a classical MVC pattern, much like how it would be with Backbone.js - with all the problems of this approach. This is how we wrote JavaScript a few years ago
- I would love to show other solutions, for example:
	* Node / Express to serve static files & for a real API request for the books
	* Angular.js would illustrate how badly 2-way data bindings and long ng-lists perform on large set of items
	* a real Backbone.js would be almost like this, but nicer event bindings
	* React + Redux + Immutable.js + ES6: this would be a perfect example to show how performant virtual dom diffing when re-rendering only the changed items on filtering / sorting, also to demonstrate a much more declarative functional style and how immutable models make life easier
	* MobX, Rx.js and observables: left as a dream

The implementation
-------------
- Native JavaScript. Frameworks and libraries are beautiful, but you must know native js or you are lost. 
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
