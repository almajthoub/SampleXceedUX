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