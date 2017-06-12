import React, {Component} from 'react';
import './_forced-graph.css';
import d3 from 'd3';

const _links = [
  {source: "Billform", target: "SBP", type: "suit"},
  {source: "CommonFeed", target: "Billform", type: "suit"},
  {source: "GlobalScape", target: "SBP", type: "suit"},
  {source: "MEDI", target: "GlobalScape", type: "suit"},
  {source: "CHAPIN", target: "GlobalScape", type: "suit"},
  {source: "CLINICIAN", target: "GlobalScape", type: "suit"},
  {source: "Consumer Engagement", target: "GlobalScape", type: "suit"},
  {source: "Express Bill", target: "SBP", type: "suit"},
  {source: "FVTech", target: "SBP", type: "suit"},
  {source: "Realtime", target: "SBP", type: "suit"},
  {source: "OKC", target: "Billform", type: "suit"},
  {source: "SBP", target: "PPPM", type: "suit"},
  {source: "SBP", target: "EDW", type: "suit"},
  {source: "SBP", target: "Oracle AR", type: "suit"}
];

const width = 960;
const height = 500;

class ForcedGraph extends Component {

  componentDidMount() {
    this.buildD3(this.props.data);
  }

  componentWillReceiveProps () {
    this.buildD3(this.props.data);    
  }

  buildD3(links) {
    if (!links) return;

console.log(links);
    const nodes = {};

    // Compute the distinct nodes from the links.
    links.forEach(function(link) {
      link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
      link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
    });

    const width = 960,
        height = 500;

    const force = d3.layout.force()
        .nodes(d3.values(nodes))
        .links(links)
        .size([width, height])
        .linkDistance(60)
        .charge(-300)
        .on("tick", tick)
        .start();

    d3.select("body").select("svg").remove();

    let svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    // Per-type markers, as they don't inherit styles.
    svg.append("defs").selectAll("marker")
        .data(["suit", "licensing", "resolved"])
      .enter().append("marker")
        .attr("id", function(d) { return d; })
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 15)
        .attr("refY", -1.5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
      .append("path")
        .attr("d", "M0,-5L10,0L0,5");

    const path = svg.append("g").selectAll("path")
        .data(force.links())
      .enter().append("path")
        .attr("class", function(d) { return "link " + d.type; })
        .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });

    const circle = svg.append("g").selectAll("circle")
        .data(force.nodes())
      .enter().append("circle")
        .attr("r", 6)
        .call(force.drag);

    const text = svg.append("g").selectAll("text")
        .data(force.nodes())
      .enter().append("text")
        .attr("x", 8)
        .attr("y", ".31em")
        .text(function(d) { return d.name; });

    // Use elliptical arc path segments to doubly-encode directionality.
    function tick() {
      path.attr("d", linkArc);
      circle.attr("transform", transform);
      text.attr("transform", transform);
    }

    function linkArc(d) {
      const dx = d.target.x - d.source.x,
          dy = d.target.y - d.source.y,
          dr = Math.sqrt(dx * dx + dy * dy);
      return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
    }

    function transform(d) {
      return "translate(" + d.x + "," + d.y + ")";
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   // we should actually clone the nodes and links
  //   // since we're not supposed to directly mutate
  //   // props passed in from parent, and d3's force function
  //   // mutates the nodes and links array directly
  //   // we're bypassing that here for sake of brevity in example
  //   //this.force.nodes(nextProps.nodes).links(nextProps.links);
  //   //this.force.start();
  // }

	render() {
    // use React to draw all the nodes, d3 calculates the x and y
    /*const nodes = this.props.nodes.map(node => {
      const transform = 'translate(' + node.x + ',' + node.y + ')';
      return (
        <g className='node' key={node.key} transform={transform}>
          <circle r={node.size} />
          <text x={node.size + 5} dy='.35em'>{node.key}</text>
        </g>
      );
    });

    const links = this.props.links.map(link => {
      return (
        <line className='link' key={link.key} strokeWidth={link.size}
          x1={link.source.x} x2={link.target.x} y1={link.source.y} y2={link.target.y} />
      );
    });*/

    return (
      <div></div>
    );
	}
}

export default ForcedGraph;
