import React, { useContext, useState } from 'react'
import { Formik, Form as FormikForm, Field as FormikField } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'

import { ContextAPI } from 'app/store'

import theme from 'app/theme'

import InputField from 'components/atoms/InputField'
import Alert from 'components/atoms/Alert'

import MuiButton from '@material-ui/core/Button'
import MuiIconButton from '@material-ui/core/IconButton'
import MuiTooltip from '@material-ui/core/Tooltip'
import MuiIconLock from '@material-ui/icons/Lock'
import MuiIconLockOpen from '@material-ui/icons/LockOpen'


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
    .min(8, 'Confirmação da nova senha deve ter no mínimo 8 caracteres'),
  currentPassword: Yup.string()
    .required('Senha atual é obrigatório')
    .min(8, 'Senha atual deve ter no mínimo 8 caracteres'),
})

const submit = mutation => async ({ id, newPassword, confirmNewPassword, currentPassword }, { setSubmitting }) => {
  const [user] = useContext(ContextAPI)

  try {
    await mutation({
      variables:
      {
        id,
        newPassword,
        confirmNewPassword,
        currentPassword
      }
    })

    Alert('success', 'Sucesso', 'Dados pessoais alterados com sucesso!')
  } catch (error) {
    if (!!error.networkError) {
      Alert('error', 'Error', 'Servidor fora do ar!')
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

const PasswordTab = () => {
  const [typePassword, setTypePassword] = useState('password')
  const [tooltipPassword, setTooltipPassword] = useState('Mostrar senha')

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => console.log('click')}
    > 
    {({ onSubmit }) => (
      <Form>
        <FormFields>
          <FormikField
            required
            name='newPassword'
            type={typePassword}
            label='Senha'
            placeholder='*********'
            component={InputField}
            endIcon={
              <MuiTooltip title={tooltipPassword} aria-label={tooltipPassword}>
                <MuiIconButton onClick={() => handlingTypePassword(typePassword, setTypePassword, setTooltipPassword)}>
                  <LockIconComponent type={typePassword} />
                </MuiIconButton>
              </MuiTooltip>
            }
          />
          <FormikField
            required
            name='confirmNewPassword'
            type={typePassword}
            label='Confirmar senha'
            placeholder='*********'
            component={InputField}
          />
          <FormikField
            required
            name='currentPassword'
            type={typePassword}
            label='Confirmar senha'
            placeholder='*********'
            component={InputField}
          />
        </FormFields>
        <CustomButton type='submit' variant='outlined' color='primary' onClick={onSubmit}>
          Alterar
        </CustomButton>
      </Form>
    )}
    </Formik>
  )
}

export default PasswordTab
