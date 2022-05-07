import React from "react";
import type { NextPage } from "next";

import {
  GetProfiles,
  LensAuthentication,
  // MintProfile,
} from "src/components/lens";

const LensPage: NextPage = () => {
  return (
    <div>
      <LensAuthentication />
      <GetProfiles />
      {/* <MintProfile /> */}
    </div>
  );
};

export default LensPage;
