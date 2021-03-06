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
        ๋ฐ๊ฐ์์ ๐๐ป
        <br />
        ์ฐ๋ฆฌ ๋ ์นํด์ ธ์!
      </h3>
      <p className="sub-intro">๋ ํธํ๊ณ  ๋น ๋ฅด๊ฒ ๊ฒ์ ๋ฉ์ดํธ๋ฅผ ์ฐพ์๋ด์.</p>
      <div className="btn-cont">
        <RedButton onClick={moveLoginPage}>๊ฐํธ ๋ก๊ทธ์ธ ํ๊ธฐ</RedButton>
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
