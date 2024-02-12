import React, { HTMLProps } from 'react';
import styled from 'styled-components';
import { ErrorMessage } from '@hookform/error-message';

import { red, black } from '../../utils/colors';
import { metadata, paragraph } from '../../utils/fontSizes';
import Input, { InputProps } from './Input';

export const InputErrorContainer = styled.div`
    margin-top: 5px;
    height: 25px;
    color: ${red};
    ${metadata}
`;

export const Label = styled.label`
    display: flex;
    color: ${black};
    ${paragraph};
    margin-bottom: 5px;
`;
export const Required = styled.div`
    color: ${red};
    ${metadata};
    padding-top: 2px;
    margin-left: 3px;
`;

// FIXME: Typescript cannot resolve properly the props spreading ({...rest}) over styled-components
const InputAsFC = Input as React.FC<InputProps>;

type FormInputProps = {
    label?: string;
    hasError?: boolean;
    required?: boolean;
    errorMessage?: { [key: string]: string };
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & InputProps &
    HTMLProps<HTMLInputElement>;

export default React.forwardRef(
    (
        { label, required, hasError, errorMessage, ...rest }: FormInputProps,
        ref
    ) => (
        <>
            {label && required ? (
                <Label>
                    {label}
                    <Required> - Requerido</Required>
                </Label>
            ) : (
                label && <Label>{label}</Label>
            )}
            <InputAsFC hasError={!!hasError} {...rest} />
        </>
    )
);
