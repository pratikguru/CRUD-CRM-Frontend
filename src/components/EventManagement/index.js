import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Frame, Scroll } from "framer-motion";

import InputBoxAdv from "../FormComponents/InputBoxAdv";
import TextBox from "../FormComponents/TextBox";
import CustomButton from "../FormComponents/Button";
import CustomSelect from "../FormComponents/SelectInput";
import TemplateDisplay from "../TemplateDisplay/index.js";
import DatePicker from "../FormComponents/DateSelector";
import { useSelector, useDispatch } from "react-redux";

import { getClients } from "../../redux/api/clientManagement";

import BdayTemplate from "../../assets/TemplateImages/bdayTemplate.png";
import BdayTemplateData from "../Templates/bdayTemplate";
import SelectBoxMUI from "../FormComponents/SelectInputMUI";

import { sendTestEmail } from "../../redux/api/eventManagement";

import moment from "moment";
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
  display: flex;
  overflow-y: auto;
  flex-direction: row;
  padding: 5px;
  justify-content: space-between;
  align-items: top;
`;

const LeftContainer = styled(motion.div)`
  width: 20%;
  height: auto;
  display: block;
  flex-direction: column;
  overflow-y: auto;
  border-radius: 10px;
  margin-right: 10px;
  margin-left: 5px;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 8px rgba(40, 41, 61, 0.08),
    0px 20px 32px rgba(96, 97, 112, 0.24);
  padding: 10px;
`;

const RightContainer = styled(LeftContainer)`
  width: 80%;
  flex-direction: column;
  margin-right: 10px;
  margin-left: 0px;
`;

const TemplateContainer = styled(motion.div)`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
`;

const TemplateCards = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: flex;
  border-radius: 20px;
  margin: 20px;
  box-shadow: 0px 2px 8px rgba(40, 41, 61, 0.08),
    0px 20px 32px rgba(96, 97, 112, 0.24);
`;

const temaplateList = [BdayTemplate];
const defaultEvent = {
  //time: "7/5/2021-02",
  time: new moment().format("l-hh"),
  format: "l-hh",
  compFormat: "MM/DD/YYYY-hh",
  eventDetails: {
    name: "",
  },
  templateData: {
    user: "",
    userFirstName: "",
    userLastName: "",
    customMessage: "",
  },
  emailConfig: {
    auth: {
      user: "pratik.gurudatt@gmail.com",
      pass: "Loveisswathisharma99!",
    },
    from: "pratik.gurudatt@gmail.com",
    to: "",
    subject: "",
  },
  temaplate: BdayTemplateData,
};

