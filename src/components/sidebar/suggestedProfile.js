import { useState } from "react";
import PropTypes from "prop-types";
import getImg from "../../utils/getImg";
import { Link } from "react-router-dom";
import {
  updateFollowedUserFollowers,
  updateLoggedInUserFollowing,
} from "../../services/firebase";
const SuggestedProfile = ({
  profileDocId,
  profileId,
  username,
  userId,
  loggedInUserDocId,
}) => {
  const [followed, setFollowed] = useState(false);
  const handleFollowUser = async () => {
    setFollowed(true);
    await updateFollowedUserFollowers(profileDocId, userId, false);
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
  };
  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={getImg(`./images/avatars/${username}.jpg`)}
          alt={`${username} img`}
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <button
        onClick={() => handleFollowUser()}
        className="text-xs font-bold text-blue-medium"
        type="button">
        Follow
      </button>
    </div>
  ) : null;
};

SuggestedProfile.prototype = {
  username: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired,
  profileDocId: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
};

export default SuggestedProfile;
