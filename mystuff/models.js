var App = function(){
  this.tableLogic = new TableLogic;
  this.tabModles = new Tabs();
  this.tabsView =  new TabsView({el: '#tabs', model: this.tableLogic});
  this.bubbleChartModel = new Tab({viewId: "bubble-chart", csvData:'blah1,blah2\nval11,val12\n,val21,val22\n'});
  this.tabView = new TabView({model: this.bubbleChartModel, id: this.bubbleChartModel.get('viewId')});  
  this.tabModles.add(this.bubbleChartModel);
};

var TableLogic = Backbone.Model.extend({
  defaults: {
    activeTab: "bubble-tab"
  }
});

var Tabs = Backbone.Collection.extend({
  model: Tab
});

var Tab = Backbone.Model.extend({
})