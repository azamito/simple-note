import React, { Component } from 'react';
import './Register.scss';
import Button from '../../../components/atoms/button';
import { registerUserApi } from '../../../config/redux/actions';
import { connect } from 'react-redux';


class Register extends Component {
  state = {
    email: '',
    password: '',
  }

  handleChangeText = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleRegisterSubmit = async () => {
    const { email, password } = this.state;
    const { registerAPI, history } = this.props;
    const res = await registerAPI({ email, password }).catch(err => err);

    if (res) {
      this.setState({
        email: '',
        password: ''
      });
      history.push('/login');
    }
  }

  render() {
    const { email, password } = this.state;
    const { isLoading } = this.props;

    return (
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-title">Register Page</p>
          <input className="input" id="email" type="text" placeholder="Email" onChange={this.handleChangeText} value={email} />
          <input className="input" id="password" type="password" placeholder="Password" onChange={this.handleChangeText} value={password} />
          <Button onClick={this.handleRegisterSubmit} title={'Register now'} loading={isLoading} />
        </div>
      </div>
    )
  }
}

const reduxState = (state) => ({
  isLoading: state.isLoading // isLoading -> masuk ke -> this.props
})

const reduxDispatch = (dispatch) => ({
  registerAPI: (data) => dispatch(registerUserApi(data)) // registerAPI -> masuk ke -> this.props
})

export default connect(reduxState, reduxDispatch)(Register)