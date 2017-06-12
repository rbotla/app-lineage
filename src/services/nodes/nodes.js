export default ( state = initialState, { type, payload } ) => {
  switch (type) {
    case "SAVE_NEW_CONNECTION_COMPLETED":
    	const list = payload.map( m => 	({source: m._fields[0], target: m._fields[1], type: "suit" }))
	console.log(JSON.stringify(list));
      return {...state, nodes_list: list};
    default: 
      return state;
  }
};

const initialState = {
	message: 'Welcome Ravi!',
	list: []
}