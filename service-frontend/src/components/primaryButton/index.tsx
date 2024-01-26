import PropTypes from 'prop-types';
import { useReducer } from 'react';
import LogInIcon from '../../images/icons/LogIn/LogIn';
import './PrimaryButton.tsx';
import './style.css';

interface Props {
    hasRightIcon?: boolean;
    hasText?: boolean;
    hasLeftIcon?: boolean;
    text?: string;
    stateProp: 'primary' | 'hover';
    onClick?: () => void;
}

export const PrimaryButton = ({
    hasRightIcon = true,
    hasText = true,
    hasLeftIcon = false,
    text = 'Button',
    stateProp,
    onClick,
}: Props): JSX.Element => {
    const [state, dispatch] = useReducer(reducer, {
        state: stateProp || 'primary',
    });

    return (
        <button
            className={`button ${state.state}`}
            onClick={onClick}
            onMouseLeave={() => {
                dispatch('mouse_leave');
            }}
            onMouseEnter={() => {
                dispatch('mouse_enter');
            }}
        >
            {hasRightIcon && <LogInIcon />}

            {hasText && <div className="text-wrapper">{text}</div>}
        </button>
    );
};

function reducer(state: any, action: any) {
    switch (action) {
        case 'mouse_enter':
            return {
                ...state,
                state: 'hover',
            };

        case 'mouse_leave':
            return {
                ...state,
                state: 'primary',
            };
    }

    return state;
}

PrimaryButton.propTypes = {
    hasRightIcon: PropTypes.bool,
    hasText: PropTypes.bool,
    hasLeft: PropTypes.bool,
    text: PropTypes.string,
    stateProp: PropTypes.oneOf(['primary', 'hover']),
    onClick: PropTypes.func,
};

export default PrimaryButton;
