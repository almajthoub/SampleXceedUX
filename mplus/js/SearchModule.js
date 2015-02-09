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
				regions: { timeline: '#result'},
				cacheResult: {},
				events: {'keyup .TextBox': 'search'},
				search: function(e){
					var term = e.target.value;
					if(term != ""){
						var pattern = new RegExp(term,"gi");
						var t = new SearchModule.TimeLineCollection(this.cacheResult.toArray());
						this.cacheResult = t;
						var result = t.filter(function(node){return pattern.test(node.get('title'));});
						this.timeline.currentView.collection.reset(result);
					}else{
						this.timeline.currentView.collection.reset(this.result.toArray());
					}
					
				},
				initialize: function(){ },
				onRender: function() {
					var t = new SearchModule.TimeLineCollection();
					t.fetch();
					this.cacheResult = t;		
					this.timeline.show( new SearchModule.TimelineCollectionView({collection: t}));
				}
	});
	

	SearchModule.TimelineView = Backbone.Marionette.ItemView.extend({ template: '#timeline-view' });
	SearchModule.TimelineCollectionView = Backbone.Marionette.CollectionView.extend({ itemView: SearchModule.TimelineView });

	SearchModule.TimeLineModel = Backbone.Model.extend();
	SearchModule.TimeLineCollection = Backbone.Collection.extend({ 
			model: SearchModule.TimeLineModel,
			searchTerm: function(term){
					var t = new SearchModule.TimeLineCollection();
					var layout = this;
					t.fetch().done(function(){
						var pattern = new RegExp(term,"gi");					
						var result = _.filter(t.models,function(node){
							return pattern.test(node.get('title'));
						});
						layout.timeline.show( new SearchModule.TimelineCollectionView({collection: result}));
					});
					// this.result = t;
			},
			url: function() { return 'jsons/mplustimeline.json'},
			parse: function(response){ return response; },
			error:function(response,responseText){ alert('error..: ' + responseText); }
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