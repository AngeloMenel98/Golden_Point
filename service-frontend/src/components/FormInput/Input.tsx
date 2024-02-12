import styled from 'styled-components';

import {
    lightGray,
    red,
    white,
    black,
    mainBlue,
    darkGray,
    gray,
} from '../../utils/colors';
import { hexToRgb } from '../../utils/helpers';
import { paragraph } from '../../utils/fontSizes';

export interface InputProps {
    hasError?: boolean;
}

export default styled.input<InputProps>`
    background-color: ${white};
    ${paragraph};
    padding: 10px;
    height: 40px;
    box-sizing: border-box;
    border-radius: 5px;
    border: ${(props) =>
        props.hasError ? `1px solid ${red}` : `1px solid ${lightGray}`};
    background-color: ${(props) =>
        props.hasError ? hexToRgb(red, '0.1') : white};
    color: ${black};
    &:focus {
        border: 1px solid ${mainBlue};
        box-shadow: 0px 0px 5px #618cb3;
    }
    &:active {
        border: 1px solid ${mainBlue};
    }
    &:hover {
        background-color: ${gray};
        border: 1px solid ${lightGray};
    }
    &:disabled {
        ${paragraph};
        background: ${lightGray};
        color: ${darkGray};
        border: 1px solid ${lightGray};
        cursor: default;
    }
    ::placeholder {
        opacity: 0.6;
    }
`;
