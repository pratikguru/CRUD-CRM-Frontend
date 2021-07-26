import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

var mjml2html = require("mjml-browser");

const Container = styled.div`
  width: -webkit-fill-available;
  height: auto;
  display: flex;
  background-color: #f7f7fc;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  flex-direction: column;
`;

const Header = styled(motion.div)`
  width: -webkit-fill-available;
  height: auto;
  padding: 5px;
  font-weight: 350;
  font-size: 22px;
  font-family: "Poppins";
  color: black;
  display: flex;
  justify-content: flex-start;
`;

const BackButton = styled(motion.div)`
  display: flex;
  width: auto;
  height: auto;
  padding: 5px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
`;

const TemplateImageContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const TemplateDisplay = ({ toggleBack, templateImage }) => {
  const handleGetBack = () => {
    console.log("Geting back");
    toggleBack(0);
  };

  const renderTemplate = (templateFile, templateDataObj) => {
    var htmlOutput = mjml2html(`
        <mjml>
          <mj-body>
            <mj-section>
              <mj-column>
                <mj-text>
                  Hello World!
                </mj-text>
              </mj-column>
            </mj-section>
          </mj-body>
        </mjml>
      `);

    return htmlOutput.html;
  };

  return (
    <Container>
      <Header>
        <BackButton
          whileTap={{
            backgroundColor: "#5f2eea",
            color: "white",
            scale: 0.98,
          }}
          onClick={handleGetBack}
        >
          {" "}
          Back{" "}
        </BackButton>
      </Header>
      <TemplateImageContainer
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: "linear" }}
      >
        <img
          src={templateImage}
          style={{ height: "400px", width: "auto", borderRadius: "10px" }}
          alt=""
        />
      </TemplateImageContainer>
    </Container>
  );
};

export default TemplateDisplay;
