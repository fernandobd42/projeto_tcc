import PropTypes from 'prop-types'
import Swal from 'sweetalert2' 

import theme from 'app/theme'

const Alert = (type, title, text) => (
  Swal.fire({
    title: title,
    text: text,
    type: type,
    timer: 3000,
    confirmButtonText: 'Fechar',
    confirmButtonColor: theme.palette.primary.main,
  })
)

Alert.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error', 'default']),
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default Alert