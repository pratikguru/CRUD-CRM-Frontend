import React, { Component } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const SubmitButton = styled(motion.div)`
  background-color: #5f2eea;
  border-radius: 12px;
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "Nunito";
  font-weight: 600;
  font-size: 14px;
  color: white;
  outline: none;
  cursor: pointer;
`;

export default class CustomButton extends Component {
  render() {
    return (
      <SubmitButton
        animate={{
          opacity: this.props.disabled ? "0.3" : "1",
        }}
        transition={{ duration: 0.2, ease: "linear" }}
        type={this.props.type}
        whileTap={{ scale: this.props.disabled ? 1 : 0.95 }}
        style={this.props.style && this.props.style}
        onClick={(e) =>
          this.props.disabled ? e.preventDefault() : this.props.onClick(e)
        }
      >
        {this.props.text}
      </SubmitButton>
    );
  }
}
