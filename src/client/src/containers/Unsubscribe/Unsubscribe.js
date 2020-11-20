import React, { useEffect, useState } from "react";
import UnsubscribeView from "../../components/Unsubscribe";
import Http from "../../services/Http";

const Unsubscribe = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  //const [notif, setNotif] = useState(null);

  const getSubscriptionStatus = () => {
    return Http.get("/mailing-list/user")
      .then(res => {
        setIsSubscribed(res.data.isSubscribed);
      })
      .catch(e => {
        console.error(e);
      });
  };

  const handleChange = () => {
    if (isSubscribed) {
      Http.delete("/mailing-list/user")
        .then(() => {
          getSubscriptionStatus();
        })
        .catch(e => {
          console.error(e);
        });
    } else {
      Http.post("/mailing-list/user")
        .then(() => {
          getSubscriptionStatus();
        })
        .catch(e => {
          console.error(e);
        });
    }
  };

  useEffect(() => {
    getSubscriptionStatus();
  }, []);

  return (
    <UnsubscribeView isSubscribed={isSubscribed} handleChange={handleChange} />
  );
};

Unsubscribe.propTypes = {};

export default Unsubscribe;
