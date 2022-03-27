import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import gameData, { ConvertGameDataType } from '@/data/gameData';
import iconHumanFill from '@/assets/images/icon/icon-human-fill.svg';
import iconLock from '@/assets/images/icon/icon-lock.svg';
import { useNavigate } from 'react-router-dom';

interface PropsType {
  info: any;
  className?: string;
}

const HomeFeedCardComp = ({ info, className }: PropsType) => {
  const navigate = useNavigate();
  const [data, setData] = useState<ConvertGameDataType | null>(null);

  const moveRoom = (id: string | number) => {
    navigate(`/mate-room/${id}`);
  };

  useEffect(() => {
    const gameId = info.gameId;
    const gameName = gameData[info.gameId].name;
    const gameLogo = gameData[info.gameId].logo;

    setData({ ...info, gameName, gameLogo });
  }, []);

  return (
    data && (
      <div className={`home-feed-card ${className}`} onClick={() => moveRoom(0)}>
        <div className="hd">
          <img src={data.gameLogo} alt={data.gameName} className="logo" />
          <span className="name">{data.gameName}</span>
          <span className="type">{data.gameType}</span>
        </div>
        <div className="bd">
          <h4 className="tit">{data.title}</h4>
          <p className="desc" dangerouslySetInnerHTML={{ __html: data.desc }} />
        </div>
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
        <div className="ft">
          <span
            className={`limit-cnt ${data.isPrivate ? 'private' : ''}`}
          >{`${data.inManCnt}/${data.totalManCnt}`}</span>
          <span className="create-at">30분전</span>
        </div>
      </div>
    )
  );
};

const HomeFeedCard = styled(HomeFeedCardComp)`
  padding: 20px;
  background-color: #fff;
  box-shadow: -1px -1px 20px rgba(0, 0, 0, 0.03),
    30px 30px 46px rgba(132, 132, 132, 0.03);
  border-radius: 8px;
  transition: background-color 0.2s;

  &:active {
    background-color: #f6f6f6;
  }

  .hd {
    > * {
      display: inline-block;
      vertical-align: middle;
    }

    > span {
      font-size: 12px;
      line-height: 18px;
    }

    .name {
      margin: 0 4px;
      font-weight: 600;
      color: #222;
    }

    .type {
      font-weight: 400;
      color: #5973ff;
    }
  }

  .bd {
    margin-top: 8px;
    margin-bottom: 16px;

    .tit {
      ${(props) => props.theme.text.h4}
      margin-bottom: 8px;
      font-weight: 600;
      color: #222;
    }

    .desc {
      ${(props) => props.theme.text.body2}
      color:#444;
    }
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

  .ft {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > span {
      ${(props) => props.theme.text.capton1}
      color:#777;

      &.limit-cnt {
        padding-left: 17px;
        background-image: url(${iconHumanFill});
        background-repeat: no-repeat;
        background-size: 12px;
        background-position: left center;

        &.private {
          background-image: url(${iconLock});
        }
      }
    }
  }
`;

export default HomeFeedCard;
