var app = (function(document, $) {

	'use strict';
	var docElem = document.documentElement,

		_userAgentInit = function() {
			docElem.setAttribute('data-useragent', navigator.userAgent);
		},
		_init = function() {
			_userAgentInit();
		};

	return {
		init: _init,
		getPage: function(context) {
			var pageName = window.location.hash.replace(/#|\//, '');
			if(!pageName) {
				pageName = 'home';
			}
			$.get(pageName + '.html', function(pageHtml) {
		    $('#content-wrap').html(pageHtml);
		  });
		}
	};

})(document, jQuery);

(function() {

	'use strict';
	app.init();

	// Simple routing

	var pages = [
		'/home',
	  '/bike',
	  '/walk',
	  '/regulations',
	  '/blog',
	  '/contact'
	];

	var routes = {};

	$.each(pages, function(key, page) {
		routes[page] = function() { console.log('changing'); }
	});

  var router = Router(routes);

	router.configure({ 
		on: app.getPage 
	});

  router.init('/home');

	// Load any Templates

	function loadTemplate(templateName, options) {
	  $.get('views/' + templateName + '.mst', function(template, options) {
	    var rendered = Mustache.render(template);
	    $('#' + templateName).html(rendered);
	  });
	}

	loadTemplate('header');
	loadTemplate('footer');

})();