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
  msgsucesso: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
}

export default AlertConfirm