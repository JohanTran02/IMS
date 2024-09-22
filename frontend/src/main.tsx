import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import App from './App.tsx'
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",

  cache: new InMemoryCache(),
});
import { RouterProvider } from "react-router-dom";
import App from "./App";
// import router from './routes/routes.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      {/* <RouterProvider router={router} /> */}
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </StrictMode>
);
