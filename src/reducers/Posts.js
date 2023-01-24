const Posts = (state = { posts: [] }, action) => {
    switch (action.type) {
        case "MYPOSTS":
            return { ...state, posts: action?.payload }
        default:
            return state;
    }
}

export default Posts;