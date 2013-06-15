App = Backbone.Model.extend({
  initialize: function(){
    this.set(tabModles, new Tabs());
    this.set(tabsView, new TabsView())
    var bubbleChartModel = new Tab({viewId: "bubble-chart", csvData:'blah1,blah2\nval11,val12\n,val21,val22\n'})
    tabs.add(bubbleChartModel);

    // tabs.add(new Tab({viewId: "other_type", csvData:'blah1,blah2\nval11,val12\n,val21,val22\n'}));
    // tabs.add(new Tab({viewId: "other_type", csvData:'blah1,blah2\nval11,val12\n,val21,val22\n'}));

  }
});

var Tabs = Backbone.Collection.extend({
  model: Tab
});

var Tab = Backbone.Model.extend({
  initialize: function(){

  }
})