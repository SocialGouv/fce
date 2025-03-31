import React, { useContext } from "react";

import { UserContext } from "../../components/Login/UserContext";

export default function Compte() {
  const { user } = useContext(UserContext);

  return (
    <>
      <h2>Information utilisateur</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
}
