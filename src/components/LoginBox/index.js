import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import InputBox from "../InputBox";
import CustomButton from "../Button";
import media from "styled-media-query";
import MailIcon from "../../assets/icons/mail.svg";
import Kannu from "../../assets/icons/show.svg";

import {
  setUserEmailAddress,
  setUserPassword,
  loginUser,
} from "../../redux/actions/authActions";

const LoginContainer = styled.div`
  width: 30%;
  height: 30%;
  display: flex;
  border-radius: 12px;
  background-color: white;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  filter: drop-shadow(0px 8px 16px rgba(17, 17, 17, 0.04));

  ${media.lessThan("medium")`
    width : 80%;
    height: 50%;
  `}

  ${media.greaterThan("medium")`
    width : 50%;
    height: 50%;
  `}
`;

const LoginHeader = styled.div`
  font-size: 20px;
  font-family: "Nunito";
  font-weight: 600;
  color: black;
  align-self: flex-start;
`;

const mapStateToProps = (state) => ({
  authenticated: state.authenticated,
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    setUserEmailAddress: (props) =>
      dispatch(setUserEmailAddress(props.user_email_address)),

    setUserPassword: (props) => dispatch(setUserPassword(props.user_password)),
    loginUser: (props) => dispatch(loginUser(props)),
  };
};

class LoginBox extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      disabled: true,
    };
  }

  handleChange = (e, type) => {
    this.setState(
      {
        [type]: e.target.value,
      },
      () => {
        if (this.state.name === "" || this.state.password === "") {
          this.setState({
            disabled: true,
          });
        } else {
          this.setState({
            disabled: false,
          });
        }
      }
    );
  };

  handleLogin = (e) => {
    e.preventDefault();
    if (!this.state.disabled) {
      this.props.loginUser({
        email: this.state.name,
        password: this.state.password,
      });
    }
  };

  render() {
    return (
      <LoginContainer>
        <LoginHeader>Login</LoginHeader>
        <InputBox
          icon={MailIcon}
          style={{ width: "80%" }}
          required={true}
          type={"email"}
          value={this.state.name}
          placeholder="email"
          onChange={(e) => {
            this.handleChange(e, "name");
          }}
        ></InputBox>
        <InputBox
          icon={Kannu}
          style={{ width: "80%" }}
          type={"password"}
          value={this.state.password}
          placeholder="password"
          onChange={(e) => {
            this.handleChange(e, "password");
          }}
        ></InputBox>
        <CustomButton
          type="submit"
          style={{ width: "80%" }}
          disabled={this.state.disabled}
          text={"Sign In"}
          onClick={(e) =>
            this.state.disabled ? e.preventDefault() : this.handleLogin(e)
          }
        />
      </LoginContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginBox);
