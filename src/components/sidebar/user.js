import { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import getImg from "../../utils/getImg";

const User = ({ username, fullName }) => {
  return (
    <Fragment>
      {username && fullName ? (
        <Link
          to={`/p/${username}`}
          className="grid grid-cols-4 gap-4 mb-6 items-center">
          <div className="flex items-center justify-between col-span-1">
            <img
              className="rounded-full w-16 flex mr-3"
              src={getImg(`./images/avatars/${username}.jpg`)}
              alt="user profile img"
            />
          </div>
          <div className="col-span-3">
            <p className="font-bold text-sm">{username}</p>
            <p className="font text-sm">{fullName}</p>
          </div>
        </Link>
      ) : (
        <Skeleton count={1} height={61} />
      )}
    </Fragment>
  );
};

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
};

export default User;
