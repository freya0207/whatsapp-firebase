export const initialState = { user: null };

export const actionTypes = {
    SET_USER: "SET_USER",
};

const reducer = (state, action) => {
    console.log("reducer.js action:", action);
    // console.log("reducer.js action.type:", action.user.email);
    // console.log("reducer.js displayName:", action.user.displayName);

    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        default:
            return state;
    }
};

export default reducer;