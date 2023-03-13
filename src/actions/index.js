export const increment = (nr) => {
    return {
        type: 'INCREMENT',
        payload: nr
    }
}

export const decrement = () => {
    return {
        type: 'DECREMENT'
    }
}

export const signIn = (responseMessage) => {
    return {
        type: 'SIGN-IN',
        payload: responseMessage
    }
}

export const signOut = () => {
    return {
        type: 'SIGN-OUT'
    }
}

export const setWeatherForecast = (payload) => {
    return {
        type: 'SET-WEATHERFORECAST',
        payload: payload
    }
}
