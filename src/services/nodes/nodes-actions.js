import customAxios from '../../custom-axios';

export function saveNewElementCompleted () {
	return  {
		type: "SAVE_NEW_CONNECTION_COMPLETED",
		payload: {}
	}
}

export function saveNewNode( source, link, target ) {
	console.log(source, link, target);
	return (dispatch) => {
		return customAxios('nodes', {
			method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
      	source: source,
      	link: link,
      	target: target
      })
		})
		.then((newData) => dispatch(saveNewElementCompleted()))
	}
}
