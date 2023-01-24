const Auth = (state = { authData: null, suggestions: null }, action) => {
    switch (action.type) {

        case "AUTH":
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };

        case "LOGOUT":
            localStorage.clear()
            return { ...state, authData: null };

        case "UPDATEPROFILE":
            let a = localStorage.getItem("profile");
            let x = { token: JSON.parse(a).token, result: action?.data }
            localStorage.clear();
            localStorage.setItem("profile", JSON.stringify(x));
            return { ...state, authData: x };

        case "SUGGESTIONS":
            return { ...state, suggestions: action?.data };

        case "FOLLOWINGDETAILS":
            return { ...state, followingdetails: action?.data };

        case "FOLLOWERSDETAILS":
            return { ...state, followersdetails: action?.data };

        case "FOLLOW":
            let b = localStorage.getItem("profile");
            let y = { token: JSON.parse(b).token, result: action?.data }
            localStorage.clear();
            localStorage.setItem("profile", JSON.stringify(y));
            return state;

        case "UNFOLLOW":
            let c = localStorage.getItem("profile");
            let z = { token: JSON.parse(c).token, result: action?.data }
            localStorage.clear();
            localStorage.setItem("profile", JSON.stringify(z));
            return state;

        case "FOLLOWINGPOSTS":
            return { ...state, followingposts: action?.data };

        case "EXPLOREPOSTS":
            let data = action?.data;
            for (let i = data.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [data[i], data[j]] = [data[j], data[i]];
            }
            return { ...state, exploreposts: data };

        case "USERPROFILE":
            return { ...state, userprofile: action?.data };
        default:
            return state;
    }
};

export default Auth;