import { useRef } from "react";
import Header from "./header";
import Image from "./image";
import PropTypes from "prop-types";
const Post = ({ content }) => {
  // components
  // -> header, image, actions (like & comment icons), footer, comments
  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-10">
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
    </div>
  );
};

Post.propTypes = {
  content: PropTypes.shape({
    caption: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired,
    docId: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired,
    photoId: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired,
    userLatitude: PropTypes.string.isRequired,
    userLongitude: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
};
export default Post;
