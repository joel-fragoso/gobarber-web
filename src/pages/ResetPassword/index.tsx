import React, { FunctionComponent, useRef, useCallback, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { FiLock } from 'react-icons/fi';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();
  const location = useLocation();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatório'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'Confirmação incorreta',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;

        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        addToast({
          type: 'success',
          title: 'ALteração de senha',
          description:
            'A senha foi alterada com sucesso, você já pode fazer login',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar a senha',
          description: 'Ocorreu um erro ao resetar a senha, tente novamente',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history, location.search],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmção da senha"
            />
            <Button loading={loading} type="submit">
              Alterar senha
            </Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
