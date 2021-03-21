import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { useSelector, useDispatch } from "react-redux";
import { removeNotification } from "../../redux/actions/notificationActions";
import CloseIcon from "../../assets/icons/close_small.svg";

const ModalContainer = styled(motion.div)``;

const colors = {
  success: "#49af49",
  info: "#2b61da",
  error: "#f53e3e",
};

const ModalLayout = styled.ul`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  list-style: none;
  justify-content: flex-end;
`;

const NotificationContainer = styled(motion.li)`
  width: 300px;
  height: auto;
  flex-basis: 75px;
  padding: 8px;
  position: relative;
  border-radius: 10px;
  display: flex;
  align-items: center;
  opacity: 1;
  box-shadow: 0px 2px 8px rgba(40, 41, 61, 0.08),
    0px 20px 32px rgba(96, 97, 112, 0.24);
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) => props.color};
  color: white;
  font-size: 13px;
  margin-top: 3%;
`;

const CloseButtonContainer = styled(motion.div)`
  width: 30px;
  height: 30px;
  display: flex;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.6);
  justify-content: center;
  align-items: center;
  align-self: center;
`;

const BodyContainer = styled.div`
  height: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;

const Header = styled.div`
  margin-bottom: 10px;
  font-weight: 500;
`;

const Body = styled.div``;

const Notification = () => {
  const dispatch = useDispatch();

  /* Use Selector Gathers. */
  const notificationList = useSelector(
    (state) => state.notifications.notificationsList
  );

  useEffect(() => {}, [notificationList]);

  return (
    <ModalLayout>
      <AnimatePresence initial={false}>
        {notificationList.map((value, index) => (
          <NotificationContainer
            color={colors[value.type]}
            key={index}
            positionTransition
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          >
            <BodyContainer style={{ width: "20%" }}>
              <CloseButtonContainer
                onClick={() => dispatch(removeNotification(index))}
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              >
                <img src={CloseIcon} alt="" />
              </CloseButtonContainer>
            </BodyContainer>
            <BodyContainer style={{ width: "80%" }}>
              <Header> {value.type.toUpperCase()}! </Header>
              <Body>{value.message}</Body>
            </BodyContainer>
          </NotificationContainer>
        ))}
      </AnimatePresence>
    </ModalLayout>
  );
};

export default Notification;
