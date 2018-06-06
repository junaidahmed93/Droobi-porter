import React from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import SelectField from 'material-ui/SelectField';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { store } from '../store';
import { formsValidation } from '../utils/Helpers';
import GlobalStyle from '../utils/Styles';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import * as actions from '../actions/IncomingPatientAction';
import SinglePatientDetail from '../components/SinglePatientDetail';
import { LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const style = {
  container: {

    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 4000,
    cursor: 'pointer',

  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
    marginLeft: '50%',
    marginTop: '25%',
  },
};

class SoSContainer extends React.Component {
  constructor(props) {
    super(props);
    this.bookingData = {};
    this.onChangeCancelField = this.onChangeCancelField.bind(this);
    this.cancelBooking = this.cancelBooking.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.deleteBookingConfirm = this.deleteBookingConfirm.bind(this);
    this.onChangeCancelField = this.onChangeCancelField.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = {
      errorText: '',
      errorClass: '',
      showErrorTemplate: false,
      booking: {},
      cancelReasons: [],
      editMode: true,
      cancelBooking: false,
      cancelReason: '',
      cancelBookingError: '',
      isLoading: 0,

    };
  }


  componentDidMount() {
    this.props.actions.getCurrentPatient();
  }


  componentWillReceiveProps(nextProps) {
    console.log('Single patient', nextProps);
    if (nextProps && nextProps.bookings && nextProps.bookings[0]) {
      this.setState({ booking: nextProps.bookings[0] });
    }
  }


  onEdit() {
    this.setState({ editMode: false });
  }

  handleUpdate() {
    const p = Object.assign({}, this.state.booking, this.bookingData);
    console.log('pppppppp', p);
    this.setState({ isLoading: 1, booking: p });
    setTimeout(() => { this.setState({ isLoading: 0 }); }, 1000);
  }

  onChangeCancelField(object, index, value) {
    console.log('----------------------value', value);
    this.setState({ cancelReason: value, cancelBookingError: '' });
  }

  setValue = (key, value) => {
    this.bookingData[key] = value;
  };

  cancelBooking() {
    this.setState({ showErrorTemplate: true, cancelBooking: true });
  }

  submit = () => {
    const updateBooking = Object.assign({}, this.state.booking, this.bookingData);
    console.log('this.updatedPartnerUser', updateBooking);
    const fieldResult = formsValidation(updateBooking, 'EditBooking');
    if (fieldResult.warning === false) {
      this.props.actions.editBooking(updateBooking);
    } else {
      this.setState({
        booking: updateBooking,
        showErrorTemplate: true,
        errorText: fieldResult.template,
        errorClass: 'alert alert-danger',
      });
    }
  }

  deleteBookingConfirm() {
    if (this.state.cancelReason) {
      const data = {
        bookingId: this.state.booking.bookingId,
        actionType: 'cancelled',
        cancelReason: this.state.cancelReason,
      };
      console.log('data', data);
      this.props.actions.cancelBooking(data);
      this.setState({ showErrorTemplate: false, cancelBooking: false });
    } else {
      this.setState({ cancelBookingError: 'Please specify reason.' });
    }
  }


  render() {
    const data = [
      { name: '10', uv: 4000, pv: 9000 },
      { name: '20', uv: 3000, pv: 7222 },
      { name: '30', uv: 2000, pv: 6222 },
      { name: '40', uv: 1223, pv: 5400 },
      { name: '50', uv: 1890, pv: 3200 },
      { name: '60', uv: 2390, pv: 2500 },
      { name: '70', uv: 3490, pv: 1209 },
    ];

    const actionsButton = [
      <FlatButton
        label="Ok"
        primary
        keyboardFocused
        onClick={() => { this.setState({ showErrorTemplate: false }); }}
      />,
    ];

    const canceBookingActions = [
      <FlatButton
        label="No"
        primary
        onClick={() => { this.setState({ showErrorTemplate: false }); }}
      />,
      <FlatButton
        label="Yes"
        primary
        onClick={this.deleteBookingConfirm}
      />,
    ];
    return (
      <div id="vehicleContainer">

        <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
          <SinglePatientDetail incomingPatient={this.state.booking} setValue={this.setValue} buttonHide={this.buttonHide} editMode={this.state.editMode} />
        </Paper>
        <Grid fluid style={GlobalStyle.containerHeader}>
          <Row>
            <Col xsOffset={8} md={4}>
              <Link to="">
                <FlatButton onClick={this.handleUpdate} label="Update" className="add-button add-button-back float-right" />
              </Link>

            </Col>
          </Row>
        </Grid>

        <Dialog
          title={this.state.cancelBooking ? 'Cancel Booking' : 'Required'}
          actions={this.state.cancelBooking ? canceBookingActions : actionsButton}
          modal={false}
          open={this.state.showErrorTemplate}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          {this.state.cancelBooking ?
            <div className={this.state.errorClass} >
              <h3>Are you sure to cancel booking </h3>
              <SelectField
                maxHeight={250}
                errorText={this.state.cancelBookingError}
                floatingLabelText="Select reason"
                value={this.state.cancelReason}
                onChange={this.onChangeCancelField}
                style={{ marginTop: '-15px' }}
              >
                {this.state.cancelReasons.map(v => <MenuItem value={v.reason} primaryText={v.reason} key={v.id} />)}

              </SelectField>
            </div>
            : <div className={this.state.errorClass} dangerouslySetInnerHTML={{ __html: this.state.errorText }} />}


        </Dialog>

        {this.state.isLoading > 0 ?
          <div style={style.container}>
            <RefreshIndicator
              size={40}
              left={10}
              top={0}
              status="loading"
              style={style.refresh}
            />
          </div> : null};
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bookings: state.IncomingPatientReducer.incomingPatient,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SoSContainer);
