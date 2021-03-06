import { useState, useContext } from "react";
import PropTypes from "prop-types";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import { doc, arrayUnion, updateDoc } from "firebase/firestore";

const AddComment = ({ docId, comments, setComments, commentInput }) => {
  const [comment, setComment] = useState("");
  const {
    firebase: { db },
  } = useContext(FirebaseContext);

  const {
    user: { displayName },
  } = useContext(UserContext);

  const handleSubmitComment = (event) => {
    const updatePhotoComments = async () => {
      const photoRef = doc(db, "photos", docId);
      return updateDoc(photoRef, { comments: arrayUnion(comment) });
    };
    event.preventDefault();
    setComments([...comments, { displayName, comment }]);
    setComment("");
    updatePhotoComments();
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(e) =>
          comment.length >= 1 ? handleSubmitComment : e.preventDefault()
        }>
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment && "opacity-25"
          }`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}>
          Post
        </button>
      </form>
    </div>
  );
};

AddComment.protoTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComment: PropTypes.func.isRequired,
  commentInput: PropTypes.object,
};

export default AddComment;
