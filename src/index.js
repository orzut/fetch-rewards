import React from "react";
import ReactDOM from "react-dom/client";
import Form from "./Form";

const root = ReactDOM.createRoot(document.querySelector("#root"));

const App = () => {
  return (
    <div>
      <Form />
    </div>
  );
};

root.render(<App />);
