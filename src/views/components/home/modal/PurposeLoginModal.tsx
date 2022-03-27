import React from 'react';
import styled from 'styled-components';
import { BottomModalStyle } from '@/views/components/common/modal/ModalTemplate';
import { ModalComponentPropsType } from '@/store/modal/types/modal';
import { RedButton } from '@/views/components/common/button/Button';
import { useNavigate } from 'react-router-dom';

interface PropsType extends ModalComponentPropsType {
  initialFocusedDate?: string;
}

const PurposeLoginModal = ({ close, resolve }: PropsType) => {
    const navigate = useNavigate();

    const moveLoginPage = () => {
        navigate('/login')
    }

  return (
    <PurposeLoginModalStyle close={close}>
      <h3 className="main-intro">
        반가워요 👋🏻
        <br />
        우리 더 친해져요!
      </h3>
      <p className="sub-intro">더 편하고 빠르게 게임 메이트를 찾아봐요.</p>
      <div className="btn-cont">
        <RedButton onClick={moveLoginPage}>간편 로그인 하기</RedButton>
      </div>
    </PurposeLoginModalStyle>
  );
};

const PurposeLoginModalStyle = styled(BottomModalStyle)`
  .cont {
    padding: 16px;
    padding-top: 40px;
    transform: translateY(220px);

    .main-intro {
      ${(props) => props.theme.text.h3}
      margin-bottom: 6px;
      color: #222;
    }

    .sub-intro {
      ${(props) => props.theme.text.body2}
      color:#777;
    }

    .btn-cont {
      margin-top: 40px;

      ${RedButton} {
        width: 100%;
        height: 48px;

        button {
          ${(props) => props.theme.text.body1}
        }
      }
    }
  }

  &.fade-enter-done {
    .cont {
      transition: transform ease-out 0.1s 0.25s;
      transform: translateY(0px);
    }
  }
`;

export default PurposeLoginModal;
