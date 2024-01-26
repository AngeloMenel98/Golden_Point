/*import styled from 'styled-components/macro';

import { h3 } from '../../utils/fontSizes';
import { mainBlue, red, white, lightGray, darkGray } from '../../utils/colors';

interface Props {
    isDangerousAction?: boolean;
}

export default styled.button<Props>`
    background-color: ${(props: { isDangerousAction: any }) =>
        props.isDangerousAction ? red : mainBlue};
    color: ${white};
    padding: 10px 20px;
    border: 1px solid
        ${(props: { isDangerousAction: any }) =>
            props.isDangerousAction ? red : mainBlue};
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    height: 40px;
    ${h3}
    &:hover {
        opacity: 0.6;
    }
    &:active {
        opacity: 0.8;
    }
    &:focus {
        box-shadow: 0px 0px 5px #106cf7;
    }
    &:disabled {
        background: ${lightGray};
        color: ${darkGray};
        border: 1px solid ${lightGray};
        cursor: default;
        &:hover {
            opacity: 1;
        }
    }
`;*/
export {};
