var graphs = {};

module.exports = graphs;

graphs.WeightedGraph = function(){
  this.edgesList = {};
};

graphs.WeightedGraph.prototype = {
  addVertex : function(vertex){
    this.edgesList[vertex] = this.edgesList[vertex] || [];
  },
  addEdge : function(edge){
    this.edgesList[edge.from].push(edge);
  },
  shortestPath : function(from, to){
    var all_vertices = Object.keys(this.edgesList);
    var parent  = {};
    var distance = {};
    all_vertices.forEach(function(vertex){
      distance[vertex] = Infinity;
    });
    distance[from] = 0;
    for(var i in distance){
      for(var j = 0; j < this.edgesList[i].length; j++){
        var visited_keys = Object.keys(this.edgesList[i][j]);
        if(distance [this.edgesList[i][j]['to']] > this.edgesList[i][j]['edge_weight']){
          distance [this.edgesList[i][j]['to']] = this.edgesList[i][j]['edge_weight'];
          parent[this.edgesList[i][j]['to']] = this.edgesList[i][j]['from'];
        }
        if(distance[i] == 0)
          parent[i] = this.edgesList[i][j]['from'];
      }
    }
    return getShortest(this.edgesList, parent, from, to).reverse();
  }
}


getShortest = function(edgesList, parent, from, to, path){
  var path = path || [];
  if(to == from )
    return path;
  var filtered_path = edgesList[parent[to]].filter(function(edge){
    return edge['to'] == to ;
  });
  if(filtered_path.length > 1){
    filtered_path = filtered_path.reduce(function(prev,curr){
      return (prev['edge_weight'] < curr['edge_weight']) ? prev : curr;
    })
    path.push(filtered_path);
  }else{
    path.push(filtered_path[0]);
  }
  return getShortest(edgesList, parent , from, parent[to], path);
}


graphs.Edge = function(edge_name, from, to, edge_weight){
  this.edge_name = edge_name;
  this.from = from;
  this.to = to;
  this.edge_weight = edge_weight;
};
