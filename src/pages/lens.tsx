import React from "react";
import type { NextPage } from "next";

import { GetProfiles, LensAuthentication } from "src/components/lens";

const LensPage: NextPage = () => {
  return (
    <div>
      <LensAuthentication />
      <GetProfiles />
    </div>
  );
};

export default LensPage;
