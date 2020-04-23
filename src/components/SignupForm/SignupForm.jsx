import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';
import styles from '../../pages/LoginPage/LoginPage.module.css';

class SignupForm extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    passwordConf: ''
  };

  handleChange = (e) => {
    this.props.updateMessage('');
    this.setState({
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.signup(this.state);
      // Successfully signed up - show GamePage
      this.props.handleSignupOrLogin();
      this.props.history.push('/');
    } catch (err) {
      // Invalid user data (probably duplicate email)
      this.props.updateMessage(err.message);
    }
  }

  isFormInvalid() {
    return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
  }

  render() {
    return (
      <div>
        <header className={styles.header}>yelp matcher</header>
        <form className={styles.form} onSubmit={this.handleSubmit} >
          <div>
            <h1>Create Account</h1>
            <p>No credit cards or email authentication required, we are just that cool</p>
            <div>
              <input className={styles.formInput} type="text" placeholder="Name" value={this.state.name} name="name" onChange={this.handleChange} />
            </div>
          </div>
          <div>
            <div>
              <input className={styles.formInput} type="email" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
            </div>
          </div>
          <div>
            <div>
              <input className={styles.formInput} type="password" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange} />
            </div>
          </div>
          <div>
            <div>
              <input className={styles.formInput} type="password" placeholder="Confirm Password" value={this.state.passwordConf} name="passwordConf" onChange={this.handleChange} />
            </div>
          </div>
          <div>
            <div>
              <button className={styles.signIn} disabled={this.isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
            </div>
            <div className={styles.disclose}>
              <p>By clicking "Sign Up" I agree to the Terms of Service and Privacy Policy</p>
            </div>
            <div className={styles.loginLink}>
              <p>Already have an account? <Link style={{textDecoration: 'none', fontWeight: 600, color: 'gray'}} to='/login'>Login</Link></p>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignupForm;
