
const globalState = {
    popup: false,
    isLogin: false,
    isLoading: false,
    user: {},
    notes: []
}

const reducer = (state = globalState, action) => {
    switch (action.type) {
        case 'CHANGE_POPUP':
            return {
                ...state,
                popup: action.value
            };
        case 'CHANGE_ISLOGIN':
            return {
                ...state,
                isLogin: action.value
            };
        case 'CHANGE_USER':
            return {
                ...state,
                user: action.value
            };
        case 'CHANGE_LOADING':
            return {
                ...state,
                isLoading: action.value
            };
        case 'SET_NOTES':
            return {
                ...state,
                notes: action.value
            };
        default:
            return state;
    }
}

export default reducer;