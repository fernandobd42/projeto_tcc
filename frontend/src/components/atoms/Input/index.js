import React from 'react'
import PropTypes from 'prop-types'

import MuiTextField from '@material-ui/core/TextField'
import MuiInputAdornment from '@material-ui/core/InputAdornment'

import styled, { css } from 'styled-components'

import theme from 'app/theme'

const StyledInput = styled(MuiTextField)`
  && {
    ${props =>
      props.InputProps &&
      props.InputProps.endAdornment &&
      css`
        & div {
          margin-right: 0;
          padding-right: 0
        }
      `};

    ${props =>
      props.color &&
      css`
        & > label {
          color: ${theme.palette[props.color].main};
        }
      `};

    ${props =>
      props.padding &&
      css`
        & > div {
          input {
            padding-bottom: ${theme.spacing.unit * 2}px;
          }

          & > div > svg,
          > div > button {
            margin-bottom: ${theme.spacing.unit * 2}px;
          }
        }
      `};
  }
`

const Input = ({ endIcon, ...props }) => {
  if (endIcon) {
    props.InputProps = {
      endAdornment: (
        <MuiInputAdornment>
          {endIcon}
        </MuiInputAdornment>
      )
    }
  }
  return <StyledInput {...props} />


} 

Input.defaultProps = {
  type: 'text',
  margin: 'dense',
  fullWidth: true,
  autoComplete: 'off',
  variant: 'outlined',
  InputLabelProps: {
    shrink: true
  }
}

Input.propTypes = {
  ...MuiTextField.propTypes,
  endIcon: PropTypes.node,
  variant: PropTypes.string,
  padding: PropTypes.bool
}

export default Input
