import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import _debounce from 'lodash/debounce';
import HomeFeedCard from '@/views/components/home/HomeFeedCard';
import { NoBorderButton } from '@/views/components/common/button/Button';
import IconPlus from '@/assets/images/icon/icon-plus.svg?component';

interface PropsType {
  list: any[];
}

const HomeFeed = ({ list }: PropsType) => {
  const scrollY = useRef(window.pageYOffset);
  const [floatBtnShow, setFloatBtnShow] = useState(true);

  const checkScrollDirection = useCallback(
    _debounce(() => {
      setFloatBtnShow(window.pageYOffset - scrollY.current < 0);
      scrollY.current = window.pageYOffset;
    }, window.pageYOffset - scrollY.current === 0 ? 0 : 100),
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', checkScrollDirection);

    return () => {
      window.removeEventListener('scroll', checkScrollDirection);
    };
  }, []);
  return (
    <HomeFeedStyle>
      {list.map((info, index) => (
        <HomeFeedCard key={index} info={info} />
      ))}

      <div className={`float-btn ${floatBtnShow ? 'show' : 'hide'}`}>
        <NoBorderButton>
          <IconPlus />
        </NoBorderButton>
      </div>
    </HomeFeedStyle>
  );
};

const HomeFeedStyle = styled.div`
  min-height: calc(100vh - 48px);
  padding: 16px;
  background-color: #f6f6f6;
  transition: transform 0.2s;

  ${HomeFeedCard} {
    margin: 12px 0;
  }

  .float-btn {
    position: fixed;
    bottom: 70px;
    right: 16px;
    z-index: 10;

    ${NoBorderButton} {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background-color: #f90a56;

      svg {
        width: 24px;
        height: 24px;
      }
    }

    &.show{
        transform: rotate(0deg) scale3d(1,1,1);
        opacity: 1;
        transition: transform cubic-bezier(0, 0.59, 0.21, 0.9) 0.2s, opacity cubic-bezier(0, 0.59, 0.21, 0.9) 0.2s;
    }

    &.hide{
        transform: rotate(359deg) scale3d(0,0,0);
        opacity: 0;
        transition: transform cubic-bezier(0, 0.59, 0.21, 0.9) 0.4s, opacity cubic-bezier(0, 0.59, 0.21, 0.9) 0.2s;
    }
  }
`;

export default HomeFeed;
