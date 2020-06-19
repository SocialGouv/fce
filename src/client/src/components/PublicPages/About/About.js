import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import PublicPage from "../PublicPages";
import Config from "../../../services/Config";

const strapi_endpoint = Config.get("strapi.endpoint");

const About = () => {
  const [markdown, setMarkdown] = useState(null);

  useEffect(() => {
    fetch(`${strapi_endpoint}1`)
      .then(response => response.json())
      .then(data => {
        setMarkdown(data.contenu);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <PublicPage>{markdown && <ReactMarkdown source={markdown} />}</PublicPage>
  );
};

export default About;
