import { useRef } from "react";
import Header from "./header";
import Image from "./image";
import Footer from "./footer";
import Actions from "./actions";
import Comments from "./comments";
import PropTypes from "prop-types";
const Post = ({ content }) => {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-10">
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer caption={content.caption} username={content.username} />
      <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
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
