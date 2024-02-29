import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Title from "./components/layout/Title";
import AddPerson from "./components/forms/AddPerson";
import People from "./components/lists/People";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Title />
          <AddPerson />
          <People />
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
