import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';
import styles from './LoginPage.module.css';

class LoginPage extends Component {
  
  state = {
    email: '',
    pw: ''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.login(this.state);
      // Successfully logged up - show user page
      this.props.handleSignupOrLogin();
      this.props.history.push('/');
    } catch (err) {
      // Invalid user data (probably duplicate email)
      alert('Invalid credentials');
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <div>
          <header className={styles.header}>yelp matcher</header>
          <div className={styles.form}>
            <h2>Login to yelp matcher</h2>
            <form onSubmit={this.handleSubmit} >
              <div>
                <div>
                  <input className={styles.formInput} type="email" placeholder="Email Address" value={this.state.email} name="email" onChange={this.handleChange} />
                </div>
              </div>
              <div>
                <div>
                  <input className={styles.formInput} type="password" placeholder="Password" value={this.state.pw} name="pw" onChange={this.handleChange} />
                </div>
              </div>
              <div>
                <div>
                  <button className={styles.signIn}>Sign In</button>&nbsp;&nbsp;&nbsp;
                </div>
              </div>
            </form>
            <div className={styles.underline}>
              <p>New User? <Link style={{textDecoration: 'none', fontWeight: 600, color: 'gray'}} to='/signup'>create your account</Link></p>
            </div>
          </div>
        </div>
        <div className={styles.picture}>
          <img className={styles.sideImg} src={require('./pancakes.jpg')} alt=""/>
        </div>
      </div>
    );
  }
}

export default LoginPage;
