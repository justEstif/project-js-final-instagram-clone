import { Fragment, useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";
import { getSuggestedProfiles } from "../../services/firebase";
import SuggestedProfile from "./suggestedProfile";
const Suggestions = ({ userId, following }) => {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    const suggestedProfiles = async () => {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    };
    userId && suggestedProfiles();
  }, [userId, following]);

  return (
    <Fragment>
      {!profiles ? (
        <Skeleton count={1} height={150} className="mt-5" />
      ) : profiles.length > 0 ? (
        <div className="rounded flex flex-col">
          <div className="text-sm flex items-center justify-between mb-2">
            <p className="font-bold text-gray-base">Suggestions for you</p>
          </div>
          <div className="mt-4 grid gap-5">
            {profiles.map((profile) => (
              <SuggestedProfile
                key={profile.docId}
                useDocId={profile.docId}
                username={profile.username}
                profileId={profile.userId}
                userId={userId}
              />
            ))}
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
};
export default Suggestions;
