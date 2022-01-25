import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {


    constructor(props) {
        super(props);
        //this checkout componet is standalone component so we need to use componentDidMount to set its state by fetching data form query string
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        console.log("here are query parmeters:  ", query.entries());
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }

        }
        //console.log("this is order array: ", ingredients);
        this.state = {
            ingredients: ingredients,
            totalPrice: price
        }
        //this.setState({ ingredients: ingredients, totalPrice: price });
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinue={this.checkoutContinueHandler}
                />
                <Route path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}
                />
            </div>
        );
    }
}
export default Checkout;