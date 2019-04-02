import React from 'react'
import { getIn } from 'formik'

import Input from 'components/atoms/Input'

export const fieldToInput = ({ field, form, helperText, disabled = false, ...props }) => {
  const { name } = field
  const { touched, errors, isSubmitting } = form

  const fieldError = getIn(errors, name)
  const showError = getIn(touched, name) && !!fieldError

  return {
    ...props,
    ...field,
    error: showError,
    disabled: isSubmitting || disabled,
    helperText: showError ? fieldError : props.helperText
  }
}

const InputField = props => <Input {...fieldToInput(props)} />

InputField.propTypes = Input.propTypes

export default InputField
