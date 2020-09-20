import React, { Component } from 'react';
import Login from '../components/Login';
import { connect } from 'react-redux';
import { getUserDetails } from './redux/User/actions/userActions';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validForm: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    const element = event.target;
    const form = element.parentElement;

    this.setState({
      [element.name]: element.value,
      validForm: form.checkValidity(),
    });

    if (element.validity.valid) {
      element.classList.add('is-valid');
      element.classList.remove('is-invalid');
    } else {
      element.classList.remove('is-valid');
      element.classList.add('is-invalid');
    }
  }

  onSubmit(e) {
    e.preventDefault();
    delete this.state.error;
    this.setState(this.state);
    console.log(this.props.loginUser);
    this.props.getUserDetails(this.state.email, this.state.password).then(data => {
      if (!data.success) {
        this.setState({ error: data.info.message });
      } else {
        this.props.history.push('/products');
      }
    });
  }

  render() {
    return (
      <Login
        onChange={this.onChange}
        state={this.state}
        onSubmit={this.onSubmit}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserDetails: (email, password) => {
      return dispatch(getUserDetails(email, password));
    },
  };
};

export default connect(null, mapDispatchToProps)(LoginContainer);