import React from 'react';
import styled from 'styled-components';
import Avatar from '../common/avatar/Avatar';

interface PropsType {
  list?: [];
}

const RoomMembers = ({ list }: PropsType) => {
  return (
    <RoomMembersStyle>
      <div className="list-hd">
        <span>메이트</span>
        <span>포지션</span>
      </div>
      <div className="list-bd">
        <div className="list">
          <Avatar captain />
          <div className="info">
            <b className="name">엘리님은빵먹고싶어요</b>
            <span className="nickname">게임메이트닉네임</span>
          </div>
          <div className="position">
              <img src="/images/position/pos-mid.svg" alt="mid" />
          </div>
        </div>
      </div>
    </RoomMembersStyle>
  );
};

const RoomMembersStyle = styled.div`
  padding: 24px 0;
  > div {
    padding: 0 16px;

    &.list-hd {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 26px;

      > span {
        font-size: 13px;
        line-height: 18px;
        color: #777;
      }
    }

    &.list-bd {
      .list {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 18px 0;

        .info {
          width: calc(100% - 88px);
          margin-left: 8px;
          margin-right: 8px;
          .name {
            display: block;
            margin-bottom: 4px;
            ${(props) => props.theme.text.body1}
            color:#222;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .nickname {
            display: block;
            ${(props) => props.theme.text.capton1}
            color:#777;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            &::before {
              content: '@';
            }
          }
        }

        .position{
            img{
                width: 32px;
                height: 32px;
                border-radius: 4px;
            }
        }
      }
    }
  }
`;

export default RoomMembers;
