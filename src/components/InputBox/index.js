import React, { Component } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import MailIcon from "../../assets/icons/mail.svg";

const InputStyled = styled.input`
  border: none;
  background: #fcfcfc;
  -webkit-appearence: none;
  outline: none;
  width: inherit;
  font-family: "Nunito";
  font-size: 16px;
  height: 30px;
`;

const InputContainer = styled(motion.div)`
  border-radius: 16px;
  width: 200px;
  height: 35px;
  padding: 7px;
  color: black;
  -webkit-appearence: none;
  outline: none;
  font-family: "Nunito";
  font-size: 16px;
  border: 2px solid #5f2eea;
  background-color: #fcfcfc;
  transition: 0.1s linear;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default class Input extends Component {
  render() {
    return (
      <InputContainer
        className="parent"
        style={this.props.style && this.props.style}
      >
        {this.props.icon && (
          <img
            src={this.props.icon}
            style={{ width: "20px", height: "20px", margin: "5px" }}
            alt="icon"
          />
        )}

        <InputStyled
          required
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </InputContainer>
    );
  }
}
