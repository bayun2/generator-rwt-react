import {connect} from 'react-redux';
import App from '../../components/App.js';
import {changeA, changeB, changeC} from '../actions.js';

const mapStateToProps = ({a, b, c}) => ({
  a,
  b,
  c,
});

const mapDispatchToProps = dispatch => ({
  changeA: a => dispatch(changeA(a)),
  changeB: b => dispatch(changeB(b)),
  changeC: c => dispatch(changeC(c))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
