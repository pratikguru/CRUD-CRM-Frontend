import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import media from "styled-media-query";

import { useSelector, useDispatch } from "react-redux";
import InputBoxAdv from "../FormComponents/InputBoxAdv";
import CustomButton from "../FormComponents/Button";
import Modal from "./Modal";
import CustomSelect from "../FormComponents/SelectInput";
import CustomSelectMUI from "../FormComponents/SelectInputMUI";
import MulitSelectBoxMUI from "../FormComponents/MultiSelectInputMUI";
import InputBoxMUI from "../FormComponents/InputBoxMUI";
import NavigationBar from "./NavigationBar";
import BdayTemplate from "../Templates/bdayTemplate";

import {
  getClients,
  addNewClient,
  getSubClients,
  addNewSubClient,
} from "../../redux/api/clientManagement";
import { getProducts } from "../../redux/api/productManagement";

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
  width: 80%;
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

const ErrorMessage = styled(motion.div)`
  width: -webkit-fill-available;
  height: auto;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 300;
`;

const ButtonLayer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  padding: 5px;
  justify-content: center;
  align-items: center;
`;

const subClientInitData = {
  client_id: "",
  sub_client_name: "",
  sub_client_address: "",
  sub_client_correspondent_first_name: "",
  sub_client_correspondent_last_name: "",
  sub_client_correspondent_email: "",
  sub_client_correspondent_phone: "",
  products: [],
};

function ClientManagement() {
  const dispatch = useDispatch();

  /* Selectors */
  const currentTab = useSelector(
    (state) => state.navigation.current_client_tab
  );
  const currentClientList = useSelector((state) => state.client.clients);
  const clientAddSuccess = useSelector((state) => state.client.loading);
  const subClientAddSucces = useSelector(
    (state) => state.client.loadingSubClients
  );
  const currentSubClientList = useSelector((state) => state.client.sub_clients);
  const productList = useSelector((state) => state.product.products);

  /* use states */
  const [clientInformation, setClientInformation] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [
    subClientInformation = subClientInitData,
    setSubClientInformation,
  ] = useState();
  const [subClientInformationUnlock, setSubClientInformationUnlock] = useState(
    false
  );
  const [selectedProductNames, setSelectedProductNames] = useState([]);
  const [clearButton, setClearButton] = useState(false);

  console.log(selectedProductNames);
  console.log(subClientInformation);

  const handleInputChange = (e, type) => {
    setClientInformation(e.target.value);
  };

  const handleSubClientChange = (type, e) => {
    var sub_client_information = subClientInformation;
    console.log(type, e);
    if (type === "client_name") {
      sub_client_information["client_id"] =
        currentClientList[e.target.value].client_id;

      setSubClientInformation(
        JSON.parse(JSON.stringify(sub_client_information))
      );
    } else if (type === "product_name") {
      sub_client_information["products"].push({
        product_name: productList[e.target.value].product_name,
        product_id: productList[e.target.value]._id,
      });

      let selectedProducts = selectedProductNames;
      selectedProducts.push(productList[e.target.value].product_name);
      setSelectedProductNames(selectedProducts);

      setSubClientInformation(
        JSON.parse(JSON.stringify(sub_client_information))
      );
    } else {
      sub_client_information[type] = e.target.value;
      setSubClientInformation(
        JSON.parse(JSON.stringify(sub_client_information))
      );
    }

    let unlock = true;
    for (let key in subClientInformation) {
      if (subClientInformation[key] === "") {
        unlock = false;
      }
    }
    if (unlock) {
      setSubClientInformationUnlock(true);
    } else {
      setSubClientInformationUnlock(false);
    }
  };

  const handleChangeProductSelection = (type, e) => {
    let selectedProducts = selectedProductNames;
    selectedProducts.push(e.target.value);
    setSelectedProductNames([...e.target.value]);

    let sub_client_information = subClientInformation;
    sub_client_information["products"].push({
      product_name:
        productList[e.target.value[e.target.value.length - 1]].product_name,
      product_id: productList[e.target.value[e.target.value.length - 1]]._id,
    });
    setSubClientInformation(JSON.parse(JSON.stringify(sub_client_information)));
  };

  const handleRowSelection = (value, index) => {
    console.log(value, index);
    setSubClientInformation(JSON.parse(JSON.stringify(value)));
    setClearButton(true);
  };

  /* useEffect for client name. */
  useEffect(() => {
    setClientInformation("");
    setSubClientInformation(subClientInitData);
    dispatch(getClients());
    dispatch(getProducts());
    //
  }, [setClientInformation, setSubClientInformation, dispatch]);

  const handleAddClient = async () => {
    await dispatch(addNewClient(clientInformation));
  };

  const handleAddSubClient = async () => {
    console.log(subClientInformation);
    dispatch(addNewSubClient(subClientInformation));
  };

  React.useEffect(() => {
    //console.log(subClientInformation);
    if (subClientInformation["client_id"]) {
      console.log(subClientInformation);
      dispatch(getSubClients({ client_id: subClientInformation["client_id"] }));
    }
  }, [subClientInformation, subClientInformation.client_id, dispatch]);

  console.log("currentClientList", currentClientList);
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
                    flexDirection: "column",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CustomSelectMUI
                    multiple={false}
                    label={"Client Name"}
                    referenceKey={"client_name"}
                    data={currentClientList}
                    handleChange={(e) =>
                      handleSubClientChange("client_name", e)
                    }
                  ></CustomSelectMUI>
                  <InputBoxMUI
                    placeHolder={"Client ID"}
                    style={{
                      sectionTwo: {
                        width: "-webkit-fill-available",
                        height: "40px",
                      },
                    }}
                    onChange={(e) => handleSubClientChange("client_id", e)}
                    value={
                      subClientInformation.client_id &&
                      subClientInformation.client_id
                    }
                  />

                  <InputBoxMUI
                    placeHolder={"Sub Client Name "}
                    style={{
                      sectionTwo: {
                        width: "-webkit-fill-available",
                        height: "40px",
                        margin: "5px",
                      },
                    }}
                    onChange={(e) =>
                      handleSubClientChange("sub_client_name", e)
                    }
                    value={
                      subClientInformation.sub_client_name &&
                      subClientInformation.sub_client_name
                    }
                  ></InputBoxMUI>

                  <InputBoxMUI
                    type="input"
                    placeHolder={"Sub Client Address "}
                    style={{
                      sectionTwo: {
                        width: "-webkit-fill-available",
                        height: "40px",
                        margin: "5px",
                      },
                    }}
                    onChange={(e) =>
                      handleSubClientChange("sub_client_address", e)
                    }
                    value={subClientInformation?.sub_client_address}
                  ></InputBoxMUI>

                  <InputBoxMUI
                    type="input"
                    placeHolder={"Correspondent First Name"}
                    style={{
                      sectionTwo: {
                        width: "-webkit-fill-available",
                        height: "40px",
                        margin: "5px",
                      },
                    }}
                    onChange={(e) =>
                      handleSubClientChange(
                        "sub_client_correspondent_first_name",
                        e
                      )
                    }
                    value={
                      subClientInformation?.sub_client_correspondent_first_name
                    }
                  ></InputBoxMUI>
                  <InputBoxMUI
                    type="input"
                    placeHolder={"Correspondent Last Name "}
                    style={{
                      sectionTwo: {
                        width: "-webkit-fill-available",
                        height: "40px",
                        margin: "5px",
                      },
                    }}
                    onChange={(e) =>
                      handleSubClientChange(
                        "sub_client_correspondent_last_name",
                        e
                      )
                    }
                    value={
                      subClientInformation?.sub_client_correspondent_last_name
                    }
                  ></InputBoxMUI>
                  <InputBoxMUI
                    type="input"
                    placeHolder={"Correspondent Email"}
                    style={{
                      sectionTwo: {
                        width: "-webkit-fill-available",
                        height: "40px",
                        margin: "5px",
                      },
                    }}
                    onChange={(e) =>
                      handleSubClientChange("sub_client_correspondent_email", e)
                    }
                    value={subClientInformation?.sub_client_correspondent_email}
                  ></InputBoxMUI>

                  <InputBoxMUI
                    type="input"
                    placeHolder={"Correspondent Phone"}
                    style={{
                      sectionTwo: {
                        width: "-webkit-fill-available",
                        height: "40px",
                        margin: "5px",
                      },
                    }}
                    onChange={(e) =>
                      handleSubClientChange("sub_client_correspondent_phone", e)
                    }
                    value={subClientInformation?.sub_client_correspondent_phone}
                  ></InputBoxMUI>
                  <MulitSelectBoxMUI
                    label={"Assosiated Products"}
                    referenceKey={"product_name"}
                    data={productList}
                    selectedValue={selectedProductNames}
                    handleChange={(e) =>
                      handleChangeProductSelection("product_name", e)
                    }
                  ></MulitSelectBoxMUI>

                  <InputBoxMUI
                    type="input"
                    placeHolder={"Associated Product ID"}
                    style={{
                      sectionTwo: {
                        width: "-webkit-fill-available",
                        height: "40px",
                        margin: "5px",
                      },
                    }}
                    onChange={(e) => handleSubClientChange("product_id", e)}
                    value={
                      subClientInformation.products[
                        subClientInformation.products.length - 1
                      ]?.product_id &&
                      subClientInformation.products[
                        subClientInformation.products.length - 1
                      ]?.product_id
                    }
                  ></InputBoxMUI>
                </div>
                <ButtonLayer>
                  <CustomButton
                    text={"Add Sub Client"}
                    disabled={!subClientInformationUnlock}
                    style={{ width: "120px", height: "40px", margin: "5px" }}
                    onClick={() => {
                      handleAddSubClient();
                    }}
                  ></CustomButton>
                  <CustomButton
                    text={"Clear"}
                    disabled={!clearButton}
                    style={{ width: "120px", height: "40px", margin: "5px" }}
                    onClick={() => {
                      setSubClientInformation(subClientInitData);
                      setClearButton(false);
                    }}
                  ></CustomButton>
                </ButtonLayer>

                {subClientAddSucces && (
                  <AddClientLoadingIndicator
                    animate={{ scale: [0.97, 1, 0.97] }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    {"Fetching Sub Client Data!"}
                  </AddClientLoadingIndicator>
                )}
              </InputSection>
              {currentSubClientList.length > 0 && (
                <InputSection
                  style={{ marginTop: "25px", marginBottom: "50px" }}
                >
                  <Header style={{ fontSize: "18px" }}>
                    {" "}
                    Sub Client Listings{" "}
                  </Header>
                  {currentSubClientList.length > 0 &&
                    currentSubClientList.map((value, index) => (
                      <CustomRow
                        key={index}
                        whileHover={{ boxShadow: "0px 0px 3px 2px #d5d5dc" }}
                        onClick={() => handleRowSelection(value, index)}
                      >
                        <div style={{ display: "flex" }}>
                          <IconBox>
                            {value.sub_client_name.toUpperCase()[0]}
                          </IconBox>

                          <MetaDataContainer>
                            {" "}
                            {value.sub_client_name.toUpperCase()}
                            <MetaDataClientId>
                              {value.sub_client_id.toUpperCase()}
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
                    ))}
                </InputSection>
              )}
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
