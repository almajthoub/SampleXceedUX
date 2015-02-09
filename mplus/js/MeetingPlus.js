XceedMeetingPlus.module('MeetingPlus', function (MeetingPlus, App, Backbone, Marionette, $) {
    
	this.startWithParent = false;

    MeetingPlus.frontController = Marionette.Controller.extend({

        init:function()
        {
			App.main_menu.show(new App.Menu.main_menu());
        },
        switcher:function(action)
        {
			if (_.isNull(action) || _.isNaN(action))
            {
                console.log("this is Default controller / action");
				//alert('default');
            }
            else
            {
                this.url = action.split('/');
                //alert(this.url[0]);

                var current_controller = this.url[0];
                var method = this.url;
                method.shift();
				
                switch(current_controller)
                {
                    case 'workspace':
						   App.vent.trigger('App:Modules:empty');					
								WorkSpaceModule = App.module("WorkSpaceModule");
								WorkSpaceModule.start(method);
								WorkSpaceModule.controller.route(method);
							App.vent.trigger('App:Modules:add',"WorkSpaceModule");
							
							
                        break;	
					case 'tasks':
                        App.vent.trigger('App:Modules:empty');
							TaskModule = App.module("TaskModule");
							TaskModule.start(method);
							TaskModule.controller.route(method);
						
                        App.vent.trigger('App:Modules:add',"TaskModule");
						
						
                        break;	
					case 'timeline':
                        App.vent.trigger('App:Modules:empty');
							TimelineModule = App.module("TimelineModule");
							TimelineModule.start(method);
							TimelineModule.controller.route(method);
						
                        App.vent.trigger('App:Modules:add',"TimelineModule");
						
						break;	
					case 'search':
					 	App.vent.trigger('App:Modules:empty');
							SearchModule = App.module("SearchModule");
							SearchModule.start(method);
							SearchModule.controller.route(method);
						
                        App.vent.trigger('App:Modules:add',"SearchModule");
						
					
                        break;				
					case 'settings':
						App.vent.trigger('App:Modules:empty');
							SettingModule = App.module("SettingModule");
							SettingModule.start(method);
							SettingModule.controller.route(method);
						
                        App.vent.trigger('App:Modules:add',"SettingModule");
						
						
                        break;
                }
            }
        }
    });

    MeetingPlus.Router = Backbone.Marionette.AppRouter.extend({
        appRoutes: { "*filters":"switcher" }
    });

    MeetingPlus.addInitializer(function () {
        console.log('MeetingPlus:addInitializer');
        
		var controller = new MeetingPlus.frontController();
			controller.router = new MeetingPlus.Router({ controller: controller });
        	controller.init();
			
    });
});
