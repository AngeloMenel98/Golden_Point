import React from 'react';
import { PulseLoader } from 'react-spinners';
import styled from 'styled-components';

import { mainBlue } from '../../utils/colors';
import PrimaryButton from './PrimaryButton';

import PropTypes from 'prop-types';
import LogInIcon from '../../images/icons/LogIn/LogIn';

const AsyncButtonPlaceholder = styled.div`
    height: 40px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

interface AsyncMainButtonProps {
    isLoading: boolean;
    children: React.ReactNode;
    isDangerousAction?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

export default ({
    isLoading,
    children,
    isDangerousAction,
    onClick,
    type,
    disabled,
}: AsyncMainButtonProps) =>
    isLoading ? (
        <AsyncButtonPlaceholder>
            <PulseLoader color={mainBlue} size="10px" />
        </AsyncButtonPlaceholder>
    ) : (
        <PrimaryButton
            disabled={disabled}
            onClick={onClick}
            type={type ?? 'submit'}
            isDangerousAction={isDangerousAction}
        >
            {children}
        </PrimaryButton>
    );
