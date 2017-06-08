export default ( state = initialState, { type, payload } ) => {
  switch (type) {
    case "SAVE_NEW_CONNECTION_COMPLETED":
      return {...state, message: "New element successfully saved."};
    default: 
      return state;
  }
};

const initialState = {}