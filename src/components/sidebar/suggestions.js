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
};

export default Suggestions;
