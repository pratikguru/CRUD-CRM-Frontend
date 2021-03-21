import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import media from "styled-media-query";

import { useSelector, useDispatch } from "react-redux";
import InputBoxAdv from "../InputBoxAdv";
import CustomButton from "../Button";
import Modal from "./Modal";
import CustomSelect from "../SelectInput";
import NavigationBar from "./NavigationBar";
import { getClients, addNewClient } from "../../redux/api/clientManagement";
import { getProducts } from "../../redux/api/productManagement";

import EditIcon from "../../assets/icons/edit.svg";
import ShowIcon from "../../assets/icons/show.svg";

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
  overflow-x: hidden;
`;

const InputContainer = styled(motion.div)`
  width: 100%;
  height: auto;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const InputSection = styled.div`
  display: flex;
  width: 90%;
  height: auto;
  padding: 10px;
  border-radius: 16px;
  box-shadow: 0px 2px 8px rgba(40, 41, 61, 0.08),
    0px 20px 32px rgba(96, 97, 112, 0.24);
  justify-content: space-between;
  align-items: auto;
  flex-direction: column;

  ${media.between("medium", "large")`
    width: 85%;
  `}
`;

const LoadingContainer = styled(motion.div)`
  width: -webkit-fill-available;
  height: auto;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddClientLoadingIndicator = styled(LoadingContainer)`
  height: 25px;
  background-color: #c9bdf8;
  border-radius: 16px;
  font-family: "Nunito";
  font-size: 16px;
  font-weight: 300;
  margin-top: 10px;
`;

/*
  Row Styling
*/
const CustomRow = styled(motion.div)`
  width: -webkit-fill-available;
  height: auto;
  padding: 5px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #5f2eea;
  user-select: none;
  margin-top: 20px;

  font-family: "Nunito";
  font-size: 16px;
  font-size: 12px;
  font-weight: 500;
`;

const IconBox = styled.div`
  height: 60px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    139.52deg,
    #0011ab -60.43%,
    rgba(0, 91, 171, 0) 179.29%
  );
  border-radius: 20px;

  font-size: 36px;
  font-weight: 400;
  font-family: "Nunito";

  color: white;
`;

const MetaDataContainer = styled.div`
  font-size: 14px;
  font-weight: 400;
  font-family: "Nunito";
  height: auto;
  flex-direction: column;
  width: auto;
  display: flex;
  margin-left: 10px;
`;

const MetaDataClientId = styled.div`
  color: #4523c6;
  font-size: 12px;
  font-family: "Nunito";
  font-weight: 350;
