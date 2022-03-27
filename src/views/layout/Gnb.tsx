import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import IconHome from '@/assets/images/icon/icon-home.svg?component';
import IconMypage from '@/assets/images/icon/icon-human.svg?component';
import { NoBorderButton } from '../components/common/button/Button';

const Gnb = () => {
  const { pathname } = useLocation();
  return (
    <GnbStyle>
      <nav>
        <NoBorderButton
          to="/"
          color="rgba(0,0,0,0.1)"
          className={pathname === '/' ? 'active' : ''}
        >
          <IconHome className="home" />
          <span className="text">홈</span>
        </NoBorderButton>
        <NoBorderButton
          to="/mypage"
          color="rgba(0,0,0,0.1)"
          className={pathname === '/mypage' ? 'active' : ''}
        >
          <IconMypage className="mypage" />
          <span className="text">마이</span>
        </NoBorderButton>
      </nav>
    </GnbStyle>
  );
};

const GnbStyle = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  border-top: 1px solid #efefef;
  background-color: #fff;

  nav {
    display: flex;
    ${NoBorderButton} {
      display: block;
      width: 100%;
      padding: 10px 0 6px;
      text-align: center;
      border-radius: 0px;
      svg {
        width: 24px;
        height: 24px;
        &.home {
          path {
            fill: #b2b2b2;
          }
        }
        &.mypage {
          path {
            stroke: #b2b2b2;
          }
        }
      }
      span {
        display: block;
        margin-top: 4px;
        font-size: 10px;
        font-weight: 600;
        line-height: 12px;
        color: #b1b1b1;
      }

      &.active {
        svg {
          &.home {
            path {
              fill: #222;
            }
          }
          &.mypage {
            path {
              stroke: #222;
            }
          }
        }
        span {
          color: #222;
        }
      }
    }
  }
`;

export default Gnb;
