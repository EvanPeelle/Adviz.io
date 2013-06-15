var TabsView = Backbone.View.extend({

});

TabView
  id: this.model.get('viewId'),

  template: _.template('<div id='graph'></div><div id='table'></div>'),

  render: functin(){
    this.$el.append(svc);
    this.$el.append(table);
  }
}
