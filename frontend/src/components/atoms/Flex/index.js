import PropTypes from 'prop-types'

import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.direction};
  justify-content: ${props => props.justify};
  align-items: ${props => props.alignItems};
  align-content: ${props => props.alignContent};
  flex: ${props => props.flex};
  height: ${props => props.height};
`

Flex.defaultProps = {
  direction: 'row',
  justify: 'center',
  alignItems: 'center',
  alignContent: 'center'
}

Flex.propTypes = {
  height: PropTypes.any,
  flex: PropTypes.number,
  direction: PropTypes.oneOf(['row', 'column']),
  justify: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly']),
  alignItems: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'stretch', 'baseline']),
  alignContent: PropTypes.oneOf(['stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around'])
}

export default Flex
