import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';



class BurgerBuilder extends Component{

    state = {
        /*ingredients:null,
        totalPrice:4,
        purchasable:false, 
         loading:false,
        error:false,  */
        purchasing:false
       
    }


componentDidMount(){
    console.log(this.props); 
    this.props.onInitIngredients();
}


updatePurchaseState (ingredients){
    const sum = Object.keys(ingredients).map(igKey =>{
    return ingredients[igKey];}).reduce((sum,el) => {return sum+el;}, 0);
    return sum>0;
}

/*
addIngredientHandler = (type) => {
const oldCount = this.state.ingredients[type];
const updatedCounted = oldCount+1;
const updatedIngredients = {
    ...this.state.ingredients
};
updatedIngredients[type] = updatedCounted;
const priceAddition = INGREDIENT_PRICES[type]
const oldPrice = this.state.totalPrice;
const newPrice = oldPrice + priceAddition;
this.setState({totalPrice:newPrice, ingredients: updatedIngredients})
this.updatePurchaseState(updatedIngredients);
}


removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0){
        return;
    }
    else{
    const updatedCounted = oldCount-1;
    const updatedIngredients = {
        ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCounted;
    const priceDeduction = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice:newPrice, ingredients: updatedIngredients})
    this.updatePurchaseState(updatedIngredients);
    }
}
*/


purchaseHandler = () => {

    if(this.props.isAuthenticated){
        this.setState({purchasing: true});
    }
    else{
        this.props.onSetAuthRedirectPath('/checkout');
    this.props.history.push('/auth');
    }
  
}

purchaseCancelHandler = () =>{

  this.setState({purchasing: false});  
}


purchaseContinueHandler = () => {
    /*
    const queryParams = [];
    for (let i in this.state.ingredients){
        queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price= '+this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({pathname:'/checkout',
    search:'?'+ queryString}); */

    this.props.onInitPurchase();
    this.props.history.push({pathname:'/checkout'});


} 


render(){

const disabledInfo = {...this.props.ings};
for(let key in disabledInfo){
    disabledInfo[key] = disabledInfo[key] <= 0
}

let orderSummary=null;
let burger = this.props.error ? <p>Ingredients can't be loaded</p> :<Spinner/>;

if(this.props.ings){
   burger = (
    <Auxiliary>
        <Burger ingredients = {this.props.ings}/>
        <BuildControls  
            ingredientAdded = {this.props.onIngredientAdded} 
            ingredientRemoved = {this.props.onIngredientRemoved}  
            disabled = {disabledInfo}
            price = {this.props.price}
            isAuthenticated = {this.props.isAuthenticated}
            purchasable = {this.updatePurchaseState(this.props.ings)}
            ordered = {this.purchaseHandler}/>
    </Auxiliary>
    );

orderSummary =  <OrderSummary 
    ingredients = {this.props.ings}  
    cancelled = {this.purchaseCancelHandler}  
    continue = {this.purchaseContinueHandler}  
    price= {this.props.price}/>;
 }

 /* if(this.state.loading){
    orderSummary = <Spinner />;  
   }  */

    return(
            <Auxiliary>
                <Modal show= {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>  
                 {orderSummary}
                </Modal>
                {burger}
             </Auxiliary>    
        );
  }
}

const mapStateToProps = state => {
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
      onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
      onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),  
      onInitIngredients: () => dispatch(actions.initIngredients()),
      onInitPurchase: () => dispatch(actions.purchaseInit()),
      onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };    
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));