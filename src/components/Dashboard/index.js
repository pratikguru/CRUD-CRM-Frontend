import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  width: -webkit-fill-available;
  height: auto;
  display: flex;
  background-color: #f7f7fc;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const InnerContainer = styled.div`
  display: flex;
  width: -webkit-fill-available;
  height: auto;

  border-radius: 16px;
  overflow-y: auto;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  width: -webkit-fill-available;
  height: auto;
  padding: 5px;
  font-weight: 350;
  font-size: 22px;
  font-family: "Poppins";
  color: black;
`;

const ScrollContainer = styled.div`
  width: -webkit-fill-available;
  height: 80vh;
  display: block;
  overflow-y: auto;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

function Dashboard() {
  return (
    <Container
      positionTransition
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          min: 0,
          max: 100,
          bounceStiffness: 100,
        },
      }}
      exit={{
        opacity: 0,
        transition: { duration: 1, type: "spring", restSpeed: 0.5 },
      }}
    >
      <InnerContainer>
        <Header>Dashboard</Header>
        <ScrollContainer>
          {[...Array(200)].map((value) => (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "50px",
                margin: "2px",
                backgroundColor: "green",
              }}
            ></div>
          ))}
        </ScrollContainer>
      </InnerContainer>
    </Container>
  );
}

export default Dashboard;
