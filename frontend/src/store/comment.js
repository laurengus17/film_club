import { csrfFetch } from './csrf';

const LOAD_COMMENTS = 'comment/loadComments';
const ADD_COMMENT = 'comment/addComment';
const EDIT_COMMENT = 'comment/editComment';
const REMOVE_COMMENT = 'comment/removeComment';

const loadComments = (comments) => {
    return {
        type: LOAD_COMMENTS,
        comments
    };
};

const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        payload: comment,
    };
};

const editComment = (comment) => {
    return {
        type: EDIT_COMMENT,
        comment
    };
};

const removeComment = (id) => {
    return {
        type: REMOVE_COMMENT,
        id
    };
};

// THUNKS

export const getComments = () => async (dispatch) => {
    const res = await csrfFetch('/api/comment');

    if(res.ok) {
        const comments = await res.json();
        dispatch(loadComments(comments));
        return res;
    }
}

export const createComment = ({ content, userId, imageId }) => async (dispatch) => {
    const comment = {
        content,
        userId,
        imageId
    }

    const res = await csrfFetch('/api/comment', {
        method: `POST`,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(comment)
    })

    if(res.ok) {
        const data = await res.json();
        dispatch(addComment(data.comment));
        return data;
    }
}

export const updateComment = ({ content, userId, imageId }, id) => async (dispatch) => {
    const comment = { id, content, userId, imageId }
    const res = await csrfFetch(`/api/comment/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({comment})
    });

    if(res.ok) {
        const data = await res.json();
        dispatch(editComment(data));
        return data;
    }
}

export const deleteComment = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/comment/${id}`, {
        method: 'DELETE'
    });

    if(res.ok) {
        dispatch(removeComment(id))
    }
}
//initial state
const initialState = {};

// reducers
const commentsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_COMMENTS:
            const allComments = {};
            action.comments.forEach((comment) => {
                allComments[comment.id] = comment;
            });
            return {
                ...allComments,
                ...state
            };
        case ADD_COMMENT:
        {
        newState = Object.assign({}, state);
        newState[action.payload.id] = action.payload;
        return newState;
        }
        case EDIT_COMMENT:
        {
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        }
        case REMOVE_COMMENT:
        {
            const newState = {...state}
            delete newState[action.id]
            return newState
        }
        default:
            return state;
    }
}

export default commentsReducer;