import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
function useAuthListener() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("authUser", JSON.stringify(user));
      } else {
        localStorage.removeItem("auhtUser");
        setUser(null);
      }
    });

    return () => listener();
  }, []);

  return { user };
}

export default useAuthListener;
