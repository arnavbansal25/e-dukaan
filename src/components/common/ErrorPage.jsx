import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const err = useRouteError();

  return (
    <div className="flex flex-col justify-center items-center mt-16">
      <h1>Oops!!!</h1>
      <h2>Something went wrong!</h2>
      <h2>{err.status + " : " + err.statusText}</h2>
      <h1>
        Go To{" "}
        <a href="/" className="text-blue-700">
          Home
        </a>
      </h1>
    </div>
  );
}

export default ErrorPage;
