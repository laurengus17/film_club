import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
        credential,
        password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

// export const signup = (user) => async (dispatch) => {
//     const { username, email, password } = user;
//     const response = await csrfFetch("/api/users", {
//         method: "POST",
//         body: JSON.stringify({
//         username,
//         email,
//         password,
//         }),
//     });
//     const data = await response.json();
//     dispatch(setUser(data.user));
//     return response;
// };

export const signup = (user) => async (dispatch) => {
    const { images, image, username, email, password } = user;
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    // for multiple files
    if (images && images.length !== 0) {
        for (var i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
        }
    }

    // for single file
    if (image) formData.append("image", image);

    const response = await csrfFetch("/api/users", {
        method: "POST",
        headers: {
        "Content-Type": "multipart/form-data",
        },
        body: formData,
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER: {
        newState = Object.assign({}, state);
        newState.user = action.payload;
        return newState;
        }
        case REMOVE_USER: {
        newState = Object.assign({}, state);
        newState.user = null;
        return newState;
        }
        default:
            return state;
    }
};

export default sessionReducer;