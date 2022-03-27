import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import Ripples from 'react-ripples';
import { useLocation, useNavigate } from 'react-router-dom';

interface PropTypes
  extends React.HTMLAttributes<HTMLButtonElement | HTMLElement> {
  children: React.ReactNode;
  to?: string;
  replace?: boolean;
  ripple?: boolean;
  color?: string;
  during?: number;
  className?: string;
  disabled?: boolean;
}

const Button = ({
  children,
  to,
  replace = false,
  ripple = true,
  color,
  during,
  className,
  onClick,
  onMouseDown,
  disabled,
}: PropTypes) => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  color = color ?? 'rgba(255, 255, 255, .5)';
  during = during ?? 900;

  const clickHandler = (e: any) => {
    if(to && pathname !== to){
      navigate(to, {replace: replace});
    }else{
      onClick && onClick(e);
    }
  }

  return ripple ? (
    <Ripples
      className={`btn ${className} ${disabled ? 'disabled' : ''}`}
      color={color}
      during={during}
      onClick={clickHandler}
      onMouseDown={onMouseDown}
    >
      <button disabled={disabled}>{children}</button>
    </Ripples>
  ) : (
    <div className={`btn ${className} ${disabled ? 'disabled' : ''}`}>
      <button
        onClick={clickHandler}
        onMouseDown={onMouseDown}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};

export const BasicButton = styled(Button)`
  position: relative;
  display: inline-block;
  padding: 0 0;
  font-size: 1em;
  line-height: 1.5em;
  text-align: center;
  border-radius: 4px;
  border: 1px solid #ddd;

  > button {
    min-width: inherit;
    min-height: inherit;
    width: inherit;
    height: inherit;
    color: inherit;
  }
`;

export const NoBorderButton = styled(BasicButton)`
  border: none;
`;

export const RedButton = styled(BasicButton)`
  color: #fff;
  background-color: #F90A56;
  border: 1px solid #F90A56;
  border-radius: 8px;
  transition: background-color 0.2s;

  > button {
    color: #fff;
  }

  &.disabled{
    background-color: #FFE0EA;
    border: 1px solid #FFE0EA;
  }
`;

export const BlackButton = styled(BasicButton)`
  color: #fff;
  background-color: #000000;
  border: 1px solid #000000;
  border-radius: 8px;
  transition: background-color 0.2s;

  > button {
    color: #fff;
  }

  &.disabled{
    background-color: #EFEFEF;
    border: 1px solid #EFEFEF;
  }
`;

export default BasicButton;
