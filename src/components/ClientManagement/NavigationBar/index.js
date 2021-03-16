import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import media from "styled-media-query";
import { useDispatch, useSelector } from "react-redux";

import { setClientNav } from "../../../redux/actions/navActions";

import ClientIcon from "../../../assets/icons/single_client.svg";
import SubClientIcon from "../../../assets/icons/sub_clients.svg";

const TopNavigationContainer = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  justify-self: flex-start;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
`;

const TopNavigation = styled.div`
  width: auto;
  height: 50px;
  justify-content: space-evenly;
  align-items: center;
  display: flex;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0px 2px 8px rgba(40, 41, 61, 0.08),
    0px 20px 32px rgba(96, 97, 112, 0.24);
  padding: 5px;
`;

const NavLinks = styled(motion.div)`
  width: auto;
  padding-left: 10px;
  padding-right: 10px;
  height: auto;
  padding: 5px;
  display: flex;
  margin: 10px;
  justify-content: center;
  align-items: center;
  text-selection: none;
  cursor: pointer;
  border-bottom: 2px solid #FFFFF;

  ${media.between("medium", "large")`
    width : auto;
  `}

  ${media.greaterThan("large")`
    width : 150px;
  `}
`;

function NavigationBar() {
  const dispatch = useDispatch();
  const [currentNav, setCurrentNav] = useState(
    useSelector((state) => state.navigation.current_client_tab)
  );

  const handleNavigationChange = (nav) => {
    setCurrentNav({ current_tab: nav });
    dispatch(setClientNav({ current_tab: nav }));
  };

  useEffect(() => {
    console.log("re-rendering");
    setCurrentNav(currentNav);
  }, [currentNav, setCurrentNav]);

  return (
    <TopNavigationContainer>
      <TopNavigation>
        <NavLinks
          animate={{
            color: currentNav.current_tab === "clients" ? "#5F2EEA" : "",
            borderBottom:
              currentNav.current_tab === "clients"
                ? "2px solid #5F2EEA"
                : "2px solid #FFFFFF",
          }}
          whileHover={{
            borderBottom: "2px solid #5F2EEA",
          }}
          onClick={() => handleNavigationChange("clients")}
          transition={{ duration: 0.2, ease: "linear" }}
        >
          <img
            src={ClientIcon}
            alt=""
            style={{ width: "20px", height: "20px", margin: "2px" }}
          />
          Clients
        </NavLinks>
        <NavLinks
          animate={{
            color: currentNav.current_tab === "subclients" ? "#5F2EEA" : "",
            borderBottom:
              currentNav.current_tab === "subclients"
                ? "2px solid #5F2EEA"
                : "2px solid #FFFFFF",
          }}
          whileHover={{
            borderBottom: "2px solid #5F2EEA",
          }}
          onClick={() => handleNavigationChange("subclients")}
          transition={{ duration: 0.2, ease: "linear" }}
        >
          <img
            src={SubClientIcon}
            alt=""
            style={{ width: "20px", height: "20px", margin: "2px" }}
          />
          Sub Clients
        </NavLinks>
      </TopNavigation>
    </TopNavigationContainer>
  );
}

export default NavigationBar;
