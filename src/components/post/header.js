import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import getImg from "../../utils/getImg";
const Header = ({ username }) => {
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <Link to={`/p/${username}`} className="flex items-center">
          <img
            src={getImg(`./images/avatars/${username}.jpg`)}
            className="rounded-full h-8 w-8 flex mr-3"
            alt={`post by ${username}`}
          />
          <p className="font-bold">{username}</p>
        </Link>
      </div>
    </div>
  );
};

Header.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Header;
