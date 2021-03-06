const transformData = (data) => {
	let nodesList = [];
  data.map(x => {
    nodesList.indexOf(x.source) === -1 ? nodesList.push( x.source ) : null;
    nodesList.indexOf(x.target)  === -1 ? nodesList.push( x.target ) : null;
  })

  const nodes = nodesList.map( x => ({name: x, group: 1}));
  const links = data.map( x => {
    const sIndex = nodesList.indexOf(x.source);
    const tIndex = nodesList.indexOf(x.target);
    return ( {source: sIndex, target: tIndex} )
  });

  return {nodes: [...nodes], links: [...links]};
}

const  collide = (graph, alpha) => {
	var padding = 1, // separation between circles
  	  radius=14;
  var quadtree = d3.geom.quadtree(graph.nodes);
  return function(d) {
    var rb = 2*radius + padding,
        nx1 = d.x - rb,
        nx2 = d.x + rb,
        ny1 = d.y - rb,
        ny2 = d.y + rb;

    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y);
          if (l < rb) {
          l = (l - rb) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });
  };
}

