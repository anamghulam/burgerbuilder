import { Component } from "react";
import Modal from "../../components/Layout/UI/Modal/Modal";
import Aux from "../Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount() {
            //this first interceptor concerns with request and clears errors at very first time
            this.reqInterceptor = axios.interceptors.response.use(req => {
                this.setState({ error: null });
                return req;
            });
            //this second interceptor concerns with response error and set error state to actual error
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
        }

        componentWillUnmount() {
            //remove intersectors here - create property and save interceptors there and then remove
            console.log("will unmound interceptorssssssssssssss");
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }
        render() {
            return (
                <Aux>
                    <Modal showM={this.state.error}
                        modalClose={this.errorConfirmedHandler}>
                        {this.state.error ?
                            this.state.error.message :
                            null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}
export default withErrorHandler;