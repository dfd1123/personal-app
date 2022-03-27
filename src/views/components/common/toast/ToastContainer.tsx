import React from "react";
import { useTypedSelector } from "@/store";
import styled from "styled-components";
import Portal from "@/views/components/common/Portal";
import ToastComponent from "@/views/components/common/toast/ToastComponent";
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';

const ToastContainer = () => {
    const toasts = useTypedSelector(
      (state) => state.toastSlice.toasts,
      (a, b) => JSON.stringify(a) === JSON.stringify(b)
    );
  

    return (
        <Portal elementId="toast-root">
          <ToastContainerStyle>
            {toasts.map((toast) => (
              <ToastComponent key={toast.id} toast={toast} />
            ))}
          </ToastContainerStyle>
        </Portal>
      );
};

const ToastContainerStyle = styled.div`
    position:fixed;
    top:0;
    left:0;
    z-index:1000000;
    width:100%;
    height:0;

    @media(max-width: ${TABLET_SIZE}){
        top:0%;
    }
`;

export default ToastContainer;