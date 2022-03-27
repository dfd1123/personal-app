import React from 'react';
import styled from 'styled-components';

interface PropsType {
  children: React.ReactNode;
  nonModal?: boolean;
  close?: () => void;
  className?: string;
}

const ModalTemplate = ({ children, nonModal, close, className }: PropsType) => {
  nonModal = Boolean(nonModal);

  const closeModal = (e: React.MouseEvent) => {
    if (nonModal) return;
    const element = e.target as HTMLElement;
    if (close && element.classList.contains('dim')) close();
  };

  return (
    <div className={className}>
      {!nonModal ? (
        <div className="dim" onClick={closeModal}>
          <div className="cont">{children}</div>
        </div>
      ) : (
        <div className="cont">{children}</div>
      )}
    </div>
  );
};

export const ModalStyle = styled(ModalTemplate)`
  .dim {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);

    &.non-modal {
      background-color: transparent;
    }

    .cont {
    }
  }
`;

export const BottomModalStyle = styled(ModalTemplate)`
  .dim {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(0px);
    .cont {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 220px;
      background-color: #fff;
      border-radius: 20px 20px 0px 0px;
      transform: translateY(100%);
    }
  }

  &.fade-enter-done {
    .dim {
      transition: backdrop-filter ease-out 0.2s;
      backdrop-filter: blur(2px);
    }

    .cont {
      transition: transform ease-out 0.1s 0.25s;
      transform: translateY(0px);
    }
  }
`;

export const FullScreenModalStyle = styled(ModalTemplate)`
  .dim {
    .cont {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      background-color: #fff;
    }
  }
`;
