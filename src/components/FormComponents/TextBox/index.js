import React, { Component } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const InputStyled = styled.textarea`
  border: none;
  background: #fcfcfc;
  -webkit-appearence: none;
  outline: none;
  width: inherit;
  font-family: "Nunito";
  font-size: 16px;
  height: auto;
  -webkit-user-select: text;
  -khtml-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
`;

const InputContainer = styled(motion.div)`
  border-radius: 16px;
  width: 200px;
  height: auto;
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
  border-radius: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: auto;
`;

const NamePlate = styled(motion.div)`
  display: flex;
  font-size: 10px;
  font-weight: 500;
  font-family: "Poppins";
  padding-left: 3px;
`;

export default class TextBox extends Component {
  render() {
    return (
      <Container>
        {this.props.placeholder && (
          <NamePlate
            style={
              this.props.style &&
              this.props.style.sectionOne &&
              this.props.style.sectionOne
            }
          >
            {" "}
            {this.props.placeholder}
          </NamePlate>
        )}

        <InputContainer
          className="parent"
          style={
            this.props.style &&
            this.props.style.sectionTwo &&
            this.props.style.sectionTwo
          }
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
      </Container>
    );
  }
}
