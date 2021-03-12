import React, { useState, useEffect } from "react";

import Http from "../../services/Http";

import {
  Header,
  Summary,
  IconItems,
  HowItWork,
  DailyUse,
  Footer
} from "./sections";
import "./homePage.scss";

const HomePage = () => {
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const defaultUsers = 900;

    const getUsers = () => {
      setIsLoading(true);
      return Http.get(`/matomo/getTotalUsers`)
        .then(res => res.data)
        .catch(error => {
          console.error(error);
        })
        .finally(() => setIsLoading(false));
    };

    getUsers().then(res => {
      setUsers(res.users ? res?.users?.length : defaultUsers);
    });
  }, [setUsers, setIsLoading]);

  return (
    <div className="home-page">
      <Header />
      <Summary />
      <IconItems users={users} isLoading={isLoading} />
      <HowItWork />
      <DailyUse />
      <Footer />
    </div>
  );
};

export default HomePage;
