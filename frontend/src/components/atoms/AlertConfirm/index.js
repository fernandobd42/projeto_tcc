import PropTypes from 'prop-types'
import Swal from 'sweetalert2' 

import theme from 'app/theme'

const AlertConfirm = (msgsucesso, action) => (
  Swal.fire({
    title: 'Atenção',
    text: 'Após confirmar, está ação não poderá ser desfeita.',
    type: 'warning',
    confirmButtonText: 'Confirmar',
    confirmButtonColor: theme.palette.success[700],
    cancelButtonColor: theme.palette.danger.main,
    showCancelButton: true,
    customClass: {
      confirmButton: 'confirm-button'
    }
  }).then((result) => {
    if (result.value) {
      action()
      Swal.fire({
        title: 'Sucesso!',
        html: `<div id='text-alert'>${msgsucesso}</div>`,
        type: 'success',
        timer: 5000,
        confirmButtonText: 'Fechar',
        confirmButtonColor: theme.palette.primary.main,
      })
    }
  })
)

AlertConfirm.propTypes = {
  msgsucesso: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
}

export default AlertConfirm