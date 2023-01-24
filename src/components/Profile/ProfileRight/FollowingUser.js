import React from "react";
import './ProfileRight.css'
import { useDispatch } from 'react-redux';
import { unfollow } from "../../../Actions/Auth";


const FollowingUser = ({ item }) => {
  const dispatch = useDispatch();

  const handleUnFollow = () => {
    dispatch(unfollow(item._id));
  }

  return (
    <>
      <table style={{ width: "100%", marginBottom: "7px" }}>
        <tbody>
          <tr>
            <td style={{ width: "20%" }}>
              <img style={{ marginLeft: "10px" }} className="friendProfilePic" src={item.profile ? item.profile : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="profile" />
            </td>
            <td style={{ width: "70%", textAlign: "left" }}>
              <b style={{ cursor: "pointer" }}>{item.username}</b><br />
            </td>
            <td className="friendRemoveTab">
              <button className="profileEditBtn" onClick={handleUnFollow}>UnFollow</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>);
};

export default FollowingUser;
