
import React from 'react';
import { connect } from 'react-redux';
import { singIn, singOut } from '../actions'

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '1063040313274-mq5bvnlt5vjta4m700oa1q9cfolncevh.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          this.onAuthChange(this.auth.isSignedIn.get())
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.singIn(this.auth.currentUser.get().getId());
    } else {
      this.props.singOut();
    }
  };


  onSingInClick =() => {
     this.auth.signIn();
  }

  onSingOutClick = () => {
     this.auth.signOut();
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
          return null;
    } else if (this.props.isSignedIn) {
          return (
               <button className="ui red google button" onClick={this.onSingOutClick}>
                    <i className="google icon" />
                    Sign Out
               </button>
          );
    } else {
          return (
               <button className="ui red google button" onClick={this.onSingInClick}>
                    <i className="google icon" />
                    Sing In with google
               </button>
          );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(
  mapStateToProps,
  { singIn, singOut }
)(GoogleAuth);
