import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

class App extends Component {


  render(){
  return (
    <div>
    <Layout>

    <Route path = "/" exact component = {BurgerBuilder} />
      <Route path = "/checkout" component = {Checkout} />   
      <Route path = "/orders" exact component = {Orders} />   
      <Route path = "/auth" exact component = {Auth} />  
    </Layout> 
    </div>
  );
}

}
export default App;
