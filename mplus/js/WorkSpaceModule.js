XceedMeetingPlus.module('WorkSpaceModule', function (WorkSpaceModule, App, Backbone, Marionette, $) {

    this.startWithParent = false;

    this.url = [];

    WorkSpaceModule.Controller = Marionette.Controller.extend({

        init:function(method)
        {
           console.log("WorkSpaceModule.Controller:init");

        },
        route:function(method)
        {
            console.log("WorkSpaceModule.Controller:route");

				WorkSpaceModule.url = method;
			
			
				//var temp = method[0].split('=');
			
					this.ShowWorkSpace();
			
				
				
				
        },
        ShowWorkSpace:function(){
				var dbLayout = new App.WorkSpaceModule.DashBoardLayout();
					App.main.show(dbLayout);
				//var t = new WorkSpaceModule.TwitterTimeLineCollection();
					//usertimeline.addTaskRegion.show( new WorkSpaceModule.AddTWTweet());
					//usertimeline.taskAccordian.show(new App.WorkSpaceModule.TwitterAccordionView({collection: t}));
		}
    });


WorkSpaceModule.DashBoardLayout = Backbone.Marionette.Layout.extend({
			template: "#db-layout",
			regions: { timeline: '#TimeLine', hashtags: '#HashTags', groupfeeds: '#GroupFeeds', latestnews: '#LatestNews' },
			initialize: function(){ },
			onRender: function(){ 
				var t = new WorkSpaceModule.TimeLineCollection();
				t.fetch();
				this.timeline.show( new WorkSpaceModule.TimelineCollectionView({collection: t}));
			}
});

WorkSpaceModule.TimelineView = Backbone.Marionette.CompositeView.extend({ template: '#timeline-view' });

WorkSpaceModule.TimelineCollectionView = Backbone.Marionette.CollectionView.extend({
		itemView: WorkSpaceModule.TimelineView,
		initialize: function(){  }
});

WorkSpaceModule.TimeLineModel = Backbone.Model.extend();
WorkSpaceModule.TimeLineCollection = Backbone.Collection.extend({ 
		model: WorkSpaceModule.TimeLineModel,
		url: function() { return 'jsons/mplustimeline1.json'},
		parse: function(response){ return response; },
		error:function(response,responseText){ alert('error..: ' + responseText); }
});


WorkSpaceModule.addFinalizer(function(){ console.log("WorkSpaceModule.addFinalizer ..... destroyed"); });
WorkSpaceModule.addInitializer(function (method) {
        console.log('WorkSpaceModule:addInitializer');
        //alert("action:" + method[0]);
        WorkSpaceModule.controller = new WorkSpaceModule.Controller();
        WorkSpaceModule.controller.init(method);
        //controller.route(method);
    });



});