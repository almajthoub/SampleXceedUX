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
