import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UnsubscribePageView from "../../components/UnsubscribePage";
import Http from "../../services/Http/index";

const UnsubscribePage = () => {
  const { pathname } = useLocation();

  const [unsubscriptionResponse, setUnsubscriptionResponse] = useState({
    isLoading: false,
    success: null,
    message: null,
    error: null
  });

  useEffect(() => {
    setUnsubscriptionResponse({ isLoading: true, success: null, error: null });

    Http.delete("/mailing-list/email", {
      data: { hash: pathname.replace("/unsubscribe/", "") }
    })
      .then(res => {
        setUnsubscriptionResponse({
          isLoading: false,
          success: true,
          message:
            res.status !== 200
              ? "Cette adresse email ne figure pas dans notre liste de contacts."
              : res.data.message,
          error: null
        });
      })
      .catch(e => {
        console.error(e);
        setUnsubscriptionResponse({
          isLoading: true,
          success: false,
          message: e.message,
          error: true
        });
      });
  }, []);

  return (
    <UnsubscribePageView unsubscriptionResponse={unsubscriptionResponse} />
  );
};

UnsubscribePage.propTypes = {};

export default UnsubscribePage;
