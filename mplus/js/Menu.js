XceedMeetingPlus.module('Menu', function (Menu, App, Backbone, Marionette, $) {

    Menu.home_menu = Backbone.Marionette.ItemView.extend({
        template: '#home-menu',
        tagName: 'div' //,
        //events: { 'click a':'main_menu_clicked' }
    });
	
	
	
	// read data from json
	Menu.Items = Backbone.Collection.extend({url: 'jsons/Menu.json'});
	
	Menu.main_menu = Backbone.Marionette.Layout.extend({
			template: '#main-menu',
			regions: { UpperMenu: '#UpperMenu' },
			// events: { "click .TaskHeader": "showTask" },
			onRender: function(){
				var data = new Menu.Items();
				data.fetch();
				this.UpperMenu.show(new Menu.MenuCollectionView({collection:data}));
				// this.UpperMenu.show(new Menu.home_menu()) 
			}
	});
	
	Menu.Item = Backbone.Marionette.ItemView.extend({
		template: '#menu-item',
		events: {'click .parent' : 'showWorkSpaces', "click .sub": "showMenu2"},
		showWorkSpaces: function(){
			this.$el.find('.SubMenu:first').toggleClass('active');
		},
		showMenu2: function(e){
			App.main_menu.show(new App.Menu.workspace_menu());
		},
		onRender: function(){
			if(!_.isUndefined(this.model.get("sub"))){
				var data = this.model.get("sub");
				for(i = 0; i < data.length; data[i], i++){
					var subModel = new Backbone.Model({
						title:data[i].title, 
						action:data[i].action
					});
					this.$el.append(new Menu.SubItem({model:subModel}).render().el);
				}
				this.$el.find('a:first').addClass('parent');
			}
		}
	});
	
	Menu.SubItem = Backbone.Marionette.ItemView.extend({template: '#menu-subitem'});
	Menu.MenuCollectionView = Backbone.Marionette.CollectionView.extend({
		itemView: Menu.Item
	});
	
	Menu.SubMenuCollectionView = Backbone.Marionette.CollectionView.extend({
		itemView: Menu.SubItem
	});
	

    
	// Menu.main_menu = Backbone.Marionette.ItemView.extend({ 
		// template: '#home-menu',
		// events: { "click .sub": "showMenu2" },
		// showMenu2: function(e){
			// App.main_menu.show(new App.Menu.workspace_menu());
		 // }
	// });
	
	Menu.workspace_menu = Backbone.Marionette.ItemView.extend({ 
		template: '#workspace-menu',
		events: { "click .sub": "showMenu3", "click .back": "showMenu" },
		showMenu: function(e){
			e.preventDefault();
			App.main_menu.show(new App.Menu.main_menu());
		 },
		showMenu3: function(e){
			e.preventDefault();
			App.main_menu.show(new App.Menu.workspace_menu2());
		 }
	});
	
	Menu.workspace_menu2 = Backbone.Marionette.ItemView.extend({ 
		template: '#workspace-menu2',
		events: { "click .back": "showMenu" },
		showMenu: function(e){
			e.preventDefault();
			App.main_menu.show(new App.Menu.workspace_menu());
		 }
	});
	
	Menu.EmptyMenuItem = Backbone.Marionette.ItemView.extend({ template: "#empty-view" });
	
	Menu.MainMenuItem = Backbone.Model.extend({});
    Menu.MainMenu = Backbone.Collection.extend({ model: Menu.MainMenuItem });

    App.vent.on('MainMenu:selectMainItem', function (id) {
        $('#MainMenu a').removeClass("selected");
		$("#"+id).addClass("selected");
    });

});
