import { combineReducers } from "redux";
import Auth from "./Auth";
import Posts from './Posts';

export default combineReducers({ Auth, Posts });