// , we don't want to show users that are already in followers list
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    const suggestedProfiles = async () => {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
      console.log("profiles:", profiles);
    };
    userId && suggestedProfiles();
  }, [userId]);

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

export default Suggestions;
