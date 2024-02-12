import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import AsyncPrimaryButton from '../../components/AsyncPrimaryButton';
import FormInput from '../../components/FormInput';
import { usersApi } from '../../apiServices';
import { userLoggedIn } from '../../redux/users/actions';

import wallPaperGP from './GP_WallPaper.svg';
import { h3 } from '../../utils/fontSizes';
import Input from '../../components/FormInput/Input';

const MainContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-grow: 1;
`;

const BannerSection = styled.div`
    flex: 1;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(${wallPaperGP});
    ${h3}
    color: white;
    text-align: center;
    display: flex;
    flex-direction: column-reverse;
    p {
        padding: 0px 50px 100px 50px;
    }
`;

const LoginSection = styled.div`
    flex: 2;
    background-position: right top;
    background-repeat: no-repeat;
    background-size: 40%;
    display: flex;
    justify-content: center;
`;

const LoginFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
`;

const Form = styled.form`
    width: 100%;
    margin-top: 4rem;
    text-align: left;
    display: flex;
    flex-direction: column;
`;

export default () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm();

    const onSubmit = async (data: any) => {
        try {
            setIsLoading(true);
            const jwt = await usersApi.logIn(data.username, data.password);
            if (!jwt) {
                throw new Error();
            }

            dispatch(userLoggedIn(jwt.replace('Bearer ', '')));
        } catch (e) {
            setIsLoading(false);
            /*if (e.status === 401) {
                setError('user', {
                    type: 'validate',
                });
                setError('pass', {
                    type: 'validate',
                });
                setError('submit', {
                    type: 'validate',
                    message: 'El usuario o contraseña es incorrecto/a',
                });
            } else {
                setError('submit', {
                    type: 'validate',
                    message: 'Algo ha ido mal, intente mas tarde',
                });
            }*/
        }
    };

    return (
        <MainContainer>
            <BannerSection>
                <p>Sistema enfocado a Circuitos de Torneos Amateur de padel.</p>
            </BannerSection>
            <LoginSection>
                <LoginFormContainer>
                    <Form
                        onSubmit={(event) => {
                            clearErrors();
                            handleSubmit(onSubmit)(event);
                        }}
                        autoComplete="off"
                    >
                        {/*<FormInput
                            label="Usuario"
                            type="text"
                            autoFocus
                            name="user"
                            hasError={!!errors.user}
                            ref={register('Por favor ingrese la contraseña')}
                            placeholder="Escriba aquí"
                        />
                        <FormInput
                            label="Contraseña"
                            type="password"
                            autoFocus
                            name="pass"
                            ref={register({
                                required: 'Por favor ingrese la contraseña',
                            })}
                            placeholder="Escriba aquí"
                        />*/}
                        <Input
                            type="text"
                            autoFocus
                            name="user"
                            hasError={!!errors.user}
                            placeholder="Escriba aquí"
                        />
                        <Input
                            type="password"
                            autoFocus
                            name="pass"
                            placeholder="Escriba aquí"
                        />
                        <AsyncPrimaryButton isLoading={isLoading}>
                            Iniciar sesión
                        </AsyncPrimaryButton>
                    </Form>
                </LoginFormContainer>
            </LoginSection>
        </MainContainer>
    );
};
