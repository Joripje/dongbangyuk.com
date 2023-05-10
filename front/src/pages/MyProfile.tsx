import React from "react";

import { Navbar } from "components/common";
import { UserInfo } from "components/profile";

function MyProfile() {
  return (
    <div>
      <Navbar />
      <UserInfo />
    </div>
  );
}

export default MyProfile;
