import React, { useContext, useState } from 'react'
import { useMutation } from 'react-apollo-hooks'
import { Formik, Form as FormikForm, Field as FormikField } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'

import theme from 'app/theme'
import UPDATE_USER from './Mutation'
import { ContextAPI } from 'app/store'

import MuiButton from '@material-ui/core/Button'
import MuiIconButton from '@material-ui/core/IconButton'
import MuiTooltip from '@material-ui/core/Tooltip'
import MuiIconLock from '@material-ui/icons/Lock'
import MuiIconLockOpen from '@material-ui/icons/LockOpen'

import InputField from 'components/atoms/InputField'
import Alert from 'components/atoms/Alert'
const Form = styled(FormikForm)`
  && {
    width: 100%;
    padding: ${theme.spacing.unit * 2}px;
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

const initialValues = {
  name: '',
  email: '',
  password: ''
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
})

const submit = (updateUser, setUser, user, setLoading) => async ({ name, email, password }, { setSubmitting }) => {
  setLoading(true)
  const currentEmail = user.email
  
  try {
    const { data } = await updateUser({
      variables:
      {
        name,
        email,
        currentEmail,
        password
      }
    })

    setUser(data.updateUser)
    user.password = ''
    Alert('success', 'Sucesso', 'Dados pessoais alterados com sucesso!')
  } catch (error) {
    if (!!error.networkError) {
      Alert('error', 'Error', 'Servidor fora do ar!')
    }

    if (error.message.includes('Invalid password')) {
      Alert('error', 'Error', 'Senha incorreta, tente novamente com outra senha.')
    }
  }
  
  setLoading(false)
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

const PersonalTab = () => {
  const [user, setUser] = useContext(ContextAPI)
  const updateUser = useMutation(UPDATE_USER)
  const [loading, setLoading] = useState(false)
  const [typePassword, setTypePassword] = useState('password')
  const [tooltipPassword, setTooltipPassword] = useState('Mostrar senha')
  user.password = ''

  return (
    <Formik
      initialValues={!!user ? user : initialValues}
      validationSchema={validationSchema}
      onSubmit={submit(updateUser, setUser, user, setLoading)}
    > 
    {({ onSubmit }) => (
      <Form>
        <FormFields>
          <FormikField
            required
            name='name'
            label='Nome'
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
        </FormFields>
        <CustomButton type='submit' variant='outlined' color='primary' disabled={loading} onClick={onSubmit}>
          Alterar
        </CustomButton>
      </Form>
    )}
    </Formik>
  )
}

export default PersonalTab
