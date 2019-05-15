import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { Formik, Form as FormikForm, Field as FormikField } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'

import theme from 'app/theme'
import { UserContextAPI, setToken } from 'app/store'
import LOGIN from './Mutation'

import MuiPaper from '@material-ui/core/Paper'
import MuiButton from '@material-ui/core/Button'
import MuiTypography from '@material-ui/core/Typography'
import MuiIconButton from '@material-ui/core/IconButton'
import MuiTooltip from '@material-ui/core/Tooltip'
import MuiIconLock from '@material-ui/icons/Lock'
import MuiIconLockOpen from '@material-ui/icons/LockOpen'

import InputField from 'components/atoms/InputField'
import Flex from 'components/atoms/Flex'
import Alert from 'components/atoms/Alert'

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
  email: '',
  password: ''
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email é obrigatório')
    .email('Digite um email válido'),
  password: Yup.string()
    .required('Senha é obrigatório')
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
})

const submit = (mutation, redirectToFeed, setUser) => async ({ email, password }, { setSubmitting }) => {
  try {
    const { data } = await mutation({
      variables: 
      {
        email,
        password
      }
    })

    const result = data.login

    setUser(result.user)
    setToken(result.token)
    Alert('success', 'Sucesso', 'Login realizado com sucesso!')
    redirectToFeed()
  } catch (error) {
    if (error.message.includes('No such user found for email')) {
      Alert('error', 'Error', 'Email não cadastrado!')
    }

    if (error.message.includes('Invalid password')) {
      Alert('error', 'Error', 'Senha incorreta, tente novamente com outra senha.')
    }
  }

  setSubmitting(false)
}

const handlingTypePassword = (typePassword, setTypePassword, setTooltipPassword) => {
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

const Login = ({ history }) => {
  const [typePassword, setTypePassword] = useState('password')
  const [tooltipPassword, setTooltipPassword] = useState('Mostrar senha')
  const {setUser} = UserContextAPI()
  const redirectToRegister = () => history.push('/auth/register')
  const redirectToFeed = () => history.push('/admin/feed')

  return (
    <Flex>
      <Paper>
        <Header>
          <Title variant='h4'>Login</Title>
        </Header>
        <Mutation mutation={LOGIN}>
          {(signin, { loading }) => (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submit(signin, redirectToFeed, setUser)}
          > 
          {({ onSubmit }) => (
            <Form>
              <FormFields>
                <FormikField
                  id='email'
                  required
                  name='email'
                  label='Email'
                  placeholder='email@gmail.com'
                  component={InputField}
                />
                <FormikField
                  id='password'
                  required
                  name='password'
                  type={typePassword}
                  label='Senha'
                  placeholder='*********'
                  component={InputField}
                  endIcon={
                    <MuiTooltip title={tooltipPassword} aria-label={tooltipPassword}>
                      <MuiIconButton id='show-password' onClick={() => handlingTypePassword(typePassword, setTypePassword, setTooltipPassword)}>
                        <LockIconComponent type={typePassword} />
                      </MuiIconButton>
                    </MuiTooltip>
                  }
                />
              </FormFields>
              <CustomButton id='login' type='submit' variant='outlined' color='primary' disabled={loading} onClick={onSubmit}>
                Entrar
              </CustomButton>
              <Footer>
                <CustomButton type='button' color='primary' onClick={redirectToRegister}>
                  Cadastrar
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

export default Login
