import React, { FunctionComponent, ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: FunctionComponent<ButtonProps> = ({
  children,
  loading,
  ...rest
}) => {
  return (
    <Container type="button" {...rest}>
      {loading ? 'Carregando...' : children}
    </Container>
  );
};

export default Button;
