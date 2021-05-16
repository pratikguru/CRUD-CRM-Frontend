import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import media from "styled-media-query";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import CustomSelect from "../SelectInput";

import EditIcon from "../../assets/icons/edit.svg";
import ShowIcon from "../../assets/icons/show.svg";

import {
  getClients,
  addNewClient,
  getSubClients,
  addNewSubClient,
} from "../../redux/api/clientManagement";

import {
  addServiceRequest,
  getSubClientServiceRequestsByID,
} from "../../redux/api/serviceManagement";

import { getProducts } from "../../redux/api/productManagement";

import InputBoxAdv from "../InputBoxAdv";
import TextBox from "../TextBox";
import CustomButton from "../Button";
import { getSubClientServiceRequest } from "../../redux/actions/serviceActions";

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

const AddServiceLoadingIndicator = styled(LoadingContainer)`
  height: 25px;
  background-color: #c9bdf8;
  border-radius: 16px;
  font-family: "Nunito";
  font-size: 16px;
  font-weight: 300;
  margin-top: 10px;
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

const defaultServiceInformation = {
  client_name: "",
  client_id: "",
  client_type: 1,
  sub_client_name: "",
  sub_client_id: "",
  comments: "",
  correspondent_first_name: "",
  correspondent_last_name: "",
  correspondent_phone_number: "",
  correspondent_email: "",
  contact_point_first_name: "",
  contact_point_last_name: "",
  contact_point_id: "",
  contact_point_phone_number: "",
  contact_point_email: "",
  product_for_service: "",
  service_status: 1,
};

function ServiceManagement() {
  const [loadingService, setLoadingService] = React.useState(false);
  const [serviceInformation, setServiceInformation] = React.useState(
    defaultServiceInformation
  );
  const [showModal, setShowModal] = React.useState(false);
  const [lock, setLock] = React.useState(true);

  const [selectedClient, setSelectedClient] = React.useState(-1);
  const dispatch = useDispatch();

  const currentSubClientServiceRequests = useSelector(
    (state) => state.service.services
  );
  const userList = useSelector((state) => state.auth.users);
  const currentClientList = useSelector((state) => state.client.clients);
  const currentSubClientList = useSelector((state) => state.client.sub_clients);
  const productList = useSelector((state) => state.product.products);
  const loadingStatus = useSelector((state) => state.service.loadingServices);

  console.log(currentSubClientServiceRequests, userList);

  const handleInputChange = (e, type) => {
    if (type === "client_name") {
      setSelectedClient(e);
      let service_information = serviceInformation;
      service_information["client_name"] = currentClientList[e].client_name;
      service_information["client_id"] = currentClientList[e].client_id;
      setServiceInformation({ ...service_information });
    } else if (type === "sub_client_name") {
      let service_information = serviceInformation;
      service_information["sub_client_name"] =
        currentSubClientList[e].sub_client_name;
      service_information["sub_client_id"] =
        currentSubClientList[e].sub_client_id;
      service_information["correspondent_first_name"] =
        currentSubClientList[e].sub_client_correspondent_first_name;
      service_information["correspondent_last_name"] =
        currentSubClientList[e].sub_client_correspondent_last_name;
      service_information["correspondent_email"] =
        currentSubClientList[e].sub_client_correspondent_email;
      service_information["correspondent_phone_number"] =
        currentSubClientList[e].sub_client_correspondent_phone;
      setServiceInformation({ ...service_information });
    } else if (type === "product_for_service") {
      let service_information = serviceInformation;
      service_information["product_for_service"] = productList[e]._id;
      setServiceInformation({ ...service_information });
    } else if (type === "contact_point") {
      let service_information = serviceInformation;
      service_information["contact_point_first_name"] = userList[e].firstName;
      service_information["contact_point_last_name"] = userList[e].lastName;
      service_information["contact_point_id"] = userList[e]._id;
      service_information["contact_point_phone_number"] =
        userList[e]?.phoneNumber;
      service_information["contact_point_email"] = userList[e].email;
      setServiceInformation({ ...service_information });
    } else {
      let service_information = serviceInformation;
      service_information[type] = e.target.value;
      setServiceInformation({ ...service_information });
    }

    let unlock = true;
    for (let key in serviceInformation) {
      if (serviceInformation[key] === "") {
        unlock = false;
      }
    }
    if (unlock) {
      setLock(false);
    } else {
      setLock(true);
    }
  };

  const handleAddNewService = () => {
    dispatch(addServiceRequest(serviceInformation));
    dispatch(
      getSubClientServiceRequestsByID({
        sub_client_id: serviceInformation["sub_client_id"],
      })
    );
  };

  React.useEffect(() => {
    dispatch(getClients());
    dispatch(getProducts());
  }, [dispatch]);

  React.useEffect(() => {
    if (serviceInformation["client_name"]) {
      dispatch(getSubClients({ client_id: serviceInformation["client_id"] }));
    }
  }, [dispatch, serviceInformation["client_name"]]);

  React.useEffect(() => {
    if (serviceInformation["sub_client_id"]) {
      dispatch(
        getSubClientServiceRequestsByID({
          sub_client_id: serviceInformation["sub_client_id"],
        })
      );
    }
  }, [dispatch, serviceInformation["sub_client_id"]]);

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
        <Header>Service Management</Header>
        <ScrollContainer>
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
              <Header style={{ fontSize: "18px" }}>Service Management</Header>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "10px",
                  height: "auto",
                }}
              >
                <CustomSelect
                  label={"Client Name"}
                  reference_key={"client_name"}
                  data={currentClientList}
                  handleChange={(e) => handleInputChange(e, "client_name")}
                ></CustomSelect>
                <InputBoxAdv
                  type="input"
                  placeholder={"Client ID"}
                  value={serviceInformation.client_id}
                  onChange={(e) => handleInputChange(e, "client_id")}
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
                  label={"Sub Client Name"}
                  reference_key={"sub_client_name"}
                  data={currentSubClientList}
                  handleChange={(e) => handleInputChange(e, "sub_client_name")}
                ></CustomSelect>
                <InputBoxAdv
                  type="input"
                  placeholder={"Sub Client ID"}
                  value={serviceInformation.sub_client_id}
                  onChange={(e) => handleInputChange(e, "sub_client_id")}
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
                  placeholder={"Correspondent First Name"}
                  value={serviceInformation.correspondent_first_name}
                  onChange={(e) =>
                    handleInputChange(e, "correspondent_first_name")
                  }
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
                  placeholder={"Correspondent Last Name"}
                  value={serviceInformation.correspondent_last_name}
                  onChange={(e) =>
                    handleInputChange(e, "correspondent_last_name")
                  }
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
                  placeholder={"Correspondent Phone Number"}
                  value={serviceInformation.correspondent_phone_number}
                  onChange={(e) =>
                    handleInputChange(e, "correspondent_phone_number")
                  }
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
                  placeholder={"Correspondent Email Address "}
                  value={serviceInformation.correspondent_email}
                  onChange={(e) => handleInputChange(e, "correspondent_email")}
                  style={{
                    sectionOne: { marginLeft: "5px" },
                    sectionTwo: {
                      width: "250px",
                      height: "20px",
                      margin: "5px",
                    },
                  }}
                ></InputBoxAdv>
                <CustomSelect
                  label={"Contact Point"}
                  reference_key={"firstName"}
                  data={userList}
                  handleChange={(e) => handleInputChange(e, "contact_point")}
                ></CustomSelect>
                <InputBoxAdv
                  type="input"
                  placeholder={"Contact Point First Name"}
                  value={serviceInformation.contact_point_first_name}
                  onChange={(e) =>
                    handleInputChange(e, "contact_point_first_name")
                  }
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
                  placeholder={"Contact Point Last name"}
                  value={serviceInformation.contact_point_last_name}
                  onChange={(e) =>
                    handleInputChange(e, "contact_point_last_name")
                  }
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
                  placeholder={"Contact Point ID"}
                  value={serviceInformation.contact_point_id}
                  onChange={(e) => handleInputChange(e, "contact_point_id")}
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
                  placeholder={"Contact Phone Number"}
                  value={serviceInformation.contact_point_phone_number}
                  onChange={(e) =>
                    handleInputChange(e, "contact_point_phone_number")
                  }
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
                  placeholder={"Contact Email"}
                  value={serviceInformation.contact_point_email}
                  onChange={(e) => handleInputChange(e, "contact_point_email")}
                  style={{
                    sectionOne: { marginLeft: "5px" },
                    sectionTwo: {
                      width: "250px",
                      height: "20px",
                      margin: "5px",
                    },
                  }}
                ></InputBoxAdv>
                <CustomSelect
                  label={"Product Name"}
                  reference_key={"product_name"}
                  data={productList}
                  handleChange={(e) =>
                    handleInputChange(e, "product_for_service")
                  }
                ></CustomSelect>
                <InputBoxAdv
                  type="input"
                  placeholder={"Product ID"}
                  value={serviceInformation.product_for_service}
                  //onChange={(e) => handleInputChange(e, "product_for_service")}
                  style={{
                    sectionOne: { marginLeft: "5px" },
                    sectionTwo: {
                      width: "250px",
                      height: "auto",
                      margin: "5px",
                    },
                  }}
                ></InputBoxAdv>
                <TextBox
                  type="input"
                  placeholder={"Comments"}
                  value={serviceInformation.comments}
                  onChange={(e) => handleInputChange(e, "comments")}
                  style={{
                    sectionOne: { marginLeft: "5px" },
                    sectionTwo: {
                      maxWidth: "650px",
                      width: "auto",
                      height: "auto",
                      margin: "5px",
                    },
                  }}
                ></TextBox>
              </div>
              <CustomButton
                text={"Add Service"}
                disabled={lock}
                style={{ width: "100px", height: "40px", margin: "5px" }}
                onClick={() => handleAddNewService()}
              ></CustomButton>
              {loadingStatus && (
                <AddServiceLoadingIndicator
                  animate={{ scale: [0.97, 1, 0.97] }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {"Handling Service"}
                </AddServiceLoadingIndicator>
              )}
            </InputSection>
            <InputSection style={{ marginTop: "25px" }}>
              <Header style={{ fontSize: "18px" }}>
                {" "}
                Service Request Listings{" "}
                <div style={{ fontSize: "12px" }}>
                  {currentSubClientServiceRequests &&
                    currentSubClientServiceRequests.length}{" "}
                  Previous Requests Found!
                </div>
              </Header>
              {currentSubClientServiceRequests ? (
                currentSubClientServiceRequests.map((value, index) => (
                  <CustomRow
                    key={index}
                    whileHover={{ boxShadow: "0px 0px 3px 2px #d5d5dc" }}
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
                        <MetaDataClientId>
                          {value.docket_number.toUpperCase()}
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
        </ScrollContainer>
        <Modal
          showModal={showModal}
          closeModal={() => setShowModal(false)}
        ></Modal>
      </InnerContainer>
    </Container>
  );
}

export default ServiceManagement;
