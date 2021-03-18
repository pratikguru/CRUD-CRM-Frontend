import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { useSelector, useDispatch } from "react-redux";
import media from "styled-media-query";

import InputBoxAdv from "../InputBoxAdv";
import CustomButton from "../Button";

import { getProducts, addProduct } from "../../redux/api/productManagement";

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

function ProductManagement() {
  const dispatch = useDispatch();

  /* Use State Gathers.*/
  const [productInformation, setProductInformation] = useState("");

  /* Use Selector Gathers. */
  const productList = useSelector((state) => state.product.products);

  const handleInputChange = (e, type) => {
    setProductInformation(e.target.value);
  };

  const addNewProduct = async () => {
    await dispatch(addProduct({ product_name: productInformation }));
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

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
        <Header>Product Management</Header>
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
              <Header style={{ fontSize: "18px" }}>Product Management</Header>

              <InputBoxAdv
                type="input"
                placeholder={"Product Name"}
                value={productInformation}
                onChange={(e) => handleInputChange(e, "product_name")}
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
                text={"Add Product"}
                disabled={productInformation !== "" ? false : true}
                style={{ width: "100px", height: "40px", margin: "5px" }}
                onClick={() => {
                  addNewProduct();
                }}
              ></CustomButton>
            </InputSection>
          </InputContainer>
        </ScrollContainer>
      </InnerContainer>
    </Container>
  );
}

export default ProductManagement;
