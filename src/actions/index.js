export const increment = (nr) => {
    return {
        type: 'INCREMENT',
        payload: 5
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
