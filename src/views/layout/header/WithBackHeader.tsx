import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import IconBackArrow from '@/assets/images/icon/icon-backarrow.svg?component';
import { NoBorderButton } from '@/views/components/common/button/Button';
import IconMore from '@/assets/images/icon/icon-more.svg?component';
import useModal from '@/hooks/useModal';
import MateRoomMoreModal from '@/views/components/mateRoom/modal/MateRoomMoreModal';

interface PropsType {
  more?: boolean;
}

const WithBackHeader = ({ more = false }: PropsType) => {
  const navigate = useNavigate();
  const {openModal} = useModal();

  const goBack = () => {
    navigate(-1);
  };

  const moreModalOpen = useCallback(() => {
    openModal(MateRoomMoreModal);
  }, [more]);

  return (
    <WithBackHeaderStyle>
      <div className="cont">
        <div className="left">
          <NoBorderButton
            className="search"
            color="rgba(0, 0, 0, .3)"
            onClick={goBack}
          >
            <IconBackArrow />
          </NoBorderButton>
        </div>
        <div className="btn-cont">
          {more ? (
            <NoBorderButton className="more" color="rgba(0, 0, 0, .3)" onClick={moreModalOpen}>
              <IconMore />
            </NoBorderButton>
          ) : (
            ''
          )}
        </div>
      </div>
    </WithBackHeaderStyle>
  );
};

const WithBackHeaderStyle = styled.div`
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

    .left {
      margin-left: -10px;
      ${NoBorderButton} {
        width: 44px;
        height: 44px;
        border-radius: 50%;

        svg {
          width: 24px;
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

        &.more {
          width: 24px;
        }
      }
    }
  }
`;

export default WithBackHeader;
