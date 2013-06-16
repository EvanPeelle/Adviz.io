var TabsView = Backbone.View.extend({
  initialize: function(){
    this.model.on('change:activeTab', function(){
      this.render();
    },this)
    this.render();
  },
  events: {
    'click a': 'parseClick'
  },
  template: _.template('<ul class="nav nav-tabs">' +
      '<li><a id="bubble-tab">Bubble Chart</a></li>' +
      '<li><a id="graph2-tab">Graph2</a></li>' +
      '<li><a id="graph3-tab">Graph3</a></li>' +
      '<li><a id="graph4-tab">Graph4</a></li>' +
    '</ul>'
  ),

  parseClick: function(event){
    this.model.set('activeTab', event.target.id);
  },

  render: function(){
    this.$el.empty();
    this.$el.append(this.template());
    this.$el.find('#'+ this.model.get('activeTab')).parent().attr('class', 'active');
  }

});

var TabView = Backbone.View.extend({
  initialize: function(){
  },

  template: _.template("<div id='graph'></div><div id='table'></div>"),

  render: function(){
    this.$el.append(svc);
    this.$el.append(table);
  }
});
