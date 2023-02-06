import PropTypes from "prop-types";
import { Fragment, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user";
import { toggleFollow, isUserFollowingProfile } from "../../services/firebase";
import getImg from "../../utils/getImg";

const Header = ({
  photosCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId = "",
    userId: profileUserId,
    fullName,
    username: profileUsername,
    following: profileFollowing = [],
    followers: profileFollowers = [],
  },
}) => {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = user.username && user.username !== profileUsername;
  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);

    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profileDocId,
      profileUserId,
      user.userId
    );

    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
  };
  useEffect(() => {
    const isLoggedInUserFollowingUserProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(!!isFollowing);
    };
    if (user.username && profileUserId) isLoggedInUserFollowingUserProfile();
  }, [profileUserId, user.username]);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        {user.username && (
          <img
            className="rounded-full h-40 w-40 flex"
            src={getImg(`/images/avatars/${profileUsername}.jpg`)}
            alt={`${profileUsername} profile pic`}
          />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profileUsername}</p>
          {activeBtnFollow && (
            <button
              className={`${
                isFollowingProfile
                  ? "bg-gray-primary text-blue-medium"
                  : "bg-blue-medium text-white"
              } font-bold text-sm rounded w-20 h-8`}
              type="button"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleToggleFollow();
                }
              }}
              onClick={handleToggleFollow}>
              {isFollowingProfile ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="container flex mt-4">
          {profileFollowers === undefined || profileFollowing === undefined ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <Fragment>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span>
                {` `}
                {photosCount === 1 ? `post` : `posts`}
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {` `}
                {followerCount === 1 ? `follower` : `followers`}
              </p>
              <p className="mr-10">
                <span className="font-bold">{profileFollowing.length}</span>
                {` `}
                following
              </p>
            </Fragment>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!fullName ? <Skeleton count={1} height={24} /> : fullName}
          </p>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  followerCount: PropTypes.number.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string,
    following: PropTypes.array,
    followers: PropTypes.array,
  }).isRequired,
};
export default Header;
