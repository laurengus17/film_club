const LOAD_ALBUMS = 'album/loadAlbums';
const ADD_ALBUM = 'album/addAlbum';
const EDIT_ALBUM = 'album/editAlbum';
const REMOVE_ALBUM = 'album/removeAlbum';

const loadAlbums = (albums) => {
    return {
        type: LOAD_ALBUMS,
        albums
    };
};

const addAlbum = (album) => {
    return {
        type: ADD_ALBUM,
        payload: album,
    };
};

const editAlbum = () => {
    return {
        type: EDIT_ALBUM,
    };
};

const removeAlbum = () => {
    return {
        type: REMOVE_ALBUM,
    };
};

// THUNKS

export const getAlbums = () => async (dispatch) => {
    const res = await fetch('/api/album');

    if(res.ok) {
        const albums = await res.json();
        dispatch(loadAlbums(albums));
    }
}

// createAlbum()

//initial state
const initialState = {};

// reducers
const albumsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALBUMS:
            const allAlbums = {};
            action.albums.forEach((album) => {
                allAlbums[album.id] = album;
            });
            return {
                ...allAlbums,
                ...state
            };
        default:
            return state;
    }
}

export default albumsReducer;