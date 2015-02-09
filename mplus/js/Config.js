/*MisbarSocialhub.module('Config', function (Config, App, Backbone, Marionette, $) {
 	
	
	
	Config.Actions;
	
	Config.ActionsModel = Backbone.Model.extend({});
    Config.ActionsCollection = Backbone.Collection.extend({ 
		model: Config.ActionsModel,
		url: "http://32cc5dcfe2544edd8d5fb578b1cf0bb7.cloudapp.net/api/UserActions/rahmanoof",
		initialize:function(){ },
		sync: function(method, model, options){
                    options.timeout = 10000;
                    options.dataType = "json";
					options.error=this.error;
					options.contentType = "application/json; charset=utf-8";
            return Backbone.sync(method, model, options);
        },
		parse: function(response){ alert(''+response); return response; },
		error:function(response,responseText){ alert('error..: ' + responseText); }
	});
	
	
});
*/