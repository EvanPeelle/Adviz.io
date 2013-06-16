var ConsumerIntelligenceModel = Backbone.Model.extend({
  defaults:{
    active: false,
    svg: null
  },
  setSvg: function(el){
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var formatPercent = d3.format(".0%");

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(formatPercent);
        debugger
    var svg = d3.select('body').append("svg")  //right here  body to el
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var self = this;
    console.log(this.get('svg') === svg);
    d3.csv("BillsWork/data2.csv", function(error, data) {
      console.log(self.get('svg') === svg);
      data.forEach(function(d) {
        d.ImpressionShare = +d.ImpressionShare;
      });
      x.domain(data.map(function(d) { return d.AdHeadline; }));
      y.domain([0, d3.max(data, function(d) { return d.ImpressionShare; })]);
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Frequency");

      var bars = svg.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.AdHeadline); })
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return y(d.ImpressionShare); })
          .attr("height", function(d) { return height - y(d.ImpressionShare); })
          .attr('opacity', .5)
          
      var circles = svg.selectAll(".circle")
            .data(data)
            .enter().append("ellipse")
            .attr("class", "ellipse")
            .attr("cx", function(d) { return x(d.AdHeadline) + 55; })
            .attr("cy", function(d) { return y(d.Purchase_ConversionRate) - 20; })
            .attr("rx", 40)
            .attr("ry", 5)
            .attr("fill","red");
      self.set('svg', svg);
    });
  this.set('svg', svg);
  }
})