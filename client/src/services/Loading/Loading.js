import React from "react";

export default function withLoading(BaseComponent) {
  return function({ isLoaded, ...props }) {
    return isLoaded ? (
      <BaseComponent {...props} />
    ) : (
      <div className="_text-center">
        <i className="fa fa-refresh fa-spin fa-lg fa-fw" /> Chargement en
        cours...
      </div>
    );
  };
}
