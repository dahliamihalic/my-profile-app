import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../components/Wrapper';
import AuthForm from '../components/AuthForm';

const Register = () => {
    return(
        <Wrapper>
            <AuthForm isRegister={true} />
        </Wrapper>
    );
}

export default Register;