function EventManagement() {
  const dispatch = useDispatch();

  const currentClientList = useSelector((state) => state.client.clients);
  const [currentTemplate, setCurrentTemplate] = React.useState(0);
  const [templateData, setTemplateData] = React.useState(defaultEvent);
  const [selectedClient, setSelectedClient] = React.useState(-1);
  const [subClientList, setSubClientList] = React.useState([]);
  const [selectedSubClient, setSelectedSubClient] = React.useState(-1);

  const [date, setDate] = useState(new moment());
  const [emailTestCount, setEmailTestCount] = React.useState(0);

  const handleClientSelect = useCallback(
    (e) => {
      console.log(currentClientList[e.target.value]);
      setSelectedClient(e.target.value);
      setSubClientList(
        Object.keys(currentClientList[e.target.value]["sub_clients"]).map(
          (value, index) =>
            currentClientList[e.target.value]["sub_clients"][value]
        )
      );
    },
    [setSelectedClient, currentClientList]
  );

  const handleSubClientSelect = useCallback(
    (e) => {
      setSelectedSubClient(e.target.value);
      console.log(subClientList[e.target.value]);
      setTemplateData({
        ...templateData,
        templateData: {
          ...templateData.templateData,
          userFirstName:
            subClientList[e.target.value].sub_client_correspondent_first_name,
          userLastName:
            subClientList[e.target.value].sub_client_correspondent_last_name,
          email: subClientList[e.target.value].sub_client_correspondent_email,
        },
        emailConfig: {
          ...templateData.emailConfig,
          to: subClientList[e.target.value].sub_client_correspondent_email,
        },
      });
    },
    [setSelectedSubClient, subClientList, setTemplateData, templateData]
  );

  const handleTemplateSelect = (index) => {
    setCurrentTemplate(index);
  };

  const handleToggleBack = (e) => {
    setCurrentTemplate(e);
  };

  const handleChange = (e, type) => {
    let templateDataNew = templateData;
    templateDataNew[type] = e.target.value;
    setTemplateData({ ...templateDataNew });
  };

  const handleDateChange = (e) => {
    setDate(e);
    setTemplateData({
      ...templateData,
      time: new moment(e).format(templateData.format),
    });
  };

  const handleEmailTesting = () => {
    console.log(templateData);
    dispatch(sendTestEmail(templateData));
    let count = emailTestCount;
    count++;
    setEmailTestCount(count);
  };

  React.useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  console.log(templateData);
  console.log(subClientList);
  console.log(emailTestCount);

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
        <Header>Event Management</Header>
        <ScrollContainer>
          <LeftContainer>
            <SelectBoxMUI
              handleChange={handleClientSelect}
              selectedValue={selectedClient}
              referenceKey={"client_name"}
              label={"Client"}
              data={currentClientList}
            />
            {subClientList && (
              <SelectBoxMUI
                handleChange={handleSubClientSelect}
                selectedValue={selectedSubClient}
                referenceKey={"sub_client_name"}
                label={"Sub Client"}
                data={subClientList}
              />
            )}

            <InputBoxAdv
              placeholder={"First Name"}
              style={{
                sectionTwo: { width: "230px" },
                sectionOne: { width: "230px", marginTop: "10px" },
              }}
              value={templateData.templateData.userFirstName}
              onChange={(e) => {
                setTemplateData({
                  ...templateData,
                  templateData: {
                    ...templateData.templateData,
                    userFirstName: e.target.value,
                  },
                });
              }}
            />
            <InputBoxAdv
              placeholder={"Second Name"}
              style={{
                sectionTwo: { width: "230px" },
                sectionOne: { width: "230px", marginTop: "10px" },
              }}
              value={templateData.templateData.userLastName}
              onChange={(e) => {
                setTemplateData({
                  ...templateData,
                  templateData: {
                    ...templateData.templateData,
                    userLastName: e.target.value,
                  },
                });
              }}
            />
            <InputBoxAdv
              placeholder={"Email Subject"}
              style={{
                sectionTwo: { width: "230px" },
                sectionOne: { width: "230px", marginTop: "10px" },
              }}
              value={templateData.emailConfig.subject}
              onChange={(e) => {
                setTemplateData({
                  ...templateData,
                  emailConfig: {
                    ...templateData.emailConfig,
                    subject: e.target.value,
                  },
                });
              }}
            />
            <TextBox
              style={{
                sectionOne: { marginTop: "10px" },
                sectionTwo: { width: "230px" },
              }}
              placeholder={"Custom Message"}
              value={templateData.templateData.customMessage}
              onChange={(e) => {
                setTemplateData({
                  ...templateData,
                  templateData: {
                    ...templateData.templateData,
                    customMessage: e.target.value,
                  },
                });
              }}
            />
            <DatePicker
              date={date}
              handleDateChange={handleDateChange}
              style={{ width: "230px", marginTop: "10px" }}
              label={"Event Date"}
            />
            <CustomButton
              type="submit"
              text={"Test Email"}
              style={{ width: "250px", marginTop: "15px" }}
              disabled={emailTestCount >= 3 ? true : false}
              onClick={handleEmailTesting}
            ></CustomButton>
            <CustomButton
              type="submit"
              text={"Submit"}
              style={{ width: "250px", marginTop: "15px" }}
            ></CustomButton>
          </LeftContainer>

          <RightContainer>
            <Header style={{ fontSize: "18px" }}>Templates</Header>
            <TemplateContainer>
              {currentTemplate === 0 ? (
                temaplateList.map((value, index) => (
                  <TemplateCards
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleTemplateSelect(index + 1)}
                  >
                    <img
                      src={value}
                      style={{
                        borderRadius: "10px",
                        width: "100%",
                        height: "100%",
                      }}
                      alt=""
                    />
                  </TemplateCards>
                ))
              ) : (
                <TemplateDisplay
                  toggleBack={(e) => handleToggleBack(e)}
                  templateImage={temaplateList[currentTemplate - 1]}
                />
              )}
            </TemplateContainer>
          </RightContainer>
        </ScrollContainer>
      </InnerContainer>
    </Container>
  );
}

export default EventManagement;
