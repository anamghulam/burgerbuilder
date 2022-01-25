import React, { Component } from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from "../../Layout/UI/Button/Button";

class OrderSummary extends Component {

    componentDidUpdate() {
        console.log('Order summer updating.....');
    }

    render() {
        //Object.keys() is used to convert to an array with keys of words like types and values next to each
        const ingredientsSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>
                )
            })


        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with delicious ingredients</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Order Total is: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout</p>

                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>Continue</Button>
            </Aux >
        );
    }

}
export default OrderSummary;