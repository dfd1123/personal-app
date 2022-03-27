import React from 'react';
import styled from 'styled-components';

interface PropsType {
  msg: string;
  subMsg?: string;
  children?: React.ReactNode;
  className?: string;
}

const NoData = ({ msg, subMsg, children, className }: PropsType) => {
  return (
    <div className={className}>
      <strong className="main">{msg}</strong>
      <span className="sub">{subMsg}</span>
      {children ? (
          <div className="btn-cont">
              {children}
          </div>
      ) : ('')}
    </div>
  );
};

const NodataStyle = styled(NoData)`
  text-align: center;
  .main {
    ${(props) => props.theme.text.h3}
    display: block;
    margin-bottom: 4px;
  }
  .sub {
    ${(props) => props.theme.text.body1}
    display: block;
    color: #777;
  }
  .btn-cont{
      margin-top: 28px;
  }
`;

export default NodataStyle;
