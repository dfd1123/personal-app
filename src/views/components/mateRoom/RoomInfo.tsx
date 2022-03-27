import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import gameData, { ConvertGameDataType } from '@/data/gameData';

interface PropsType {
  info: ConvertGameDataType | null;
}

const RoomInfo = ({ info }: PropsType) => {
  const [data, setData] = useState<ConvertGameDataType | null>(null);

  useEffect(() => {
    if (info) {
      const gameId = info.gameId;
      const gameName = gameData[info.gameId].name;
      const gameLogo = gameData[info.gameId].logo;

      setData({ ...info, gameName, gameLogo });
    }
  }, [info]);
  return (
    data && (
      <RoomInfoStyle>
        <div className="hd">
          <span className="label">{data.isPrivate ? '비공개' : '공개'}</span>
          <h2 className="tit">{data.title}</h2>
          <div className="sub-cont">
            <span className="sub">{data.gameName}</span>
            <span className="sub">{data.gameType}</span>
            <span className="sub">30분전</span>
          </div>
        </div>
        <div className="bd">
          <p className="desc" dangerouslySetInnerHTML={{ __html: data.desc }} />
          {data.positions && (
            <div className="position">
              <span className="label">찾는 포지션</span>
              <div>
                {data.positions.map((pos, idx) => (
                  <img
                    key={pos + idx}
                    src={`/images/position/pos-${pos}.svg`}
                    alt={pos}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </RoomInfoStyle>
    )
  );
};

const RoomInfoStyle = styled.div`
  padding: 16px;
  border-bottom: 10px solid #f8f8f8;

  .hd {
    padding-bottom: 20px;
    border-bottom: 1px solid #efefef;
    .label {
      padding: 3px 8px;
      ${(props) => props.theme.text.capton2}
      color:#777;
      background-color: #f6f6f6;
      border-radius: 40px;
    }

    .tit {
      margin: 6px 0;
      font-size: 24px;
      line-height: 32px;
      color: #222;
    }

    .sub-cont {
      span {
        display: inline-block;
        vertical-align: middle;
        ${(props) => props.theme.text.capton1}
        color:#777;

        &::after {
          content: '';
          display: inline-block;
          vertical-align: middle;
          width: 2px;
          height: 2px;
          margin: 0 6px;
          background-color: #ccc;
          border-radius: 50%;
        }

        &:last-child {
          &::after {
            display: none;
          }
        }
      }
    }
  }

  .bd {
    padding: 20px 0 8px;
    .desc {
      ${(props) => props.theme.text.body2}
      color:#222;
    }

    .position {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 16px 0 18px;
      padding: 14px;
      background-color: #f8f8f8;
      border: 1px solid #efefef;
      border-radius: 8px;

      .label {
        padding: 3px 8px;
        background: rgba(89, 115, 255, 0.08);
        border-radius: 40px;
        ${(props) => props.theme.text.capton2}
        color:#5973FF;
      }

      img {
        margin-left: 8px;
        border-radius: 4px;
      }
    }
  }
`;

export default RoomInfo;
