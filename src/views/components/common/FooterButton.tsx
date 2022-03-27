import React from 'react';
import styled from 'styled-components';
import { BlackButton, RedButton } from './button/Button';
interface PropTypes extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?:string;
  className?: string;
  disabled?: boolean;
}

const FooterButtonComp = ({ children, type = 'black', className, disabled = false, onClick }: PropTypes) => {
  let buttonComp = null;

  switch (type) {
    case 'black':
      buttonComp = (<BlackButton disabled={disabled} onClick={onClick}>{children}</BlackButton>)
      break;

    case 'red':
      buttonComp = (<RedButton disabled={disabled} onClick={onClick}>{children}</RedButton>)
      break;
    default:
      buttonComp = (<BlackButton disabled={disabled} onClick={onClick}>{children}</BlackButton>)
      break;
  }
  return (
    <div className={className}>
      {buttonComp}
    </div>
  );
};

const FooterButton = styled(FooterButtonComp)`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  width:100%;
  padding: 16px 16px;
  background-color:#fff;
  border:none;

  .btn{
    width:100%;
    height: 48px;
    border-radius: 8px;
  }
`;

export default FooterButton;
