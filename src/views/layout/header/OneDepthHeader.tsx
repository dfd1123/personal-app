import React from 'react';
import styled from 'styled-components';
import IconSearch from '@/assets/images/icon/icon-search.svg?component';
import IconAlarm from '@/assets/images/icon/icon-alarm.svg?component';
import { NoBorderButton } from '@/views/components/common/button/Button';
import Tab from '@/views/components/common/tab/Tab';

interface PropsType {
  title?: string;
  titList?: string[];
  search?: boolean;
  alarm?: boolean;
}

const OneDepthHeader = ({
  title,
  titList = [],
  search = false,
  alarm = false,
}: PropsType) => {
  return (
    <HeaderStyle>
      <div className="cont">
        {titList.length ? (
          <Tab list={titList} ripple={false} />
        ) : (
          <div className="tit">{title || 'title'}</div>
        )}
        <div className="btn-cont">
          {search ? (
            <NoBorderButton className="search" color="rgba(0, 0, 0, .3)">
              <IconSearch />
            </NoBorderButton>
          ) : (
            ''
          )}
          {alarm ? (
            <NoBorderButton className="alarm" color="rgba(0, 0, 0, .3)">
              <IconAlarm />
            </NoBorderButton>
          ) : (
            ''
          )}
        </div>
      </div>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: #fff;
  .cont {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    padding: 0 16px;
    .tit {
      ${(props) => props.theme.text.h3}
    }
    ${Tab} {
      > div {
        margin-right: 6px;
        margin-left: -10px;
        padding: 10px 10px;
        background-color: #fff;
        button {
          ${(props) => props.theme.text.h3}
          color:#B1B1B1;
          transition: color 0.15s;
        }

        &.active {
          button {
            color: #222;
          }
        }
      }
    }
    .btn-cont {
      margin-right: -12px;
      ${NoBorderButton} {
        width: 20px;
        padding: 12px;
        box-sizing: content-box;
        border-radius: 50%;

        &.alarm {
          width: 18px;
        }
      }
    }
  }
`;

export default OneDepthHeader;
