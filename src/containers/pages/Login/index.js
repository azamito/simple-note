import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../components/atoms/button";
import { loginUserApi } from "../../../config/redux";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChangeText = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleLoginSubmit = async () => {
    const { email, password } = this.state;
    const { loginAPI, history } = this.props;
    const res = await loginAPI({ email, password }).catch(err => err);

    if (res) {
      console.log('Login success', res);
      localStorage.setItem('userData', JSON.stringify(res));
      this.setState({
        email: "",
        password: "",
      });
      history.push('/');
    } else {
      console.log('Login failed');
    }
  };

  render() {
    const { isLoading } = this.props;
    const { email, password } = this.state;
    const { handleChangeText, handleLoginSubmit } = this;

    return (
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-title">Login Page</p>
          <input className="input" id="email" type="text" placeholder="Email" onChange={handleChangeText} value={email} autoFocus />
          <input className="input" id="password" type="password" placeholder="Password" onChange={handleChangeText} value={password} />
          <Button onClick={handleLoginSubmit} title={"Login now"} loading={isLoading} />
        </div>
      </div>
    );
  }
}

const reduxState = (state) => ({
  isLoading: state.isLoading, // isLoading -> masuk ke -> this.props
});

const reduxDispatch = (dispatch) => ({
  loginAPI: (data) => dispatch(loginUserApi(data)), // registerAPI -> masuk ke -> this.props
});

export default connect(reduxState, reduxDispatch)(Login);
