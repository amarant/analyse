var app = require("../../app");
var modulesGraph = require("../../graphs/modules");

module.exports = function() {
  document.title = "modules";
  $(".page").html(require("./cycles.jade")({
    cycles: modulesGraph.cycles
  }));
  modulesGraph.show();
  modulesGraph.setNormal();
  modulesGraph.setActiveCycles(modulesGraph.cycles);
  return function() {
    modulesGraph.hide();
  }
};