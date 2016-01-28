var graph = {};
module.exports = graph;

graph.DirectedGraph = function(){
  this.edgesList = {};
};

graph.DirectedGraph.prototype = {
  addVertex : function(vertex){
    this.edgesList[vertex] = this.edgesList[vertex] || [];
  },
  edgeCount: 0,
  addEdge : function(from, to){
    this.edgeCount ++;
    this.edgesList[from].push(to);
  },
  hasEdgeBetween : function(from, to){
    return (this.edgesList[from].indexOf(to) != -1);
  },
  order : function(){
    return Object.keys(this.edgesList).length;
  },
  size : function(){
    return this.edgeCount;
  },
  pathBetween : function(from , to, path){
    var path = path || [];
    if(from == to)
      return path.concat(from);
    for(var i in this.edgesList[from]){
      var new_from = this.edgesList[from][i];
      if(path.indexOf(from) == -1){
        var p = this.pathBetween(new_from, to, path.concat(from));
        if(p[p.length - 1] == to)
          return p;
      }
    }
    return [];
  },
  farthestVertex : function(from, initial_point, farthest_path){
    var count = 0,last, farthVertex;
    var all_vertices = Object.keys(this.edgesList);
    for (var index in all_vertices) {
      count = this.pathBetween(from, all_vertices[index]).length;
      if (count > last) farthVertex = all_vertices[index];
      last = count;
   }
   return farthVertex;
  },
  allPaths : function(from, to,visiting, paths){
    paths = paths || [];
    visiting = visiting || [];
    if (from == to) {
      paths.push(visiting.concat(from));
      return ;
    }
    for (var index in this.edgesList[from]) {
      var vertex = this.edgesList[from][index];
      if (visiting.indexOf(vertex) < 0)
          this.allPaths(vertex, to, visiting.concat(from), paths);
    }
    return paths;
  }

};

graph.UndirectedGraph = function(){
  this.edgesList = {};
};

graph.UndirectedGraph.prototype = {
  addVertex : function(vertex){
    this.edgesList[vertex] = this.edgesList[vertex] || [];
  },
  addEdge : function(from, to){
    this.edgeCount ++;
    this.addVertex(from);
    this.edgesList[from].push(to);
    this.addVertex(to);
    this.edgesList[to].push(from);
  },
  hasEdgeBetween : function(from, to){
    return (this.edgesList[from].indexOf(to) != -1);
  },
  order : function(){
    return Object.keys(this.edgesList).length;
  },
  edgeCount : 0,
  size : function(){
    return this.edgeCount;
  },
  pathBetween : function(from , to, path){
      var path = path || [];
      if(from == to)
        return path.concat(from);
        for(var i in this.edgesList[from]){
          var new_from = this.edgesList[from][i];
          if(path.indexOf(from) == -1){
            var p = this.pathBetween(new_from, to, path.concat(from));
            if(p[p.length - 1] == to)
              return p;
          }
        }
        return [];
    },
    farthestVertex : function(from, initial_point, farthest_path){
      var count = 0,last, farthVertex;
         var all_vertices = Object.keys(this.edgesList);
         for (var index in all_vertices) {
             count = this.pathBetween(from, all_vertices[index]).length;
             if (count > last) farthVertex = all_vertices[index];
             last = count;
         }
         return farthVertex;
    },
    allPaths : function(from, to,visiting, paths){
      paths = paths || [];
      visiting = visiting || [];
      if (from == to) {
        paths.push(visiting.concat(from));
        return ;
      }
      for (var index in this.edgesList[from]) {
        var vertex = this.edgesList[from][index];
        if (visiting.indexOf(vertex) < 0)
            this.allPaths(vertex, to, visiting.concat(from), paths);
      }
      return paths;
    }
}
