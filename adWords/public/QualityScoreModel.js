var QualityScoreModel = Backbone.Model.extend({
  defaults:{
    active: false,
    svg: null
  },
  setSvg: function(el){
    var margin = {top: 22, right: 10, bottom: 10, left: 10},
    width = 560 - margin.left - margin.right,
    height = 3000 - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .range([0, width])

    var y = d3.scale.ordinal()
        .rangeRoundBands([0, height], .15);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("top");

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var self = this;
    d3.csv("BillsWork2/transformed.csv", type, function(error, data) {
      x.domain(d3.extent(data, function(d) { return d.QualityScore; })).nice();
      y.domain(data.map(function(d) { return d.Keyword; }));

      var bar = svg.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", function(d) { return d.value < 0 ? "bar negative" : "bar positive"; })
          .attr("x", function(d) { return x(Math.min(0, d.QualityScore)); })
          .attr("y", function(d) { return y(d.Keyword) * .2 + 1; })
          .attr("width", function(d) { return Math.abs(x(d.QualityScore) - x(0)); })
          .attr("height", 30)
          .attr("opacity", 1)

    var star = svg.selectAll(".star")
          .data(data)
        .enter().append("rect")
          .attr("class", "star")
          .attr("x", function(d) { return x(Math.min(0, d.QualityScore)); })
          .attr("y", function(d) { return y(d.Keyword) * .2 + 10; })
          .attr("width", function(d) { return Math.abs(x(2) - x(0) * d.TopPageCPC); })
          .attr("height", 5)
          .attr("opacity", .7)

    var car = svg.selectAll(".car")
          .data(data)
        .enter().append("rect")
          .attr("class", "car")
          .attr("x", function(d) { return x(Math.min(0, d.FirstPageCPC)); })
          .attr("y", function(d) { return y(d.Keyword) * .2 + 15; })
          .attr("width", function(d) { return Math.abs(x(2) - x(0) * d.FirstPageCPC); })
          .attr("height", 5)
          .attr("opacity", .9)
          

      svg.append("g")
          .attr("class", "x axis")
          .call(xAxis);
          
      svg.append("g")
          .attr("class", "x axis")
          .call(xAxis2);

      svg.append("g")
          .attr("class", "y axis")
        .append("line")
          .attr("x1", x(0))
          .attr("x2", x(0))
          .attr("y2", height);
          
      svg.selectAll("text1")
          .data(data)
          .enter()
          .append("text")
          .text(function(d) { return d.Keyword; })
          .attr("y", function(d) { return y(d.Keyword) * .8; });
          
      self.set('svg', svg);
    });

    function type(d) {
      d.QualityScore = +d.QualityScore;
      return d;
    }
  this.set('svg', svg);
  }
})