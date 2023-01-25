import * as api from '../API';

export const createPost = (formData) => async (dispatch) => {
    try {
        await api.createPost(formData);
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}


export const getMyPosts = () => async (dispatch) => {
    try {
        const { data } = await api.getMyPosts();
        dispatch({ type: "MYPOSTS", payload: data });
    } catch (error) {
        console.log(error);
    }
}


export const updatePost = (id, formData) => async (dispatch) => {
    try {
        await api.updatePost(id, formData);
    } catch (error) {
        console.log(error);
    }
}


export const updatePostFromProfile = (id, formData) => async (dispatch) => {
    try {
        await api.updatePost(id, formData);
        window.location.reload()
    } catch (error) {
        console.log(error);
    }
}


export const likePost = (id) => async (dispatch) => {
    try {
        await api.likePost(id);
    } catch (error) {
        console.log(error);
    }
}


export const commentPost = (id, formData) => async (dispatch) => {
    try {
        await api.commentPost(id, formData);
    } catch (error) {
        console.log(error);

    }
}


export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        window.location.reload();
    } catch (error) {
        console.log(error);

    }
}


export const getChat = (userid1, userid2) => async (dispatch) => {
    try {
        const { data } = await api.getChat(userid1, userid2);
        dispatch({ type: "MYCHAT", payload: data });
    } catch (error) {
        console.log(error);

    }
}

export const sendMessage = (formData) => async (dispatch) => {
    try {
        await api.sendMessage(formData);
    } catch (error) {
        console.log(error);

    }
}