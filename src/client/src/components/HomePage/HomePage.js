import React, { useState, useEffect } from "react";

import Http from "../../services/Http";

import { Summary, IconItems, HowItWork, DailyUse, Footer } from "./sections";
import "./homePage.scss";

const HomePage = () => {
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUsers = () => {
      const defaultUsers = 900;
      setIsLoading(true);

      return Http.get(`/matomo/getTotalUsers`)
        .then(res => {
          setUsers(res?.data.users?.length || defaultUsers);
        })
        .catch(error => {
          setUsers(defaultUsers);
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    getUsers();
  }, [setUsers, setIsLoading]);

  return (
    <div className="home-page">
      <Summary />
      <IconItems users={users} isLoading={isLoading} />
      <HowItWork />
      <DailyUse />
      <Footer />
    </div>
  );
};

export default HomePage;
