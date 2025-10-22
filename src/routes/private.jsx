import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Private({ children }) {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const auth = getAuth(); // Make sure you have initialized `auth` somewhere globally or pass it here
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Optionally store user data, consider security implications
        const userData = {
          uid: user.uid,
          email: user.email,
        };
        localStorage.setItem("@detailUser", JSON.stringify(userData));
        setLoading(false);
        setSigned(true);
      } else {
        setLoading(false);
        setSigned(false);
      }
    });

    return () => unsubscribe(); // Cleanup the subscription
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Improved loading state visibility
  }

  if (!signed) {
    return <Navigate to="/" replace />;
  }

  return children;
}
