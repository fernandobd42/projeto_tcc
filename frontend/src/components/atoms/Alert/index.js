import Swal from 'sweetalert2' 

import PropTypes from 'prop-types'

const Alert = (type, title, text) => (
  Swal.fire({
    title: title,
    text: text,
    type: type,
    timer: 5000,
    confirmButtonText: 'Fechar'
  })
)

Alert.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error', 'default']),
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default Alert