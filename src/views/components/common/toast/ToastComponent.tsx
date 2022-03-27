import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToast from '@/hooks/useToast';
import { CSSTransition } from 'react-transition-group';
import { ToastType } from '@/store/modal/types/toast';
import {
  SMALL_MOBILE_SIZE,
  TABLET_SIZE,
} from '@/assets/styles/responsiveBreakPoint';

interface PropsType {
  toast: ToastType;
}

const ToastComponent = ({ toast }: PropsType) => {
  const [timeOutId, setTimeOutId] = useState(0);
  const [open, setOpen] = useState(false);
  const { closeToast } = useToast();
  const animationDuration = 400;

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      closeToast(toast.id);
    }, animationDuration);
  };

  useEffect(() => {
    setOpen(true);

    const id = setTimeout(() => {
      close();
    }, (toast.duration ?? 0) + animationDuration);

    setTimeOutId(id);

    return () => closeToast(toast.id);
  }, []);

  useEffect(() => {
    return () => clearTimeout(timeOutId);
  }, [timeOutId]);

  return (
    <ToastComponentStyle toast={toast} animationDuration={animationDuration}>
      <CSSTransition in={open} timeout={animationDuration} classNames="toast">
        <div className={`toast ${toast.type}`} onClick={close}>
          {toast.emoji ? (
            toast.emoji.includes('.svg') ? (
              <span className="emoji">
                <img src={toast.emoji} alt="emoji" />
              </span>
            ) : (
              <span className="emoji" dangerouslySetInnerHTML={{__html: toast.emoji}} />
            )
          ) : (
            ''
          )}
          <span className="msg" dangerouslySetInnerHTML={{__html: toast.msg}} />
        </div>
      </CSSTransition>
    </ToastComponentStyle>
  );
};

const ToastComponentStyle = styled.div<{
  toast: ToastType;
  animationDuration: number;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  padding: 0 16px;
  width: 100%;

  > div {
    display: inline-flex;
    margin-top: 10px;
    cursor: pointer;
    pointer-events: auto;
    opacity: 0;
    transform: translateY(-20px);

    &.toast {
      border-radius: 20px;
      padding: 10px 20px;
      font-size: 16px;
      line-height: 21px;

      &.warning {
        color: #fff;
        background-color: red;
      }

      &.success {
        color: #fff;
        background: rgba(89, 115, 255, 0.65);
        backdrop-filter: blur(20px);
      }

      .emoji {
        margin-right: 8px;
        /* img{
          width:18px;
          height: 18px;
        } */
      }

      .msg {
        vertical-align: middle;
        display: inline-block;
        color: inherit;
        word-break: break-all;
      }
    }

    &.toast-enter {
      opacity: 0;
      transform: translateY(-20px);
      &-active {
        opacity: 1;
        transform: translateY(0px);
        transition: opacity ${(props) => props.animationDuration}ms,
          transform ${(props) => props.animationDuration}ms;
      }
      &-done {
        opacity: 1;
        transform: translateY(0px);
      }
    }
    &.toast-exit {
      opacity: 1;
      transform: translateY(0px);
      &-active {
        opacity: 0;
        transform: translateY(-20px);
        transition: opacity ${(props) => props.animationDuration}ms,
          transform ${(props) => props.animationDuration}ms;
      }
    }
  }

  @media (max-width: ${TABLET_SIZE}) {
    > div {
      &.toast {
        width: 100%;
        border-radius: 8px;
        padding: 20px;

        &.warning {
          color: #fff;
        }

        &.success {
          color: #fff;
        }
      }
    }

    &.toast-enter {
      opacity: 0;
      transform: translateY(0px);
      &-active {
        opacity: 1;
        transform: translateY(20px);
        transition: opacity ${(props) => props.animationDuration}ms,
          transform ${(props) => props.animationDuration}ms;
      }
      &-done {
        opacity: 1;
        transform: translateY(20px);
      }
    }
    &.toast-exit {
      opacity: 1;
      transform: translateY(20px);
      &-active {
        opacity: 0;
        transform: translateY(0px);
        transition: opacity ${(props) => props.animationDuration}ms,
          transform ${(props) => props.animationDuration}ms;
      }
    }
  }

  @media (max-width: ${SMALL_MOBILE_SIZE}) {
    > div {
    }
  }
`;

export default ToastComponent;
