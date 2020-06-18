const initialState = {
  list: []
}

export default (state = initialState, action) => {
  if (action.type.indexOf('@@') !== 0) {
    fetch('/api/v1/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action)
    })
  }
  return {
    ...state,
    list: [...state.list, action]
  }
}
