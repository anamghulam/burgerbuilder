import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import Aux from "../../hoc/Auxiliary";
import BuildControls from "../../components/Burger/BuildControls/BuilderControls";
import Modal from "../../components/Layout/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/Layout/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 2.0,
    cheese: 3.5,
    meat: 5.0
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    //this function is good place to fetch data from API
    componentDidMount() {
        axios.get('https://burger-builder-ad7b1-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
                this.updatePurchaseState(response.data);
            })
            .catch(error => {
                this.setState({ error: true })
            });
    }
    updatePurchaseState(updateding) {
        const ingredients = updateding
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchable: sum > 0 });
    }

    //this function will handle adding ingredient and update state.
    addIngredientHandler = (type) => {
        console.log('added ingredent!!!');
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            //this line is written to update in an immutable way (working on copy, not actual)
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        //map which ingredient costs what price
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });

        //now update "purchable" state with passing current ingredients
        this.updatePurchaseState(updatedIngredients);
    }

    //this function will handle removing ingredient and update state.
    removeIngredientHandler = (type) => {
        console.log('removed ingredent!!!');
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            //this line is written to update in an immutable way (working on copy, not actual)
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        //map which ingredient costs what price
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });

        //now update "purchable" state with passing current ingredients
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandling = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        //alert('Thanks to continue!..');
        //moved code from here to another component where we are routing to..

        //this is simple pusing page to a new url, it is simple routing
        //this.props.history.push('/checkout'); 
        //below is pusing / routing with parameters
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice)
        const qureyString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + qureyString
        });


    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let burger = this.state.error ? <p style={{ textAlign: "center", marginTop: 100 }}>Ingredients are not availabe</p> : <Spinner />;
        let orderSummary = null;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        addIngredient={this.addIngredientHandler}
                        removeIngredient={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchable={this.state.purchable}
                        purchased={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandling}
                purchaseContinue={this.purchaseContinueHandler}
            />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal showM={this.state.purchasing} modalClose={this.purchaseCancelHandling} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}
export default withErrorHandler(BurgerBuilder, axios);