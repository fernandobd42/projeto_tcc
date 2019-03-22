import Swal from 'sweetalert2' 

import PropTypes from 'prop-types'

import theme from 'app/theme'

const AlertConfirm = (title, text, msgsucesso, action) => (
  Swal.fire({
    title: title,
    text: text,
    type: 'warning',
    confirmButtonText: 'Confirmar',
    confirmButtonColor: theme.palette.primary.main,
    cancelButtonColor: theme.palette.danger.main,
    showCancelButton: true,
  }).then((result) => {
    if (result.value) {
      action()
      Swal.fire({
        title: 'Sucesso!',
        text: msgsucesso,
        type: 'success',
        timer: 5000,
        confirmButtonText: 'Fechar',
        confirmButtonColor: theme.palette.primary.main,
      })
    }
  })
)

AlertConfirm.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  msgsucesso: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
}

export default AlertConfirm