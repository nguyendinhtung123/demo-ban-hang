import { Box, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../../utils/extraFunctions";
import { CheckoutBtn } from "./CheckoutBtn";
import { useNavigate } from "react-router-dom";
import { OrderSummaryDataSection } from "./OrderSummaryDataSection";

export const OrderSummary = () => {
  const orderSummary = useSelector((state) => state.cart.orderSummary);
  const token = useSelector((state) => state.auth.token);

  const toast = useToast();
  const navigate = useNavigate();
  const handleMemberCheckout = () => {
    
    if (orderSummary.total === 0) {
      return setToast(toast, "Please add some products in the cart", "error");
    }
    navigate("/checkout");
  };

  return (
    <>
      <Box>
        <OrderSummaryDataSection {...orderSummary} />
        <CheckoutBtn
          onClick={handleMemberCheckout}
          name={"Member Checkout"}
          bgColor={"black"}
          color={"white"}
          hoverBg={"#1e1e1e"}
          borderColor={"transparent"}
        />
      </Box>
    </>
  );
};
