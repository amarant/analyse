function Graph(vertices){
    this.vertices = vertices || [];
}
 
function Vertex(name){
    this.name = name;
    this.connections = [];
    
    // used in tarjan algorithm
    // went ahead and explicity initalized them
    this.index= -1;
    this.lowlink = -1;
    this.onStack = false;
}

Vertex.prototype = {
    equals: function(vertex){
        // equality check based on vertex name
        return (this.name==vertex.name);
    }
};
 
function VertexStack(vertices) {
    this.vertices = vertices || [];
}
 
function Tarjan(graph) {
    this.index = 0;
    this.stack = new VertexStack();
    this.graph = graph;
    this.scc = [];
}
Tarjan.prototype = {
    run: function(){
        for (var i in this.graph.vertices){
            if (this.graph.vertices[i].index<0){
                this.strongconnect(this.graph.vertices[i]);
            }
        }
        return this.scc;
    },
    strongconnect: function(vertex){
        // Set the depth index for v to the smallest unused index
        vertex.index = this.index;
        vertex.lowlink = this.index;
        this.index = this.index + 1;
        this.stack.vertices.push(vertex);
        vertex.onStack = true;
        
        // Consider successors of v
        // aka... consider each vertex in vertex.connections
        for (var i in vertex.connections){
            var v = vertex;
            var w = vertex.connections[i];
            if (w.index<0){
                // Successor w has not yet been visited; recurse on it
                this.strongconnect(w);
                v.lowlink = Math.min(v.lowlink, w.lowlink);
            } else if (w.onStack){
                // Successor w is in stack S and hence in the current SCC
                v.lowlink = Math.min(v.lowlink, w.index);
            }
        }
        
        // If v is a root node, pop the stack and generate an SCC
        if (vertex.lowlink == vertex.index){
            // start a new strongly connected component
            var vertices = [];
            var w = null;
            if (this.stack.vertices.length>0){
                do {
                    if (this.stack.vertices.length === 0) {
                        throw new Error("empty stack");
                    }
                    w = this.stack.vertices.pop();
                    w.onStack = false;
                    // add w to current strongly connected component
                    vertices.push(w);
                } while (!vertex.equals(w));
            }
            // output the current strongly connected component
            // ... i'm going to push the results to a member scc array variable
            if (vertices.length>0){
                this.scc.push(vertices);
            }
        }
    }
};

exports.Graph = Graph;
exports.Vertex = Vertex;
exports.Tarjan = Tarjan;
