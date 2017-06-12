import customAxios from '../../custom-axios';

export function saveNewElementCompleted (data) {
	return  {
		type: "SAVE_NEW_CONNECTION_COMPLETED",
		payload: data
	}
}

export function saveNewNode ( source, link, target ) {
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
		.then((res) => res.data)
		.then((newData) => dispatch(saveNewElementCompleted(newData)))
	}
}

export function getAllNodes () {
	return (dispatch) => {
		return customAxios('nodes', {
			method: "GET"
		})
		.then((res) => res.data)
		.then((newData) => dispatch(saveNewElementCompleted(newData)))
	}
}
