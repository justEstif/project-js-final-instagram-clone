import { Fragment, useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useParams, useNavigate } from "react-router-dom";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import Header from "../components/header";
import UserProfile from "../components/profile";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserExists = async () => {
      const user = await getUserByUsername(username);
      if (user.length > 0) {
        setUser(user[0]);
      } else {
        navigate(ROUTES.NOT_FOUND);
      }
    };
    checkUserExists();
  }, [navigate, username]);

  return user?.username ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : (
    <Fragment>
      <div className="flex gap-10 items-center justify-center h-50">
        <Skeleton count={1} width={840} height={250} />
      </div>
    </Fragment>
  );
};

export default Profile;
