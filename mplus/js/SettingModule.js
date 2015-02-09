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