`;

const EditButton = styled(motion.div)`
  background: linear-gradient(225deg, #8743ff 0%, #4136f1 100%);
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0px 15px 30px rgba(20, 102, 204, 0.16);
  border-radius: 10px;

  height: 30px;
  width: 30px;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ClientManagement() {
  const dispatch = useDispatch();

  /* Selectors */
  const currentTab = useSelector(
    (state) => state.navigation.current_client_tab
  );
  const currentClientList = useSelector((state) => state.client.clients);
  const clientAddSuccess = useSelector((state) => state.client.loading);
  const productList = useSelector((state) => state.product.products);

  /* use states */
  const [clientInformation, setClientInformation] = useState("");
  const handleInputChange = (e, type) => {
    setClientInformation(e.target.value);
  };
  const [showModal, setShowModal] = useState(false);

  /* useEffect for client name. */
  useEffect(() => {
    setClientInformation("");
    dispatch(getClients());
    dispatch(getProducts());
  }, [setClientInformation, dispatch]);

  const handleAddClient = async () => {
    await dispatch(addNewClient(clientInformation));
  };

  return (
    <Container
      positionTransition
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          min: 0,
          max: 100,
          bounceStiffness: 100,
        },
      }}
      initial={{ opacity: 0, y: -20 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      <InnerContainer>
        <Header>Clients Management</Header>
        <ScrollContainer>
          <NavigationBar></NavigationBar>
          {currentTab.current_tab === "clients" && (
            <InputContainer
              positionTransition
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  min: 0,
                  max: 100,
                  bounceStiffness: 100,
                },
              }}
              initial={{ opacity: 0, y: -20 }}
              exit={{ opacity: 0, transition: { duration: 1 } }}
            >
              <InputSection>
                <Header style={{ fontSize: "18px" }}>Client Group</Header>

                <InputBoxAdv
                  type="input"
                  placeholder={"Client Group Details"}
                  value={clientInformation}
                  onChange={(e) => handleInputChange(e, "client_name")}
                  style={{
                    sectionOne: { marginLeft: "5px" },
                    sectionTwo: {
                      width: "180px",
                      height: "20px",
                      margin: "5px",
                    },
                  }}
                ></InputBoxAdv>
                <CustomButton
                  text={"Add Client"}
                  disabled={clientInformation !== "" ? false : true}
                  style={{ width: "100px", height: "40px", margin: "5px" }}
                  onClick={() => {
                    handleAddClient();
                  }}
                ></CustomButton>
                {clientAddSuccess && (
                  <AddClientLoadingIndicator
                    animate={{ scale: [0.97, 1, 0.97] }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    {"Adding Client"}
                  </AddClientLoadingIndicator>
                )}
              </InputSection>
              <InputSection style={{ marginTop: "25px" }}>
                <Header style={{ fontSize: "18px" }}> Client Listings </Header>
                {currentClientList ? (
                  currentClientList.map((value, index) => (
                    <CustomRow
                      key={index}
                      whileHover={{ boxShadow: "0px 0px 3px 2px #d5d5dc" }}
                    >
                      <div style={{ display: "flex" }}>
                        <IconBox>{value.client_name.toUpperCase()[0]}</IconBox>

                        <MetaDataContainer>
                          {" "}
                          {value.client_name.toUpperCase()}
                          <MetaDataClientId>
                            {value.client_id.toUpperCase()}
                          </MetaDataClientId>
                        </MetaDataContainer>
                      </div>
                      <EditButton
                        onClick={() => setShowModal(true)}
                        whileTap={{ scale: 0.88 }}
                      >
                        <img
                          src={ShowIcon}
                          alt="i"
                          style={{ width: "20px", height: "20px" }}
                        />
                      </EditButton>
                    </CustomRow>
                  ))
                ) : (
                  <div> No Companies </div>
                )}
              </InputSection>
            </InputContainer>
          )}
          {currentTab.current_tab === "subclients" && (
            <InputContainer
              positionTransition
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  min: 0,
                  max: 100,
                  bounceStiffness: 100,
                },
              }}
              initial={{ opacity: 0, y: -20 }}
              exit={{ opacity: 0, transition: { duration: 1 } }}
            >
              <InputSection>
                <Header style={{ fontSize: "18px" }}>Sub Clients Group </Header>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  <CustomSelect
                    label={"Client Name"}
                    reference_key={"client_name"}
                    data={currentClientList}
                    handleChange={(e) => console.log(e)}
                  ></CustomSelect>
                  <InputBoxAdv
                    type="input"
                    placeholder={"Client ID"}
                    style={{
                      sectionOne: { marginLeft: "5px" },
                      sectionTwo: {
                        width: "180px",
                        height: "20px",
                        margin: "5px",
                      },
                    }}
                  ></InputBoxAdv>

                  <InputBoxAdv
                    type="input"
                    placeholder={"Sub Client Name "}
                    style={{
                      sectionOne: { marginLeft: "5px" },
                      sectionTwo: {
                        width: "180px",
                        height: "20px",
                        margin: "5px",
                      },
                    }}
                  ></InputBoxAdv>

                  <InputBoxAdv
                    type="input"
                    placeholder={"Sub Client Address "}
                    style={{
                      sectionOne: { marginLeft: "5px" },
                      sectionTwo: {
                        width: "250px",
                        height: "20px",
                        margin: "5px",
                      },
                    }}
                  ></InputBoxAdv>

                  <InputBoxAdv
                    type="input"
                    placeholder={"Correspondent First Name"}
                    style={{
                      sectionOne: { marginLeft: "5px" },
                      sectionTwo: {
                        width: "250px",
                        height: "20px",
                        margin: "5px",
                      },
                    }}
                  ></InputBoxAdv>
                  <InputBoxAdv
                    type="input"
                    placeholder={"Correspondent Last Name "}
                    style={{
                      sectionOne: { marginLeft: "5px" },
                      sectionTwo: {
                        width: "250px",
                        height: "20px",
                        margin: "5px",
                      },
                    }}
                  ></InputBoxAdv>
                  <InputBoxAdv
                    type="input"
                    placeholder={"Correspondent Email"}
                    style={{
                      sectionOne: { marginLeft: "5px" },
                      sectionTwo: {
                        width: "250px",
                        height: "20px",
                        margin: "5px",
                      },
                    }}
                  ></InputBoxAdv>

                  <InputBoxAdv
                    type="input"
                    placeholder={"Correspondent Phone"}
                    style={{
                      sectionOne: { marginLeft: "5px" },
                      sectionTwo: {
                        width: "180px",
                        height: "20px",
                        margin: "5px",
                      },
                    }}
                  ></InputBoxAdv>
                  <CustomSelect
                    label={"Assosiated Products"}
                    reference_key={"product_name"}
                    data={productList}
                    handleChange={(e) => console.log(e)}
                  ></CustomSelect>
                </div>

                <CustomButton
                  text={"Add Sub Client"}
                  disabled={true}
                  style={{ width: "120px", height: "40px", margin: "5px" }}
                  onClick={() => {
                    handleAddClient();
                  }}
                ></CustomButton>
              </InputSection>
            </InputContainer>
          )}
        </ScrollContainer>
        <Modal
          showModal={showModal}
          closeModal={() => setShowModal(false)}
        ></Modal>
      </InnerContainer>
    </Container>
  );
}

export default ClientManagement;
