import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UnsubscribePageView from "../../components/UnsubscribePage";
import Http from "../../services/Http/index";

const UnsubscribePage = () => {
  const { pathname } = useLocation();

  const [unsubscriptionResponse, setUnsubscriptionResponse] = useState({
    isLoading: false,
    message: null,
    hasError: null
  });

  useEffect(() => {
    setUnsubscriptionResponse({
      isLoading: true,
      message: null,
      hasError: null
    });

    Http.delete("/mailing-list/email", {
      data: { hash: pathname.replace("/unsubscribe/", "") }
    })
      .then(res => {
        setUnsubscriptionResponse({
          isLoading: false,
          message:
            res.status !== 200
              ? "Cette adresse email ne figure pas dans notre liste de contacts."
              : res.data.message,
          hasError: null
        });
      })
      .catch(e => {
        console.error(e);
        setUnsubscriptionResponse({
          isLoading: false,
          message: "Une erreur est survenue, réesayez ultérieurement.",
          hasError: true
        });
      });
  }, [pathname]);

  return (
    <UnsubscribePageView unsubscriptionResponse={unsubscriptionResponse} />
  );
};

UnsubscribePage.propTypes = {};

export default UnsubscribePage;
