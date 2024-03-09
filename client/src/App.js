import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Title from "./components/layout/Title";
import AddPerson from "./components/forms/AddPerson";
import People from "./components/lists/People";
import LearnMore from "./components/pages/LearnMore";

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
          {/* <Route path="/learn-more/:personId" component={LearnMore} /> */}
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
