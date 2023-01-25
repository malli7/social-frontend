const Posts = (state = { posts: [], mychat: [] }, action) => {
    switch (action.type) {
        case "MYPOSTS":
            return { ...state, posts: action?.payload }
        case "MYCHAT":
            return { ...state, mychat: action?.payload }
        
        default:
            return state;
    }
}

export default Posts;