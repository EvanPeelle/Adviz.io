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

  show: 'before',
  lastRenderType: 'before',

  afterModel: null,
  //model
  //afterModel
  // events: {
  //   'click .toggleButton': 'toggleView'
  // },

  initialize: function(options){
    this.afterModel = options.afterModel;
    this.model.on('change:active', function(){
      if(this.model.get('svg') === null){
        
        
      }
      this.render();
    },this);

    // this.on('click','button',function(){
    //   debugger
    //   console.log('clicked');
    // });
  },
  toggleView: function(){
    this.show = this.show === 'before' ? 'after' : 'before';
    console.log("show", this.show);
    this.render();
  },
  render: function(){
    debugger
    if(this.lastRenderType !== this.show){
      $('svg').remove();
      $('#tabNotes').remove();
    }
    this.lastRenderType = this.show;
    if(this.show === 'before'){
      if(this.model.get('active') === true){
        this.model.setSvg(this.el);
        console.log('int', this.model.get('svg'));
        $('#tabs').append(this.model.get('svg')[0]);
        var $tabNotes = $('<div id="tabNotes"></div>')
        $('#tabs').append($tabNotes);
        $('#tabNotes').append(('<ul type="circle" class="campaign_profit">' + 
            '<div>Recommended Optimizations</div>'+
           '<li><div>Pause bids on red keywords</div></li>' +
           '<li><div>Increase bids on blue keywords</div></li>' +
          '</ul>'
        ));
      }
    } else {
      this.afterModel.setSvg(this.el);
      $('#tabs').append(this.afterModel.get('svg')[0]);
      var $tabNotes = $('<div id="tabNotes"></div>')
      $('#tabs').append($tabNotes);
      $('#tabNotes').append(('<ul type="circle" class="campaign_profit">' + 
            '<div>Recommended Optimizations</div>'+
           '<li><div>Pause bids on red keywords</div></li>' +
           '<li><div>Increase bids on blue keywords</div></li>' +
          '</ul>'
      ));
    }
    var self = this;
    $('#tabNotes ul').append('<button class="btn btn-primary toggleButton" type="button">Showing: '+ this.show +'</button>').on('click', function(){
      self.toggleView();
    });
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
      if(!$('#tabs').find('svg').length){
        $('#tabs').append($('svg'));
      }
      $('svg').html(this.model.get('svg')[0]);
      if(!$('#tabNotes').length){
        var $tabNotes = $('<div id="tabNotes"></div>')
        $('#tabs').append($tabNotes);
        $('#tabNotes').append(('<ul type="circle" class="consumer_intelligence_text">' + 
            '<div>Recommended Optimizations</div>'+
           '<li><div>Increase volume on "cat the hat"</div></li>' +
           '<li><div>Pause all others</div></li>' +
          '</ul>'
        ));
      }
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
    if(this.model.get('active') === true && this.model.get('svg')){
      if(!$('#tabs').find('svg').length){
        $('#tabs').append($('svg'));
      }
      $('svg').html(this.model.get('svg')[0]);
      if(!$('#tabNotes').length){
        var $tabNotes = $('<div id="tabNotes"></div>')
        $('#tabs').append($tabNotes);
        $('#tabNotes').append(('<ul type="circle" class="quality_score_text">' + 
            '<div>Recommended Optimizations</div>'+
           '<li><div>Seperate and optimize red keywords</div></li>' +
           '<li><div>Cat in the hat</div></li>' +
           '<li><div>Green eggs and ham</div></li>' +
          '</ul>'
        ));
      }
    }
  }
});