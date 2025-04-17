import React from "react";
import Injest from "./injest";
import Extract from "./extract";
import Read from "./read";

function Config({ operation, ...other_props }) {
  switch (operation) {
    case "index":
      return <Injest {...other_props} />;

    case "extract":
      return <Extract {...other_props} />;

    case "get":
      return <Read {...other_props} />;

    default:
      return null;
  }
}

export default Config;
