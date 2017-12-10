import PropTypes from 'prop-types';

const navigatorTypes = PropTypes.shape({
  resetTo: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  pop: PropTypes.func.isRequired,
}).isRequired;

export default navigatorTypes;
