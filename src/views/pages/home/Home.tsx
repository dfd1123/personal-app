import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '@/store';
import useModal from '@/hooks/useModal';
import useToast from '@/hooks/useToast';
import { homeListData } from '@/data/mockData';
import OneDepthHeader from '@/views/layout/header/OneDepthHeader';
import Nodata from '@/views/components/common/NoData';
import { RedButton } from '@/views/components/common/button/Button';
import PurposeLoginModal from '@/views/components/home/modal/PurposeLoginModal';
import EmojiFire from '@/assets/images/emoji/emoji-fire.svg';
import HomeFeed from '@/views/components/home/HomeFeed';
import Gnb from '@/views/layout/Gnb';

const Home = () => {
  const { openModal } = useModal();
  const { toast } = useToast();
  const isLogin = useTypedSelector((state) =>
    Boolean(state.authSlice.user?.id)
  );

  const mockData = homeListData;

  useEffect(() => {
    if (!isLogin) {
      openModal(PurposeLoginModal, {
        animation: { class: 'fade', duration: 100 },
      });
    } else {
      setTimeout(() => {
        toast('반가워요!<br />이제 GAME MATE를 시작해볼까요?', {
          type: 'success',
          emoji: EmojiFire,
        });
      }, 300);
    }
  }, [isLogin]);

  return (
    <div>
      <OneDepthHeader titList={['전체 매칭', '나의 매칭']} search alarm />
      <HomeContentStyle>
        {mockData.length ? (
          <HomeFeed list={mockData} />
        ) : (
          <Nodata
            msg="아직 생성된 매칭이 없습니다."
            subMsg="첫 메이트를 만들어볼까요?"
          >
            {!isLogin && <RedButton>매칭 만들기</RedButton>}
          </Nodata>
        )}
      </HomeContentStyle>
      <Gnb />
    </div>
  );
};

const HomeContentStyle = styled.div`
  ${Nodata} {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: calc(85vh - 48px);

    ${RedButton} {
      width: 144px;
      height: 40px;
      button {
        ${(props) => props.theme.text.body1}
      }
    }
  }
`;

export default Home;
