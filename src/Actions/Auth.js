import * as api from '../API';

export const signIn = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: "AUTH", data })
        navigate('/')
    } catch (error) {
        console.log(error);
    }
}


export const signUp = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: "AUTH", data })
        navigate('/')
    } catch (error) {
        console.log(error);
    }
}


export const updateProfile = (formData) => async (dispatch) => {
    try {
        const { data } = await api.updateProfile(formData);
        dispatch({ type: "UPDATEPROFILE", data });
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}


export const follow = (id) => async (dispatch) => {
    try {
        const { data } = await api.follow(id);
        dispatch({ type: "FOLLOW", data })
        window.location.reload();
    } catch (error) {
        console.log(error);

    }
}


export const unfollow = (id) => async (dispatch) => {
    try {
        const { data } = await api.unfollow(id);
        dispatch({ type: "UNFOLLOW", data })
        window.location.reload();
    } catch (error) {
        console.log(error);

    }
}


export const suggestions = () => async (dispatch) => {
    try {
        const { data } = await api.suggestions();
        dispatch({ type: "SUGGESTIONS", data })
    } catch (error) {
        console.log(error);

    }
}


export const followingDetails = () => async (dispatch) => {
    try {
        const { data } = await api.followingDetails();
        dispatch({ type: "FOLLOWINGDETAILS", data })
    } catch (error) {
        console.log(error);

    }
}


export const followersDetails = () => async (dispatch) => {
    try {
        const { data } = await api.followersDetails();
        dispatch({ type: "FOLLOWERSDETAILS", data })
    } catch (error) {
        console.log(error);

    }
}


export const followingPosts = () => async (dispatch) => {
    try {
        let { data } = await api.followingPosts();
        dispatch({ type: "FOLLOWINGPOSTS", data });
    } catch (error) {
        console.log(error);

    }
}

export const explorePosts = () => async (dispatch) => {
    try {
        let { data } = await api.explorePosts();
        dispatch({ type: "EXPLOREPOSTS", data });
    } catch (error) {
        console.log(error);

    }
}

export const userProfile = (id) => async (dispatch) => {
    try {
        let { data } = await api.userProfile(id);
        dispatch({ type: "USERPROFILE", data });
    } catch (error) {
        console.log(error);
    }
}

export const userProfileByUserName = (username) => async (dispatch) => {
    try {
        let { data } = await api.userProfileByUserName(username);
        dispatch({ type: "USERPROFILE", data });
    } catch (error) {
        dispatch({ type: "USERPROFILE", error });
        console.log(error);
    }
}