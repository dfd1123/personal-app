import React from 'react';
import styled from 'styled-components';
import { BottomModalStyle } from '@/views/components/common/modal/ModalTemplate';
import { ModalComponentPropsType } from '@/store/modal/types/modal';
import { NoBorderButton } from '../../common/button/Button';
import useToast from '@/hooks/useToast';

interface PropsType extends ModalComponentPropsType {}

const MateRoomMoreModal = ({ close, resolve }: PropsType) => {
    const {toast} = useToast();

    const urlCopy = () => {
        let url = '';
        const textarea = document.createElement("textarea");
        document.body.appendChild(textarea);
        url = window.document.location.href;
        textarea.value = url;
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
    
        toast('현재 url 링크 주소가 복사 되었습니다.', {type: 'success'});
      }

      
  return (
    <MateRoomMoreModalStyle close={close}>
      <NoBorderButton color="rgba(0,0,0,0.1)">수정</NoBorderButton>
      <NoBorderButton color="rgba(0,0,0,0.1)">삭제</NoBorderButton>
      <NoBorderButton color="rgba(0,0,0,0.1)" onClick={urlCopy}>링크 복사</NoBorderButton>
    </MateRoomMoreModalStyle>
  );
};

const MateRoomMoreModalStyle = styled(BottomModalStyle)`
    .cont {
    padding: 16px;
    padding-top: 40px;

    ${NoBorderButton}{
        width:100%;
        height: 50px;
        border-radius: 0;

        button{
            ${(props) => props.theme.text.body1}
            color:#444;
        }
    }
  }
`;

export default MateRoomMoreModal;
