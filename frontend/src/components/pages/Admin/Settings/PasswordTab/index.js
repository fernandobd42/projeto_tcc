import React, { useContext, useState } from 'react'
import { useMutation } from 'react-apollo-hooks'
import { Formik, Form as FormikForm, Field as FormikField } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'

import theme from 'app/theme'
import UPDATE_PASSWORD from './Mutation'
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
  id: '',
  newPassword: '',
  confirmNewPassword: '',
  currentPassword: ''
}

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('Nova senha é obrigatório')
    .min(8, 'Nova senha deve ter no mínimo 8 caracteres'),
  confirmNewPassword: Yup.string()
    .required('Confirmação da nova senha é obrigatório')
    .oneOf([Yup.ref('newPassword'), null], 'Senhas devem ser iguais'),
  currentPassword: Yup.string()
    .required('Senha atual é obrigatório')
    .min(8, 'Senha atual deve ter no mínimo 8 caracteres'),
})

const submit = (updatePassword, user, setLoading) => async ({ newPassword, currentPassword }, { setSubmitting, resetForm }) => {
  setLoading(true)
  const currentEmail = user.email
  
  try {
    await updatePassword({
      variables:
      {
        currentEmail,
        currentPassword,
        newPassword
      }
    })

    resetForm()
    Alert('success', 'Sucesso', 'Senha alterada com sucesso!')
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

const PasswordTab = () => {
  const [user] = useContext(ContextAPI)
  const updatePassword = useMutation(UPDATE_PASSWORD)
  const [loading, setLoading] = useState(false)
  const [typePassword, setTypePassword] = useState('password')
  const [tooltipPassword, setTooltipPassword] = useState('Mostrar senha')

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit(updatePassword, user, setLoading)}
    > 
    {({ onSubmit }) => (
      <Form>
        <FormFields>
          <FormikField
            id='new-password'
            required
            name='newPassword'
            type={typePassword}
            label='Nova Senha'
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
          <FormikField
            id='confirm-new-password'
            required
            name='confirmNewPassword'
            type={typePassword}
            label='Confirmar senha'
            placeholder='*********'
            component={InputField}
          />
          <FormikField
            id='current-password'
            required
            name='currentPassword'
            type={typePassword}
            label='Senha atual'
            placeholder='*********'
            component={InputField}
          />
        </FormFields>
        <CustomButton id='save-password' type='submit' variant='outlined' color='primary' disabled={loading} onClick={onSubmit}>
          Alterar
        </CustomButton>
      </Form>
    )}
    </Formik>
  )
}

export default PasswordTab
