import "./App.css";
import React from "react";
import LoginBox from "./components/LoginBox";
import styled from "styled-components";
import MainComponent from "./components/MainComponent/index";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./redux/actions/authActions";

const Container = styled.div`
  display: flex;
  height: ${(props) => (props.authenticated ? "auto" : "100vh")};
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: #181829;
  background-color: #f7f7fc;
`;

function App() {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const dispatch = useDispatch();

  if (localStorage.getItem("token")) {
    dispatch(login({ authStatus: 1, token: localStorage.getItem("token") }));
  }

  return (
    <Container>
      {!authenticated ? (
        <LoginBox></LoginBox>
      ) : (
        <MainComponent height={authenticated}></MainComponent>
      )}
    </Container>
  );
}

export default App;
