var app = require("../../app");
var modulesGraph = require("../../graphs/modules");

module.exports = function(id) {
  id = parseInt(id, 10);
  document.title = "cycle " + id;
  $(".page").html(require("./cycle.jade")({
    cycle: modulesGraph.cycles[id]
  }));
  modulesGraph.show();
  modulesGraph.setNormal();
  modulesGraph.setActiveCycles([modulesGraph.cycles[id]]);
  return function() {
    modulesGraph.hide();
  }
};