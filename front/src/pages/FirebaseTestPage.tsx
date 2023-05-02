import { useEffect } from "react";
import { auth } from "service";

function FirebaseTestPage() {
  useEffect(() => {
    if (auth.currentUser) {
      console.log("===========================================");
      auth.currentUser.getIdToken(true).then((data) => {
        console.log(data);
      });
    }
  }, []);

  return <div />;
}

export default FirebaseTestPage;
