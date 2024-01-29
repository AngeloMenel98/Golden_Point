import styled from 'styled-components/macro';

import { h3 } from '../../utils/fontSizes';
import { mainBlue, red, white, lightGray, darkGray } from '../../utils/colors';

export default styled.button<{ isDangerousAction?: boolean }>`
    background-color: ${(props) => (props.isDangerousAction ? red : mainBlue)};
    color: ${white};
    padding: 10px 20px;
    border: 1px solid ${(props) => (props.isDangerousAction ? red : mainBlue)};
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
`;
/*.button {
    all: unset;
    align-items: center;
    background-color: var(--mainblue);
    border-radius: 5px;
    box-sizing: border-box;
    display: inline-flex;
    gap: 27px;
    overflow: hidden;
    padding: 5px 18px;
    position: relative;
  }
  
  .button .icon-login {
    height: 30px !important;
    position: relative !important;
    width: 30px !important;
  }
  
  .button .text-wrapper {
    color: var(--white);
    font-family: var(--h3-font-family);
    font-size: var(--h3-font-size);
    font-style: var(--h3-font-style);
    font-weight: var(--h3-font-weight);
    letter-spacing: var(--h3-letter-spacing);
    line-height: var(--h3-line-height);
    position: relative;
    text-align: center;
    white-space: nowrap;
    width: fit-content;
  }
  
  .button.primary {
    background-color: var(--mainblue);
  }
  
  .button.hover {
    background-color: #6789cb;
  }*/
