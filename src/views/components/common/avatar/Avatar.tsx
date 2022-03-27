import React from 'react';
import styled from 'styled-components';
import IconKingHat from '@/assets/images/icon/icon-kinghat.svg?component';

interface PropsType {
  className?: string;
  captain?: boolean;
}

const AvatarComp = ({ className, captain = false }: PropsType) => {
  return (
    <div className={`avatar ${className}`}>
      <div className="image">
        <img src="/images/sample/sample-user1.jpg" alt="user" />
      </div>
      {captain && (
        <span className="captain">
          <IconKingHat />
        </span>
      )}
    </div>
  );
};

const Avatar = styled(AvatarComp)`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  .image {
    width: inherits;
    height: inherits;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .captain {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    border: 1px solid #fff;
    border-radius: 50%;
    background-color: #5973ff;

    svg {
      width: 8px;
      height: 6px;
    }
  }
`;

export default Avatar;
