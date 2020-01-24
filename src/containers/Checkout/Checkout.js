import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component{

    state = {
        ingredients:{
           salad:1,
           meat:1,
           cheese:0,
           bacon:3 
        }
    }

checkoutCancelledHandler = () => {
this.props.history.goBack();

}

checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
    
}


render(){

    return(
    <div>
    <CheckoutSummary 
    checkoutCancelled = {this.checkoutCancelledHandler}
    checkoutContinued = {this.checkoutContinuedHandler}
    ingredients = {this.state.ingredients}/>
    </div>
         );
    }
}

export default Checkout;