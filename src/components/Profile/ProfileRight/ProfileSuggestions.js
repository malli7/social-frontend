import React from "react";
import './ProfileRight.css'
import { MdOutlinePersonAddAlt } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { follow } from "../../../Actions/Auth";

const ProfileSuggestions = ({ suggest }) => {
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(follow(suggest._id));
  }

  return (
    <>
      <table style={{ width: "100%", marginBottom: "7px" }}>
        <tbody>
          <tr>
            <td style={{ width: "20%" }}>
              <img style={{ marginLeft: "10px" }} className="profilePicSug" src={suggest.profile ? suggest.profile
                : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`} alt="profile" />
            </td>
            <td style={{ width: "70%", textAlign: "left" }}>
              <b style={{ cursor: "pointer" }}>{suggest.username}</b><br />
              <small style={{ color: "#aaa" }}>Suggested for you</small>
            </td>
            <td className="suggestionFollowTabSug">
              <MdOutlinePersonAddAlt className="suggestionFollowSug" onClick={handleFollow} size={20} />
            </td>
          </tr>
        </tbody>
      </table>
    </>);
};

export default ProfileSuggestions;
