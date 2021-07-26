import React, { Component } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

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
  padding-top: 10px;
  padding-bottom: 20px;
`;

const CustomKeyboardDatePicker = styled(KeyboardDatePicker)`
  font-family: "Nunito";
`;

const DatePicker = ({ date, handleDateChange, style, label }) => {
  return (
    <InputContainer className="parent" style={style && style}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CustomKeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label={label}
          value={date}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
    </InputContainer>
  );
};

export default DatePicker;
