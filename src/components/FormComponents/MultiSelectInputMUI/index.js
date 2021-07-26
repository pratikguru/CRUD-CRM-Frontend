import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import styled from "styled-components";
import { motion } from "framer-motion";

const InputContainer = styled(motion.div)`
  border-radius: 16px;
  width: -webkit-fill-available;
  height: auto;
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
  width: -webkit-fill-available;
  height: auto;
`;

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 230,
  },

  selectStyle: {},
}));

const MulitSelectInputMUI = ({
  selectedValue,
  handleChange,
  label,
  data,
  referenceKey,
  multiple,
}) => {
  const classes = useStyles();

  return (
    <Container style={{ marginTop: "15px" }}>
      <InputContainer>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          multiple
          fullWidth
          labelId="demo-simple-select-label"
          id="standard-full-width"
          value={selectedValue}
          onChange={handleChange}
          className={classes.selecttStyle}
        >
          {data &&
            data.map((value, index) => (
              <MenuItem value={index}>
                {value[referenceKey].toUpperCase()}
              </MenuItem>
            ))}
        </Select>
      </InputContainer>
    </Container>
  );
};

export default MulitSelectInputMUI;
