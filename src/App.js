import React from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router";

import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact={true} component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
