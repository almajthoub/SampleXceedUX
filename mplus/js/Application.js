var XceedMeetingPlus = new Backbone.Marionette.Application();

XceedMeetingPlus.app_modules = [];

XceedMeetingPlus.addRegions({
    header: '#Header',
    main_menu:'#MainMenu',
    main: '#ContentContainer'
});

XceedMeetingPlus.addInitializer(function() {
	XceedMeetingPlus.module("MeetingPlus").start();
});


XceedMeetingPlus.vent.on('App:Modules:add', function (module_name) {
    XceedMeetingPlus.app_modules.push(module_name);
});

XceedMeetingPlus.vent.on('App:Modules:empty', function () {
    _.each(this.app_modules, function(index,item){ XceedMeetingPlus.module(item).close(); });
});

XceedMeetingPlus.on('initialize:after', function () { Backbone.history.start(); });


/*
var proxiedSync = Backbone.sync;
	Backbone.sync = function(method, model, options) {
    	options || (options = {});
    	if (!options.crossDomain) {
      		options.crossDomain = true;
			options.timeout = 10000;
            options.dataType = "jsonp";
			//options.error=this.error;
			options.contentType = "application/json; charset=utf-8";
    	}

    	if (!options.xhrFields) {
      		options.xhrFields = {withCredentials:true};
    	}

    	return proxiedSync(method, model, options);
};*/