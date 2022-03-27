import React from 'react';
import styled from "styled-components";
import WithBackHeader from "@/views/layout/header/WithBackHeader";
import LoginForm from "@/views/components/auth/LoginForm";

const Login = () => {
    return (
        <div>
            <WithBackHeader />
            <LoginStyle>
                <h3 className="tit">휴대폰 인증이 필요해요</h3>
                <LoginForm />
            </LoginStyle>
        </div>
    );
}

const LoginStyle = styled.div`
    padding:20px 16px 16px;
    background-color: #fff;

    .tit{
        ${(props) => props.theme.text.h3}
        margin-bottom: 16px;
    }
`;

export default Login;