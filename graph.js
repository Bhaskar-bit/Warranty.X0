//Return array of 10 random numbers
var randArray = function() {

  for (var i = 0, array = new Array(); i < 10; i++) {
    array.push(Math.floor(Math.random() * 10 + 1))
  }
  return array
}

var initRandArray = randArray();
var newArray;



var w = 500;
var h = 200;
var barPadding = 1;
var mAx = d3.max(initRandArray)
var yScale = d3.scaleLinear()
  .domain([0, mAx])
  .range([0, h])

var svg = d3.select("section")
  .append("svg")
  .attr("width", w)
  .attr("height", h)

svg.selectAll("rect")
  .data(initRandArray)
  .enter()
  .append("rect")
  .attr("x", function(d, i) {
    return i * (w / initRandArray.length)
  })
  .attr("y", function(d) {
    return h - yScale(d)
  })
  .attr("width", w / initRandArray.length - barPadding)
  .attr("height", function(d) {
    return yScale(d)
  })
  .attr("fill", function(d) {
    return "rgb(136, 196, " + (d * 100) + ")";
  });

svg.selectAll("text")
  .data(initRandArray)
  .enter()
  .append("text")
  .text(function(d) {
    return d
  })
  .attr("x", function(d, i) {
    return (i * (w / initRandArray.length) + 20)
  })
  .attr("y", function(d) {
    return h - yScale(d) + 15
  })
  .attr("font-family", "sans-serif")
  .attr("fill", "white")

setInterval(function() {

  newArray = randArray();

  var rects = svg.selectAll("rect")

  rects.data(newArray)
    .enter()
    .append("rect")

  rects.transition()
    .ease(d3.easeLinear)
    .duration(2000)
    .attr("x", function(d, i) {
      return i * (w / newArray.length)
    })
    .attr("y", function(d) {
      return h - yScale(d)
    })
    .attr("width", w / newArray.length - barPadding)
    .attr("height", function(d) {
      return yScale(d)
    })
    .attr("fill", function(d) {
      return "rgb(136, 196, " + (d * 100) + ")";
    });

  var labels = svg.selectAll("text")

  labels.data(newArray)
    .enter()
    .append("text")

  labels.transition()
    .ease(d3.easeLinear)
    .duration(2000)
    .text(function(d) {
      return d
    })
    .attr("x", function(d, i) {
      return (i * (w / newArray.length) + 20)
    })
    .attr("y", function(d) {
      return h - yScale(d) + 15
    })
    .attr("font-family", "sans-serif")
    .attr("fill", "white")


}, 3000)
