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
      '<li><a id="campaignProfit">Campain Profit</a></li>' +
      '<li><a id="consumerIntelligence">Consumer Intelligence</a></li>' +
      '<li><a id="qualityScore">Quality Score Model</a></li>' +
    '</ul>'
  ),

  parseClick: function(event){
    this.model.updateTab(event.target.id);
  },

  render: function(){
    this.$el.empty();
    this.$el.append(this.template());
    this.$el.find('#'+ this.model.get('activeTab')).parent().attr('class', 'active');
  }
});

var CampaignProfitView = Backbone.View.extend({
  id: 'tabs',

  initialize: function(){
    this.model.on('change:active', function(){
      if(this.model.get('svg') === null){
        this.model.setSvg(this.el);
      }
      this.render();
    },this);

    // this.model.on('change:svg', function(){
    //   this.render();
    // },this)
    // this.render();
  },
  render: function(){
    if(this.model.get('active') === true){
      console.log('int', this.model.get('svg'));
      $('#tabs').append(this.model.get('svg')[0]);
    }
  }
});

var ConsumerIntelligenceView = Backbone.View.extend({
  id: 'tabs',

  initialize: function(){
    this.model.on('change:active', function(){
      if(this.model.get('svg') === null){
        this.model.setSvg(this.el);
      }
      this.render();
    },this);

    this.model.on('change:svg', function(){
      this.render();
    },this)
    this.render();
  },
  render: function(){
    // debugger
    if(this.model.get('active') === true && this.model.get('svg')){
      console.log('int', this.model.get('svg'));
      if(!$('#tabs').find('svg').length){
        $('#tabs').append($('svg'));
      }
      $('svg').html(this.model.get('svg')[0]);
    }
  }
});

var QualityScoreView = Backbone.View.extend({
  id: 'tabs',

  initialize: function(){
    this.model.on('change:active', function(){
      if(this.model.get('svg') === null){
        this.model.setSvg(this.el);
      }
      this.render();
    },this);

    this.model.on('change:svg', function(){
      this.render();
    },this)
    this.render();
  },
  render: function(){
    // debugger
    if(this.model.get('active') === true && this.model.get('svg')){
      console.log('int', this.model.get('svg'));
      debugger
      if(!$('#tabs').find('svg').length){
        $('#tabs').append($('svg'));
      }
      $('svg').html(this.model.get('svg')[0]);
    }
  }
});