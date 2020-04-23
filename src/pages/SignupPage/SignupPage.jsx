import React, { Component } from 'react';
import SignupForm from '../../components/SignupForm/SignupForm';
import styles from '../LoginPage/LoginPage.module.css';

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {message: ''}
  }

  updateMessage = (msg) => {
    this.setState({message: msg});
  }

  render() {
    return (
      <div className={styles.container}>
        <div>
          <SignupForm {...this.props} updateMessage={this.updateMessage} />
          <p>{this.state.message}</p>
        </div>
        <div className={styles.picture}>
          <img className={styles.sideImg} src={require('./tacos.jpg')} alt=""/>
        </div>
      </div>
    );
  }
}

export default SignupPage;