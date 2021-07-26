import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import Navigationbar from "../Navigation";
import Dashboard from "../Dashboard";
import ClientManagement from "../ClientManagement";
import EventManagement from "../EventManagement";
import ProductManagement from "../ProductManagement";

const Container = styled(motion.div)`
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #f7f7fc;
  flex-direction: column;
  align-items: center;
`;

function MainComponent() {
  const currentTab = useSelector((state) => state.navigation.current_tab);
  console.log(currentTab);
  return (
    <Container>
      <Navigationbar></Navigationbar>
      {currentTab.current_tab === "dashboard" && <Dashboard></Dashboard>}
      {currentTab.current_tab === "clients" && (
        <ClientManagement></ClientManagement>
      )}
      {currentTab.current_tab === "events" && (
        <EventManagement></EventManagement>
      )}
      {currentTab.current_tab === "services" && <ProductManagement />}
    </Container>
  );
}

export default MainComponent;
