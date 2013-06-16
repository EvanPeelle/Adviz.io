var App = function(){
  this.tabLogic = new TabLogic();
  this.tabsView =  new TabsView({el: '#tabs', model: this.tabLogic});
  this.tabLogic.updateTab('campaignProfit');
};

var TabLogic = Backbone.Model.extend({
  defaults: {
    activeTab: null,
    tabModels: {},
    tabViews: {}
  },
  initialize: function(){

    this.get('tabModels').campaignProfitModel = new CampaignProfitModel();
    this.get('tabViews').campaignProfitView = new CampaignProfitView({model: this.get('tabModels').campaignProfitModel});

    this.get('tabModels').consumerIntelligenceModel = new ConsumerIntelligenceModel();
    this.get('tabViews').consumerIntelligenceView = new ConsumerIntelligenceView({model: this.get('tabModels').consumerIntelligenceModel});

    this.get('tabModels').qualityScoreModel = new QualityScoreModel();
    this.get('tabViews').qualityScoreView = new QualityScoreView({model: this.get('tabModels').qualityScoreModel});
  },
  updateTab: function(id){
    this.set('activeTab', id);
    for(var key in this.get('tabModels')){
      if(key === id + 'Model'){
        this.get('tabModels')[key].set('active', true);
      }else {
        this.get('tabModels')[key].set('active', false);
          //hack... intelligence and Score don't refresh after first time 
          //refreshing profit for animation
        if(key === 'campaignProfitModel'){
          this.get('tabModels').campaignProfitModel.set('svg', null);
        }

        if(key === 'consumerIntelligenceModel'){
          this.get('tabModels').consumerIntelligenceModel.set('svg', null);
        }
         
        if(key === 'qualityScoreModel'){
         this.get('tabModels').qualityScoreModel.set('svg', null);
        }
      }
    }
  }
});