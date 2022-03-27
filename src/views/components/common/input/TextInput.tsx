import React, { useState, useRef } from "react";
import styled from "styled-components";
import BasicResetClose from "@/assets/images/icon/icon-circle-cancel.svg?component";
import VerifyCountDown from "@/views/components/auth/VerifyCountDown";

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  reset?: boolean;
  number?:boolean;
  verify?: boolean;
  error?:boolean;
  errorMsg?: string;
  autocomplete?:'on'|'off';
  onEnter?: (value : any , name?: any) => void;
  onInput?: (value : any , name?: any) => void;
  onChange?: (value : any , name?: any) => void;
  onResend?: () => void;
  onVerifyEnd?: () => void;
}

const TextInput = ({
  label,
  className,
  type = "text",
  name,
  value = '',
  maxLength = 99999,
  placeholder = "",
  readOnly = false,
  disabled = false,
  reset = false,
  error = false,
  errorMsg,
  number = false,
  verify = false,
  autoComplete = 'off',
  onEnter,
  onInput,
  onChange,
  onClick,
  onResend,
  onVerifyEnd
}: PropsType) => {
  const isSearch = type === "search";
  const input = useRef<HTMLInputElement>(null);
  const [text, setText] = useState(value || '');
  const [focus, setFocus] = useState(false);

  const handleEnter = () => {
    if (!onEnter) return;

    if (input.current) {
      const {value, name} = input.current;
      if (onEnter) {
        onEnter(value, name);
        return;
      }
    }
    onEnter('');
  };

  const toggleFocus = (status: boolean) => {
    setFocus(status);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEnter();
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let {value, name} = e.target;
    if(number) {
      value = value.replace(/[^0-9]/g,'');
    }
    if(maxLength){
      value = value.substring(0, maxLength);
    }
    setText(value);
    if (onChange) onChange(value, name);
    if (onInput) onInput(value, name);
  };

  const handleReset = () => {
    if (input.current) {
      input.current.value = "";
      const {value, name} = input.current;
      setText('');
      if (onChange) onChange("", name);
    }
  };

  return (
    <div className={className}>
      <div className={`inp-box ${isSearch ? "search" : ""} ${focus ? "focus" : ""} ${String(text) ? "value" : ""} ${reset ? "reset" : ""} ${disabled ? 'disabled' : ''} ${error ? 'error' : ''} ${verify ? 'verify' : ''}`}>
        <div className="inp-cont">
          <input
            ref={input}
            type={type}
            name={name}
            value={value || text}
            placeholder={placeholder}
            readOnly={readOnly}
            disabled={disabled}
            autoComplete={autoComplete}
            onKeyPress={handleKeyPress}
            onChange={handleValueChange}
            onInput={handleValueChange}
            onFocus={() => toggleFocus(true)}
            onBlur={() => toggleFocus(false)}
            onClick={onClick}
          />
          <div className="btn-cont">
            {verify ? (
              <VerifyCountDown initialTime={180} onResend={onResend} onEnd={onVerifyEnd} />
            ) : ('')}
            {text && reset ? (
              <button className="reset" onMouseDown={handleReset} >
                <BasicResetClose />
              </button>
            ) : (
              ""
            )}
            {isSearch ? <button className="search" onMouseDown={handleEnter} /> : ""}
          </div>
        </div>
        {label ? <label htmlFor={name}>{label}</label> : ""}
      </div>
      {errorMsg ? (<span className="error-msg">{errorMsg}</span>):('')}
    </div>
  );
};

export const BasicInput = styled(TextInput)`
  display:inline-block;
  .inp-box{
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    width: inherit;
    height: inherit;
    padding:14px 16px 15px;
    border: 1px solid #f8f8f8;
    border-radius: 8px;
    background-color: #f8f8f8;
    transition: border 0.15s, background-color 0.15s;

    &.focus, &.verify{
      border: 1px solid #000000;
      background-color: #fff;

      &.verify{
        border: 1px solid #000000;
        background-color: #fff;
      }
    }

    &.value{
      border: 1px solid #ddd;
      background-color: #fff;

      &.verify{
        border: 1px solid #ddd;
        background-color: #fff;
      }
    }

    &.error{
      border: 1px solid #DD250D;
    }

    /* &.disabled{
      border: 1px solid #ddd;
      background-color: #fff;
    } */

    .inp-cont {
      position: relative;
    }

    label {
      display: block;
      margin-bottom: 3px;
      padding-left:0px;
      font-size:13px;
      line-height: 18px;
      color:#777;
    }
    input {
      box-sizing: border-box;
      width: 100%;
      font-size: 18px;
      line-height: 22px;
      border:none;
      outline:transparent;
      background-color: transparent;

      &::placeholder{
        color:#ccc;
      }
    }

    .btn-cont {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      display: flex;
      align-items: center;
      height: 100%;
      > button {
        height:100%;
        &:last-child {
          margin-right: 0;
        }
        &::after {
          content: "";
          display: block;
          width: 15px;
          height: 15px;
          background-position: center;
          background-size: 100%;
          background-repeat: no-repeat;
        }
      }
      .reset {
        display: block;
        svg{
          width:24px;
          height:24px;
        }
      }

      .search {
        /* opacity: 0.4; */
        &::after {
          width: 28px;
          height: 28px;
        }
      }

      ${VerifyCountDown}{
        visibility: visible;
      }
    }

    &.focus {
      .btn-cont {
        .reset {
          display: block;
        }
        ${VerifyCountDown}{
          visibility: visible;
        }
      }

      &.value{
        .btn-cont {
          ${VerifyCountDown}{
            visibility: hidden;
          }
        }
      }
    }

    &.value{
      .btn-cont {
        ${VerifyCountDown}{
          visibility: visible;
        }
      }
    }

    &.reset {
      &.focus {
        input {
          padding-right: 30px;
        }
        &.search {
          input {
            padding-right: 60px;
          }
        }
      }
    }

    &.search {
      input {
        padding-right: 50px;
      }
    }

    &.verify{
      input {
        padding-right: 100px;
      }
    }
  }

  .error-msg{
    margin-top:8px;
    padding: 0 2px;
    font-size: 14px;
    line-height: 18px;
    color:#DD250D;
  }
`;

export const MerterialInput = styled(BasicInput)`
  position: relative;

  label {
    position: absolute;
    top: 0;
    left: 5px;
    z-index: 1;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 3px 5px;
    pointer-events: none;
    transition: font-size 0.2s, top 0.2s;
    font-size: 1em;
    transform: translate(0px, 0px);
  }

  input {
    &::-webkit-input-placeholder,
    &:-moz-placeholder,
    &::-moz-placeholder,
    &:-ms-input-placeholder {
      color: transparent;
    }
    &::-ms-clear,
    &::-ms-reveal {
      display: none;
      width: 0;
      height: 0;
    }
    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      display: none;
    }
  }

  &.focus-value {
    label {
      height: auto;
      font-size: 0.5em;
      top: -7px;
      /* left: 0; */
      background-color: #fff;
    }
  }
`;

export default BasicInput;
