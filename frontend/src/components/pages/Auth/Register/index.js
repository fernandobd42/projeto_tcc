import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { Formik, Form as FormikForm, Field as FormikField } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'

import SIGN_UP from './Mutation'

import theme from 'app/theme'

import InputField from 'components/atoms/InputField'
import Flex from 'components/atoms/Flex'
import Alert from 'components/atoms/Alert'

import MuiPaper from '@material-ui/core/Paper'
import MuiButton from '@material-ui/core/Button'
import MuiTypography from '@material-ui/core/Typography';
import MuiIconButton from '@material-ui/core/IconButton'
import MuiTooltip from '@material-ui/core/Tooltip'
import MuiIconLock from '@material-ui/icons/Lock'
import MuiIconLockOpen from '@material-ui/icons/LockOpen'


const Paper = styled(MuiPaper)`
  && {
    max-width: 400px;
    min-width: 275px;
  }
`

const Header = styled(MuiPaper)`
  && {
    width: 100%;
    height: 80px;
    text-align: center;
    padding: ${theme.spacing.unit * 4}px;
    background-color: ${theme.palette.primary.main};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const Title = styled(MuiTypography)`
  && {
    color: ${theme.palette.textPrimary};
  }
`

const Form = styled(FormikForm)`
  && {
    width: 100%;
    padding: ${theme.spacing.unit * 4}px;
  }
`

const FormFields = styled.div`
  && {
    margin-bottom: ${theme.spacing.unit * 4}px;
  }
`

const CustomButton = styled(MuiButton)`
  && {
    width: 100%;
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${theme.spacing.unit * 3}px;
`

const initialValues = {
  name: '',
  email: '',
  password: '',
  repeatPassword: ''
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Nome e sobrenome é obrigatório')
    .matches(
      /^([a-zA-Zà-úÀ-Ú-]+){3,}\s+([a-zA-Zà-úÀ-Ú-]+){2,}\s*([a-zA-Zà-úÀ-Ú-]+)\s*([a-zA-Zà-úÀ-Ú-]+)\s*([a-zA-Zà-úÀ-Ú-]+)*$/, {
      excludeEmptyString: true,
      message: 'Prencha ao menos nome e sobrenome'
    }),
  email: Yup.string()
    .required('Email é obrigatório')
    .email('Digite um email válido'),
  password: Yup.string()
    .required('Senha é obrigatório')
    .min(8, 'Senha deve ter no mínimo 8 caracteres'),
  repeatPassword: Yup.string()
    .required('Confirmar senha é obrigatório')
    .oneOf([Yup.ref('password'), null], 'Senhas devem ser iguais')
})

const submit = (mutation, redirectToLogin) => async ({ email, password, name }, { setSubmitting }) => {
  try {
    await mutation({
      variables:
      {
        email,
        password,
        name,
      }
    })

    Alert('success', 'Sucesso', 'Cadastro realizado com sucesso!')
    redirectToLogin()
  } catch (error) {
    if (!!error.networkError) {
      Alert('error', 'Error', 'Servidor fora do ar!')
    }

    if (error.message.includes('User already exists')) {
      Alert('error', 'Error!', 'Este email já está sendo usado.')
    }
  }
  
  setSubmitting(false)
}

const handlingTypePassword = (typePassword, setTypePassword, setTooltipPassword) => () => {
  if (typePassword === 'text') {
    setTypePassword('password')
    setTooltipPassword('Mostrar senha')
  } else {
    setTypePassword('text')
    setTooltipPassword('Esconder senha')
  }
}

const LockIconComponent = ({ type }) => {
  if (type === 'text') {
    return <MuiIconLockOpen />
  } else {
    return <MuiIconLock />
  }
}

const Register = ({ history }) => {
  const [typePassword, setTypePassword] = useState('password')
  const [tooltipPassword, setTooltipPassword] = useState('Mostrar senha')
  const redirectToLogin = () => () => history.push('/auth/login')

  return (
    <Flex>
      <Paper>
        <Header>
          <Title variant='h4'>Cadastro</Title>
        </Header>
        <Mutation mutation={SIGN_UP}>
          {(signup, { loading }) => (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submit(signup, redirectToLogin)}
          > 
          {({ onSubmit }) => (
            <Form>
              <FormFields>
                <FormikField
                  required
                  name='name'
                  label='Name'
                  placeholder='Fulano de tal'
                  component={InputField}
                />
                <FormikField
                  required
                  name='email'
                  label='Email'
                  placeholder='email@gmail.com'
                  component={InputField}
                />
                <FormikField
                  required
                  name='password'
                  type={typePassword}
                  label='Senha'
                  placeholder='*********'
                  component={InputField}
                  endIcon={
                    <MuiTooltip title={tooltipPassword} aria-label={tooltipPassword}>
                      <MuiIconButton onClick={handlingTypePassword(typePassword, setTypePassword, setTooltipPassword)}>
                        <LockIconComponent type={typePassword} />
                      </MuiIconButton>
                    </MuiTooltip>
                  }
                />
                <FormikField
                  required
                  name='repeatPassword'
                  type={typePassword}
                  label='Confirmar senha'
                  placeholder='*********'
                  component={InputField}
                />
              </FormFields>
              <CustomButton type='submit' variant='outlined' color='primary' disabled={loading} onClick={onSubmit}>
                Cadastrar
              </CustomButton>
              <Footer>
                <CustomButton type='button' color='primary' onClick={redirectToLogin}>
                  Entrar
                </CustomButton>
              </Footer>
            </Form>
          )}
          </Formik>
        )}
        </Mutation>
      </Paper>
    </Flex>
  )
}

export default Register
