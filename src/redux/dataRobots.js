export const fetchData = () => {
  return async (dispatch) => {
    const baseUrl = "http://dummy.restapiexample.com/api/v1/employees"
    try {
      const response = await fetch(baseUrl)
      const data = await response.json()
      console.log("Desde el redux", data)
      dispatch({
        type: "FETCHDATA",
        payload: data.data,
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}

export const index = (id) => {
  return {
    type: "INDEX",
    payload: id,
  }
}

const initialState = {
  idRobot: 1,
  robots: null,
}

export default function countReducer(state = initialState, action) {
  switch (action.type) {
    case "INDEX":
      return {
        ...state,
        idRobot: action.payload,
      }
    case "FETCHDATA":
      return {
        ...state,
        robots: action.payload,
      }

    default:
      return state
  }
}
