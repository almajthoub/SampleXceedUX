XceedMeetingPlus.module('TaskModule', function (TaskModule, App, Backbone, Marionette, $) {

    this.startWithParent = false;

    this.url = [];

    TaskModule.Controller = Marionette.Controller.extend({

        init:function(method)
        {
           console.log("TaskModule.Controller:init");

        },
        route:function(method)
        {
            console.log("TaskModule.Controller:route");

            	 TaskModule.url = method;
			this.ShowAllTasks();
        },
        ShowAllTasks:function()
        {
			var taskLayout = new App.TaskModule.TaskLayout();
					App.main.show(taskLayout);
        }
    });


TaskModule.TaskLayout = Backbone.Marionette.Layout.extend({
			template: "#work-layout",
			regions: { timeline: '#TimeLine', hashtags: '#HashTags', groupfeeds: '#GroupFeeds', latestnews: '#LatestNews' },
			initialize: function(){ },
			onRender: function(){
				var t = new TaskModule.TimeLineCollection();
				t.fetch();
				this.timeline.show( new TaskModule.TimelineCollectionView({collection: t}));
		    }
});

TaskModule.TimelineView = Backbone.Marionette.CompositeView.extend({ template: '#timeline-view' });
TaskModule.TimelineCollectionView = Backbone.Marionette.CollectionView.extend({ itemView: TaskModule.TimelineView });

TaskModule.TimeLineModel = Backbone.Model.extend();
TaskModule.TimeLineCollection = Backbone.Collection.extend({ 
		model: TaskModule.TimeLineModel,
		url: function() { return 'jsons/mplustimeline1.json'},
		parse: function(response){ return response; },
		error:function(response,responseText){ alert('error..: ' + responseText); }
});



TaskModule.addFinalizer(function(){ console.log("TaskModule.addFinalizer ..... destroyed"); });
TaskModule.addInitializer(function (method) {
        console.log('TaskModule:addInitializer');
        //alert("action:" + method[0]);
        TaskModule.controller = new TaskModule.Controller();
        TaskModule.controller.init(method);
        //controller.route(method);
    });



});




// Meeting Module
XceedMeetingPlus.module('TimelineModule', function (TimelineModule, App, Backbone, Marionette, $) {

    this.startWithParent = false;

    this.url = [];

    TimelineModule.Controller = Marionette.Controller.extend({

        init:function(method)
        {
           console.log("TimelineModule.Controller:init");

        },
        route:function(method)
        {
            console.log("TimelineModule.Controller:route");

            	 TimelineModule.url = method;
			this.ShowAllTasks();
        },
        ShowAllTasks:function()
        {
			var taskLayout = new App.TimelineModule.TimelineLayout();
					App.main.show(taskLayout);
        }
    });


TimelineModule.TimelineLayout = Backbone.Marionette.Layout.extend({
			template: "#timeline-layout",
			regions: { timeline: '#MainTimeLine' },
			initialize: function(){ },
			onRender: function(){
				var t = new TimelineModule.TimeLineCollection();
				t.fetch();
				this.timeline.show( new TimelineModule.TimelineCollectionView({collection: t}));
		    }
});
TimelineModule.TimelineView = Backbone.Marionette.CompositeView.extend({ template: '#timeline-view' });
TimelineModule.TimelineCollectionView = Backbone.Marionette.CollectionView.extend({ itemView: TimelineModule.TimelineView });

TimelineModule.TimeLineModel = Backbone.Model.extend();
TimelineModule.TimeLineCollection = Backbone.Collection.extend({ 
		model: TimelineModule.TimeLineModel,
		url: function() { return 'jsons/mplustimeline.json'},
		parse: function(response){ return response; },
		error:function(response,responseText){ alert('error..: ' + responseText); }
});




TimelineModule.addFinalizer(function(){ console.log("TimelineModule.addFinalizer ..... destroyed"); });
TimelineModule.addInitializer(function (method) {
        console.log('TimelineModule:addInitializer');
        //alert("action:" + method[0]);
        TimelineModule.controller = new TimelineModule.Controller();
        TimelineModule.controller.init(method);
        //controller.route(method);
    });



});




// Search Module
XceedMeetingPlus.module('SearchModule', function (SearchModule, App, Backbone, Marionette, $) {

    this.startWithParent = false;

    this.url = [];

    SearchModule.Controller = Marionette.Controller.extend({

        init:function(method)
        {
           console.log("SearchModule.Controller:init");

        },
        route:function(method)
        {
            console.log("SearchModule.Controller:route");

            	 SearchModule.url = method;
			this.ShowAllTasks();
        },
        ShowAllTasks:function()
        {
			var taskLayout = new App.SearchModule.SearchLayout();
					App.main.show(taskLayout);
        }
    });


SearchModule.SearchLayout = Backbone.Marionette.Layout.extend({
			template: "#search-layout",
			regions: { timeline: '#TimeLine', hashtags: '#HashTags', groupfeeds: '#GroupFeeds', latestnews: '#LatestNews' },
			initialize: function(){ },
			onRender: function(){ }
});




SearchModule.addFinalizer(function(){ console.log("SearchModule.addFinalizer ..... destroyed"); });
SearchModule.addInitializer(function (method) {
        console.log('SearchModule:addInitializer');
        //alert("action:" + method[0]);
        SearchModule.controller = new SearchModule.Controller();
        SearchModule.controller.init(method);
        //controller.route(method);
    });



});






// Setting Module
XceedMeetingPlus.module('SettingModule', function (SettingModule, App, Backbone, Marionette, $) {

    this.startWithParent = false;

    this.url = [];

    SettingModule.Controller = Marionette.Controller.extend({

        init:function(method)
        {
           console.log("SettingModule.Controller:init");

        },
        route:function(method)
        {
            console.log("SettingModule.Controller:route");

            	 SettingModule.url = method;
			this.ShowAllTasks();
        },
        ShowAllTasks:function()
        {
			var taskLayout = new App.SettingModule.SettingLayout();
					App.main.show(taskLayout);
        }
    });


SettingModule.SettingLayout = Backbone.Marionette.Layout.extend({
			template: "#setting-layout",
			regions: { timeline: '#TimeLine', hashtags: '#HashTags', groupfeeds: '#GroupFeeds', latestnews: '#LatestNews' },
			initialize: function(){ },
			onRender: function(){ }
});



SettingModule.addFinalizer(function(){ console.log("SettingModule.addFinalizer ..... destroyed"); });
SettingModule.addInitializer(function (method) {
        console.log('SettingModule:addInitializer');
        //alert("action:" + method[0]);
        SettingModule.controller = new SettingModule.Controller();
        SettingModule.controller.init(method);
        //controller.route(method);
    });

});







