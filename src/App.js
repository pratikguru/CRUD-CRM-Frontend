import "./App.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import LoginBox from "./components/LoginBox";
import styled from "styled-components";
import { login } from "./redux/actions/authActions";
import MainComponent from "./components/MainComponent/index";
import { useSelector, useDispatch } from "react-redux";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: #181829;
  background-color: #f7f7fc;
`;

function App() {
  const authenticated = useSelector((state) => state.auth.authenticated);
  console.log(authenticated);
  return (
    <Container>
      {!authenticated ? <LoginBox></LoginBox> : <MainComponent></MainComponent>}
    </Container>
  );
}

export default App;
