import axios from 'axios';

const API = axios.create({ baseURL: 'https://socialbackend-fqjq.onrender.com' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.token = JSON.parse(localStorage.getItem('profile')).token;
    }
    return req;
})

export const signIn = (formData) => API.post('/users/signin', formData);

export const signUp = (formData) => API.post('/users/signup', formData);

export const suggestions = () => API.get('/users/suggestions');

export const followingDetails = () => API.get('/users/followingdetails');

export const followersDetails = () => API.get('/users/followersdetails');

export const updateProfile = (formData) => API.patch('/users/update', formData);

export const follow = (id) => API.patch(`/users/follow/${id}`);

export const unfollow = (id) => API.patch(`/users/unfollow/${id}`);

export const followingPosts = () => API.get('/users/following');

export const explorePosts = () => API.get('/users/exploreposts/');

export const userProfile = (id) => API.get(`/users/profile/${id}`);

export const userProfileByUserName = (username) => API.get(`/users/profilebyusername/${username}`);


export const createPost = (formData) => API.post('/posts/createpost', formData);

export const getMyPosts = () => API.get('/posts/getmyposts');

export const updatePost = (id, formData) => API.patch(`/posts/updatepost/${id}`, formData);

export const likePost = (id) => API.patch(`/posts/updatepost/${id}/likepost`);

export const commentPost = (id, formData) => API.patch(`/posts/updatepost/${id}/commentpost`, formData);

export const deletePost = (id) => API.delete(`/posts/deletepost/${id}`);

