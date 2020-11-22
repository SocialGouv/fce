import React, { useEffect, useState, useRef } from "react";
import UnsubscribeView from "../../components/Unsubscribe";
import Http from "../../services/Http";

const Unsubscribe = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [message, setMessage] = useState(null);
  const [hasError, setHasError] = useState(false);
  const delay = useRef(null);

  const handleMessage = message => {
    setMessage(message);
    clearTimeout(delay.current);
    delay.current = setTimeout(() => {
      setMessage(null);
      setHasError(false);
    }, 5000);
  };

  const checkSubscriptionStatus = () => {
    return Http.get("/mailing-list/user")
      .then(res => {
        setIsSubscribed(res.data?.result?.isSubscribed);
      })
      .catch(e => {
        console.error(e);
      });
  };

  const handleChange = () => {
    if (isSubscribed) {
      Http.delete("/mailing-list/user")
        .then(() => {
          setIsSubscribed(false);
          handleMessage(
            "Votre email a été supprimé de notre liste de contacts."
          );
        })
        .catch(e => {
          console.error(e);
          setHasError(true);
          handleMessage("Une erreur est survenue, réessayez ultérieurement.");
        });
    } else {
      Http.post("/mailing-list/user")
        .then(() => {
          setIsSubscribed(true);
          handleMessage("Votre email a été ajouté à notre liste de contacts.");
        })
        .catch(e => {
          if (e.response.status === 409) {
            setIsSubscribed(true);
            handleMessage(
              "Votre email est déjà enregistré dans notre liste de contacts."
            );
          } else {
            setHasError(true);
            handleMessage("Une erreur est survenue, réessayez ultérieurement.");
          }
        });
    }
  };

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  return (
    <UnsubscribeView
      isSubscribed={isSubscribed}
      handleChange={handleChange}
      message={message}
      hasError={hasError}
    />
  );
};

export default Unsubscribe;
