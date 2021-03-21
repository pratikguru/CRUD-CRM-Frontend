import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import CloseIcon from "../../../assets/icons/close_small.svg";

const ModalContainer = styled(motion.div)`
  width: 100vw;
  height: 120vh;
  backdrop-filter: blur(20px);
  z-index: 1;
  display: ${(props) => (props.showModal ? "flex" : "none")};
  position: fixed;
  justify-content: center;
  align-items: center;
`;

const ModalLayout = styled.div`
  width: 80%;
  height: 50%;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 25px 40px rgba(0, 0, 0, 0.05);
`;

const Header = styled.div`
  width: -webkit-fill-available%;
  height: auto;
  padding: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
`;

const CloseIconContainer = styled(motion.div)`
  width: auto;
  height: auto;
  display: flex;
  padding: 2px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0px 15px 30px rgba(20, 102, 204, 0.16);
  color: white;
`;

const variants = {
  open: {
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 30,
    },
  },

  close: {
    opacity: 0,
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 200,
      damping: 30,
    },
  },
};

export default function Modal({ showModal, closeModal }) {
  return (
    <ModalContainer
      showModal={showModal}
      animate={showModal ? "open" : "close"}
      variants={variants}
    >
      <ModalLayout>
        <Header>
          <CloseIconContainer
            whileTap={{ scale: 0.89 }}
            transition={{ type: "spring", stiffness: "200", damping: "20" }}
            onClick={closeModal}
          >
            <img src={CloseIcon} alt="c" />
          </CloseIconContainer>
        </Header>
      </ModalLayout>
    </ModalContainer>
  );
}
