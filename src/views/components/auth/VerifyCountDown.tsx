import React, { RefObject, useEffect, useState } from 'react';
import styled from 'styled-components';
import { fillZero } from '@/utils/numberUtils';
import BasicButton from '@/views/components/common/button/Button';

interface PropsType {
  initialTime?: number;
  className?: string;
  onResend?: () => void;
  onEnd?: () => void;
}

const VerifyCountDownComp = ({
  initialTime = 180,
  className,
  onResend,
  onEnd,
}: PropsType) => {
  const min = fillZero(2, Math.floor(initialTime / 60));
  const sec = fillZero(2, initialTime % 60);

  const [intervalId, setIntervalId] = useState(0);
  const [showTime, setShowTime] = useState(`${min}:${sec}`);

  const requestVerify = () => {
    onResend && onResend();
  };

  useEffect(() => {
    const id = setInterval(() => {
      const min = fillZero(2, Math.floor(initialTime / 60));
      const sec = fillZero(2, initialTime % 60);
      initialTime = initialTime - 1;

      setShowTime(`${min}:${sec}`);

      if (initialTime < 0) {
        clearInterval(id);
        initialTime = 180;
        onEnd && onEnd();
      }
    }, 1000);

    setIntervalId(id);
  }, []);

  useEffect(() => {
    return () => {
        clearInterval(intervalId);
    };
  }, [intervalId])

  return (
    <div className={className}>
      <span className="timer">{showTime}</span>
      <BasicButton className="resend-btn" onMouseDown={requestVerify}>
        재전송
      </BasicButton>
    </div>
  );
};

const VerifyCountDown = styled(VerifyCountDownComp)`
  .timer {
    font-size: 13px;
    line-height: 18px;
    color: #f90a56;
  }

  ${BasicButton} {
    margin-left: 4px;
    padding: 5px 13px;
    background-color: #feeff4;
    border: 1px solid #feeef4;
    border-radius: 4px;
    button {
      font-size: 13px;
      line-height: 18px;
      color: #f90a56;
    }
  }
`;

export default VerifyCountDown;
