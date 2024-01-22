import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

import { UseGoogleLoginOptions, useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [user, setUser] = useState<UseGoogleLoginOptions | null>(null);
  const [profile, setProfile] = useState<any>(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      console.log(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (!user || Array.isArray(user)) {
      // Handle the case when user is null or an array
      return;
    }
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: "Bearer" + user.on, // Fix: Use backticks for string interpolation
              Accept: "application/json",
            },
          }
        );
        setProfile(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserProfile();
  }, [user]);

  return (
    <div>
      <button onClick={login}>
        <FcGoogle /> Login with Google
      </button>
      {/* Render your user profile or other components based on authentication status */}
    </div>
  );
};

export default Login;
