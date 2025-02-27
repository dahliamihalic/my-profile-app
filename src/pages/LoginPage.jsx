import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../components/Wrapper';
import AuthForm from '../components/AuthForm';
import { ModeContext, ModeProvider } from '../contexts/ModeContext';

const Login = () => {
    return (
        <ModeProvider>
            <Wrapper>
                <AuthForm isRegister={false} />
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </Wrapper>
        </ModeProvider>
    );
}



export default Login;