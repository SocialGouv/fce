import "./errorIE.scss";

import ClipboardJS from "clipboard";
import React from "react";

import logoChrome from "../../assets/img/chrome-logo.svg";
import logoFirefox from "../../assets/img/firefox-logo.svg";
import logoSafari from "../../assets/img/safari-logo.svg";
import Button from "../../components/shared/Button";

new ClipboardJS(".copy");

const browsers = [
  { alt: "logo du navigateur Chrome", logo: logoChrome, name: "Chrome" },
  { alt: "logo du navigateur Firefox", logo: logoFirefox, name: "Firefox" },
  { alt: "logo du navigateur Safari", logo: logoSafari, name: "Safari" },
];

const ErrorIE = () => {
  return (
    <div className="error-ie">
      <div className="container">
        <h1 className="error-ie__title">
          Ce site n{"'"}est pas compatible avec Internet Explorer
        </h1>

        <p>
          Copiez-collez le lien ci-dessous dans l{"'"}un de ces navigateurs:
        </p>

        <ul className="error-ie__browsers">
          {browsers.map(({ name, logo, alt }) => (
            <li key={name} className="error-ie__browser">
              <img className="image is-96x96" src={logo} alt={alt} />
              <div>{name}</div>
            </li>
          ))}
        </ul>

        <div className="error-ie__link-wrapper">
          <a className="error-ie__link" href={window.location.href}>
            {window.location.href}
          </a>
          <Button
            buttonClasses={["is-secondary", "copy"]}
            data-clipboard-text={window.location.href}
            value="Copier le lien"
          />
        </div>
      </div>
    </div>
  );
};

export default ErrorIE;
