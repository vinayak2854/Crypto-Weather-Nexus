"use client";

import { Provider } from "react-redux";
import { store } from "../store";
import Layout from "../components/Layout";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <Layout>{children}</Layout>
    </Provider>
  );
}
