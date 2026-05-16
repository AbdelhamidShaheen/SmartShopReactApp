import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routing/index.jsx";
import store from "./Store/index.js";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster   gutter={8} />
    </Provider>
  </StrictMode>,
);
