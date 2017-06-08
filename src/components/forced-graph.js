import React, {Component} from 'react';
import * as d3 from 'd3';
import './_forced-graph.css';

const links = [
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

var width = 960;
var height = 500;

class ForcedGraph extends Component {
	force = null;
	constructor(props){
		super(props)
		this.force = d3.layout.force()
					  .charge(-300)
					  .linkDistance(50)
					  .size([width, height]);
	}

  componentWillMount() {
    this.force.on('tick', () => {
      // after force calculation starts, call
      // forceUpdate on the React component on each tick
      this.forceUpdate()
    })
  }

  componentWillReceiveProps(nextProps) {
    // we should actually clone the nodes and links
    // since we're not supposed to directly mutate
    // props passed in from parent, and d3's force function
    // mutates the nodes and links array directly
    // we're bypassing that here for sake of brevity in example
    this.force.nodes(nextProps.nodes).links(nextProps.links);
    this.force.start();
  }

	render() {
    // use React to draw all the nodes, d3 calculates the x and y
    var nodes = this.props.nodes.map(node => {
      var transform = 'translate(' + node.x + ',' + node.y + ')';
      return (
        <g className='node' key={node.key} transform={transform}>
          <circle r={node.size} />
          <text x={node.size + 5} dy='.35em'>{node.key}</text>
        </g>
      );
    });
    var links = this.props.links.map(link => {
      return (
        <line className='link' key={link.key} strokeWidth={link.size}
          x1={link.source.x} x2={link.target.x} y1={link.source.y} y2={link.target.y} />
      );
    });

    return (
      <svg width={width} height={height}>
        <g>
          {links}
          {nodes}
        </g>
      </svg>
    );
	}
}

export default ForcedGraph;
