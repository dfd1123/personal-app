import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import WithBackHeader from "@/views/layout/header/WithBackHeader";
import RoomInfo from "@/views/components/mateRoom/RoomInfo";
import RoomMembers from "@/views/components/mateRoom/RoomMembers";
import { homeListData } from "@/data/mockData";
import { ConvertGameDataType } from "@/data/gameData";
import FooterButton from "@/views/components/common/FooterButton";

const MateRoom = () => {
    const { id } = useParams();
    const [roomInfo, setRoomInfo] = useState<ConvertGameDataType | null>(null);

    useEffect(() => {
       if (id) setRoomInfo(homeListData[Number(id)]);
    }, []);
    
    return (
        <div>
            <WithBackHeader more />
            <MateRoomStyle>
                <RoomInfo info={roomInfo} />
                <RoomMembers /> 
            </MateRoomStyle>
            <FooterButton type="red">
                참가하기
            </FooterButton>
        </div>
    );
}

const MateRoomStyle = styled.div`

`;

export default MateRoom;