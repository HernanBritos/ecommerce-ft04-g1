import React, { Component } from 'react';
import Login from '../components/Login';
import { connect } from 'react-redux';
import { getUserDetails } from './redux/User/actions/userActions';

function Login() {
  const [user, setUser] = useState({
      name: '',
      password: '',
      validForm: false,
      email: ''
  })

  const onChange = (e) => {
      const element = e.target;
      const form = element.parentElement;
      setUser({
          ...user,
          [e.target.name]: e.target.value,
          validForm: form.checkValidity()  // var result = selectElt.checkValidity();
      })
      if(element.validity.valid){
          element.classList.add('is-valid');
          element.classList.remove('is-invalid');
      } else {
          element.classList.remove('is-valid');
          element.classList.add('is-invalid');
      }
  }

  const onSubmit = (e) => {
      e.preventDefault();
    axios.post('/users/login', {
        name: user.name,
        email: user.email,
        password: user.password,
    }).then((data)=> console.log(data))
  }
}

module.exports = Login;