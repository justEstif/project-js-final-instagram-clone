const getLoginError = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Invalid Email";
    case "auth/wrong-password":
      return "Wrong Password";
    case "auth/user-not-found":
      return "User with this email doesn't exist.";
    case "auth/user-disabled":
      return "Account has been disabled by user.";
    case "auth/too-many-requests":
      return "Too many requests. Try again later.";
    case "auth/operation-not-allowed":
      return "Signing in with Email and Password is not enabled.";
    default:
      return "Server error. Try again later.";
  }
};

export { getLoginError };
