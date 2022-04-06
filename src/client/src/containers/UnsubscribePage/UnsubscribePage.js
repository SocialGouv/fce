import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import UnsubscribePageView from "../../components/UnsubscribePage";
import Http from "../../services/Http/index";

const UnsubscribePage = () => {
  const { pathname } = useLocation();

  const [unsubscriptionResponse, setUnsubscriptionResponse] = useState({
    hasError: null,
    isLoading: false,
    message: null,
  });

  useEffect(() => {
    setUnsubscriptionResponse({
      hasError: null,
      isLoading: true,
      message: null,
    });

    Http.delete("/mailing-list/email", {
      data: { hash: pathname.replace("/unsubscribe/", "") },
    })
      .then((res) => {
        setUnsubscriptionResponse({
          hasError: null,
          isLoading: false,
          message:
            res.status !== 200
              ? "Cette adresse email ne figure pas dans notre liste de contacts."
              : res.data.message,
        });
      })
      .catch((e) => {
        console.error(e);
        setUnsubscriptionResponse({
          hasError: true,
          isLoading: false,
          message: "Une erreur est survenue, réesayez ultérieurement.",
        });
      });
  }, [pathname]);

  return (
    <UnsubscribePageView unsubscriptionResponse={unsubscriptionResponse} />
  );
};

UnsubscribePage.propTypes = {};

export default UnsubscribePage;
