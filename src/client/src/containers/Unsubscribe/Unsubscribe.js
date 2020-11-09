import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UnsubscribeView from "../../components/Unsubscribe/Unsubscribe";
import Http from "../../services/Http/index";

const Unsubscribe = () => {
  const { pathname } = useLocation();

  const [unsubscriptionResponse, setUnsubscriptionResponse] = useState({
    isLoading: false,
    success: null,
    message: null,
    error: null
  });

  useEffect(() => {
    setUnsubscriptionResponse({ isLoading: true, success: null, error: null });

    Http.post("/unsubscribe/", { hash: pathname.replace("/unsubscribe/", "") })
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

    //setUnsubscriptionResponse({ loading: false, succes: false, error: null });
  }, []);

  return <UnsubscribeView unsubscriptionResponse={unsubscriptionResponse} />;
};

Unsubscribe.propTypes = {};

export default Unsubscribe;
