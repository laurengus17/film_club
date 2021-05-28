import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const LOAD_USERS = 'session/loadUsers'
const REMOVE_USER = 'session/removeUser';

const loadUsers = (users) => {
    return {
        type: LOAD_USERS,
        users
    };
};

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

export const getUsers = () => async (dispatch) => {
    const res = await csrfFetch('/api/session');

    if(res.ok) {
        const users = await res.json();
        dispatch(loadUsers(users));
        return res;
    }
}


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
    if(data.user) {
        dispatch(setUser(data.user));
    }
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

const initialState = { user: null, list: [] };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_USERS:
        const allUsers = {};
        action.users.forEach((user) => {
            allUsers[user.id] = user;
        });
        const list = action.users.map((user) => user.id)
        return {
            ...allUsers,
            ...state,
            list
        };
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