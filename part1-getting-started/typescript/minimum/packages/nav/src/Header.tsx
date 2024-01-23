import React from "react";

const Header: React.FunctionComponent<{
  appName: string;
  toto?: string;
}> = ({ appName, toto }) => (
  <div>
    <h1>Header for {appName} and {toto} </h1>
  </div>
);

export const getFormattedHeader = (appName: string) => {
  return appName.toUpperCase() + 'updated';
}

export const getFormattedHeaderAsLower = (appName: string) => {
  return appName.toLowerCase();
}

export default Header;
