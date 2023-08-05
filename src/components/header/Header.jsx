import React from "react";
import styles from "./Header.module.scss";

import ResponsiveAppBar from "./ResponsiveAppBar/ResponsiveAppBar.jsx";

export default function Header() {
  return (
    <div>
      <ResponsiveAppBar />
    </div>
  );
}
