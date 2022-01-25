import React, { Component } from "react";
import classes from './Modal.module.css';
import Aux from "../../../../hoc/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        //console.log(nextProps.showM);
        //console.log(this.props.showM);
        return nextProps.showM !== this.props.showM || nextProps.children !== this.props.children;
    }
    componentDidUpdate() {
        console.log('[modal will update now!!!]');
    }
    render() {
        return (
            <Aux>
                <Backdrop show={this.props.showM} clicked={this.props.modalClose} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.showM ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.showM ? '1' : '0'
                    }}
                >
                    {this.props.children}
                </div>
            </Aux>
        )
    }

}

export default Modal;