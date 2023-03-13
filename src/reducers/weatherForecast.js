const weatherForecastReducer = (state = null, action) => {
    switch (action.type) {
        case "SET-WEATHERFORECAST":
            console.log(action.payload);
            state = action.payload;
            return state;
        default:
            return state;
    }
}

export default weatherForecastReducer;