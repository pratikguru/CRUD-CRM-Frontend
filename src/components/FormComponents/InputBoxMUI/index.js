import React, { Component } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const InputStyled = styled.input`
  border: none;
  background: #fcfcfc;
  -webkit-appearence: none;
  outline: none;
  width: inherit;
  font-family: "Nunito";
  font-size: 16px;
  height: 20px;
`;

const InputContainer = styled(motion.div)`
  border-radius: 16px;
  width: 100%;
  height: 35px;
  padding: 7px;
  color: black;
  -webkit-appearence: none;
  outline: none;
  font-family: "Nunito";
  font-size: 16px;

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
  width: 100%;
  margin: 10px;
`;

const NamePlate = styled(motion.div)`
  display: flex;
  font-size: 10px;
  font-weight: 500;
  font-family: "Poppins";
  padding-left: 3px;
`;

const InputBoxMUI = ({ placeHolder, onChange, style, value }) => {
  const classes = useStyles();
  return (
    <Container>
      {placeHolder && (
        <NamePlate
          style={style && style.sectionOne && style.sectionOne}
        ></NamePlate>
      )}

      <InputContainer
        className="parent"
        style={style && style.sectionTwo && style.sectionTwo}
      >
        <TextField
          fullWidth
          value={value}
          id="standard-full-width"
          label={placeHolder}
          onChange={onChange}
        />
      </InputContainer>
    </Container>
  );
};

export default InputBoxMUI;
