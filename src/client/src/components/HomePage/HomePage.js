import "./homePage.scss";

import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";

import Auth from "../../services/Auth";
import Http from "../../services/Http";
import Search from "../Search/Search";
import { DailyUse, Footer, HowItWork, IconItems, Summary } from "./sections";

const HomePage = () => {
  const isLogged = Auth.isLogged();
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUsers = () => {
      const defaultUsers = 900;
      setIsLoading(true);

      return Http.get(`/matomo/getTotalUsers`)
        .then((res) => {
          setUsers(res?.data.users?.length || defaultUsers);
        })
        .catch((error) => {
          setUsers(defaultUsers);
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    getUsers();
  }, [setUsers, setIsLoading]);

  if (isLogged)
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
        component={Search}
      />
    );
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
