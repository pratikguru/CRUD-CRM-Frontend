import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled.div`
  width: 250px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px;
  display: flex;

  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  height: auto;
  padding: 2px;
  display: flex;

  font-size: 10px;
  font-weight: 500;
  font-family: "Poppins";
`;

const SelectContainer = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #5f2eea;
  border-radius: 10px;
`;

const DropDownContainer = styled(motion.div)`
  width: 100%;
  display: block;
  height: auto;
  max-height: 200px;
  overflow-y: auto;
  flex-direction: column;
  background-color: white;
  box-shadow: 0px 2px 8px rgb(40 41 61 / 8%), 0px 20px 32px rgb(96 97 112 / 24%);
  white-space: no-wrap;
  z-index: 2;
  margin-top: ${(props) => (props.extraMargin ? "250px" : "200px")};
  border-radius: 10px;

  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #a3a2aa;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #6f6e79;
  }
`;

const DropDownItem = styled(motion.div)`
  width: 100%;
  height: 45px;
  justify-content: center;
  align-items: center;
  display: flex;
  z-index: 3;
  cursor: select;
  text-selection: none;
`;

const DefaultSelection = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const variants = {
  open: {
    opacity: 1,
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: "200",
      damping: "20",
    },
  },
  closed: {
    opacity: 0,
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: "200",
      damping: "20",
    },
  },
};

const CustomSelect = ({ data, label, reference_key, handleChange }) => {
  const [showDrop, setDrop] = useState(false);
  const [selected, setSelection] = useState({});

  const handleChoice = (choice) => {
    setSelection(data[choice]);
    setDrop(false);
    handleChange(choice);
  };

  return (
    <Container>
      <InnerContainer>
        <Header>{label}</Header>
        <SelectContainer onClick={() => setDrop(!showDrop)}>
          {!showDrop && (
            <DefaultSelection>
              {" "}
              {selected &&
                selected[reference_key] &&
                selected[reference_key].toUpperCase()}{" "}
            </DefaultSelection>
          )}
          {showDrop && (
            <DropDownContainer
              animate={showDrop ? "open" : "closed"}
              variants={variants}
              extraMargin={data && data.length <= 3 ? false : true}
            >
              {data &&
                data.map((value, index) => (
                  <DropDownItem
                    key={index}
                    onClick={() => handleChoice(index)}
                    whileHover={{ backgroundColor: "#5f2eea38" }}
                    whileTap={{ backgroundColor: "#5f2eea38" }}
                  >
                    {value[reference_key].toUpperCase()}
                  </DropDownItem>
                ))}
            </DropDownContainer>
          )}
        </SelectContainer>
      </InnerContainer>
    </Container>
  );
};

export default CustomSelect;
