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
