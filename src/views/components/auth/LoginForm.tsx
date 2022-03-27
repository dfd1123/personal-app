import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useService from '@/hooks/useService';
import useToast from '@/hooks/useToast';
import BasicInput from '@/views/components/common/input/TextInput';
import FooterButton from '@/views/components/common/FooterButton';
import EmojiTalkBalloon from '@/assets/images/emoji/emoji-talkbaloon.svg';

const initialInput = {
  tel: '',
  code: '',
};

const LoginForm = () => {
  const navigate = useNavigate();
  const services = useService();
  const {toast} = useToast();
  const [inputs, setInputs] = useState(initialInput);
  const [sendSms, setSendSms] = useState(false);
  let confirming = false;
  // const [error, setError]

  const changeInputs = (value: string | number, name: string) => {
    setInputs({ ...inputs, [name]: value });
    if(name === 'code') verifyConfirm(String(value));
  };

  const sendSmsRequest = useCallback(async () => {
    await services.user.sendSmsVerify(inputs.tel);
    if (!sendSms) {
      setSendSms(true);
      toast('인증번호가 문자로 전송됐어요.', {type: 'success', emoji: EmojiTalkBalloon});
    }
  }, [inputs, sendSms]);

  const reSendSmsRequest = useCallback(async () => {
    const result = await services.user.reSendSmsVerify(inputs.tel);

    if (result.code !== -1001) {
      setSendSms(false);
      setTimeout(() => {
        setSendSms(true);
      }, 2);
    } else {
      if (!sendSms) {
        setSendSms(true);
        toast('인증번호가 문자로 재전송됐어요.', {type: 'success', emoji: EmojiTalkBalloon});
      }
    }
  }, [inputs, sendSms]);

  const verifyTimeOut = useCallback(() => {
    setSendSms(false);
  }, []);

  const verifyConfirm = async (value: string) => {
    if (value.length === 6 && !confirming) {
      confirming = true;
      const { authToken, wrongCode } = await services.user.smsVerifyConfirm({tel: inputs.tel, code: value});
      confirming = false;
      if (authToken) {
        navigate(-1);
      }else{
        toast('인증번호가 일치하지 않습니다.');
        changeInputs('', 'code');
      }
    }
  };

  return (
    <LoginFormStyle>
      <div className="form">
        <BasicInput
          number
          type="tel"
          name="tel"
          label="휴대폰 번호"
          value={inputs.tel}
          placeholder="01012345678"
          maxLength={11}
          reset
          onChange={changeInputs}
        />
        <BasicInput
          type="number"
          name="code"
          label="인증번호"
          value={inputs.code}
          placeholder="6자리를 입력해주세요."
          maxLength={6}
          verify={sendSms}
          disabled={!sendSms}
          reset
          onInput={changeInputs}
          onVerifyEnd={verifyTimeOut}
          onResend={reSendSmsRequest}
        />
      </div>
      {sendSms ? (
        <FooterButton
          type="black"
          disabled={inputs.code.length !== 6}
          onClick={() => verifyConfirm(inputs.code)}
        >
          시작하기
        </FooterButton>
      ) : (
        <FooterButton
          type="black"
          disabled={inputs.tel.length !== 11}
          onClick={sendSmsRequest}
        >
          인증번호 받기
        </FooterButton>
      )}
    </LoginFormStyle>
  );
};

const LoginFormStyle = styled.div`
  position: relative;

  .form {
    ${BasicInput} {
      width: 100%;
      margin-bottom: 12px;
    }
  }
`;

export default LoginForm;
