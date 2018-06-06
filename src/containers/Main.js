import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { browserHistory } from 'react-router';
import LeftArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import SelectField from 'material-ui/SelectField';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import BookingCharts from '../../components/booking/BookingCharts';
import GlobalStyle from '../utils/Styles';
import * as actions from '../actions/IncomingPatientAction';
import IncomingPatient from '../components/booking/IncomingPatient';
import { nextBookings, previousBookings, startRecord, endRecord, totalRecords } from '../utils/Pagination';
import { patientData } from '../utils/data';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.onSearchChanged = this.onSearchChanged.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.previousButton = this.previousButton.bind(this);
    this.state = {
      shownRecords: [],
      storedRecords: [],
      currentRowCount: 10,
      startSearch: false,
      open: false,
      showSearchbar: false,
      showFilterBar: false,
      showTagBar: false,
      value: 1,
      filteredValues: ['1', '2', '3', '4', '5'],
      selectedValue: '',
    };
    this.searchedRecords = [];
    this.startingNextCount = 0;
    this.currentPageNumber = -1;
    this.interval = () => { };
  }


  componentDidMount() {
    this.props.actions.getAllIncomingPatients();
    this.interval = setInterval(() => {
      this.props.actions.getAllIncomingPatients();
    }, 1000);
    // this.refreshBooking();
    // this.setState({shownRecords: patientData });
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({
      // shownRecords: nextProps.bookings,
      // storedRecords: nextProps.bookings,
    });

    setTimeout(() => {
      let endCount;
      let startCount;
      if (this.currentPageNumber > 0) {
        console.log('IF');
        startCount = this.currentPageNumber;
        endCount = startCount + 10;
      } else {
        console.log('Else');
        startCount = 0;
        endCount = this.state.currentRowCount;
      }
      this.setState({
        shownRecords: nextProps.bookings.slice(startCount, endCount),
        storedRecords: nextProps.bookings,
      });
    }, 1);
  }


  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onSearchChanged(object, value) {
    this.searchedRecords = [];
    if (value === '') {
      this.refreshBooking();
      this.setState({ shownRecords: this.state.storedRecords.slice(0, 10), startSearch: false });
      this.searchedRecords = [];
    } else {
      console.log('CLEAR INTERVAL');
      clearInterval(this.interval);
      this.state.storedRecords.forEach((item) => {
        if (item.userName.toLowerCase().search(value.toLowerCase()) !== -1) {
          this.searchedRecords.push(item);
        }
      });
      this.startingNextCount = 0;
      this.setState({ shownRecords: this.searchedRecords, startSearch: true });
    }
  }

  handleChange = (event, index, value) => this.setState({ value });

  handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handlerSearch = () => {
    this.setState({ showSearchbar: true, showFilterBar: false, showTagBar: false });
  }

  handlerFilter = () => {
    this.setState({ showSearchbar: false, showFilterBar: true, showTagBar: false });
  }

  handlerTag = () => {
    this.setState({ showSearchbar: false, showFilterBar: false, showTagBar: true });
  }

  refreshBooking() {
    this.interval = setInterval(() => {
      console.log('startingNextCount', this.startingNextCount);
      this.currentPageNumber = this.startingNextCount;
      // this.props.actions.getAllBookings();
    }, 10000);
  }

  nextButton() {
    const nextRecords = nextBookings(this.state, this.startingNextCount);
    if (nextRecords) {
      this.startingNextCount = nextRecords;
      this.setState({ shownRecords: this.state.storedRecords.slice(nextRecords, nextRecords + 10) });
    }
  }

  previousButton() {
    const previousRecords = previousBookings(this.state, this.startingNextCount);
    if (!(previousRecords < 0)) {
      this.startingNextCount = previousRecords;
      this.setState({ shownRecords: this.state.storedRecords.slice(previousRecords, previousRecords + 10) });
    }
  }

  handleChange = (event, index, values) => this.setState({ values });


  render() {
    const { values, selectedValue, filteredValues } = this.state;
    return (
      <div id="vehicleContainer">
        <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>


          <Grid>
            <Row>
              <Col md={4} />
              <Col md={4}>
                <h1>Ambulance Internal view</h1>
              </Col>
              <Col md={4} />
            </Row>
          </Grid>


          <Grid>
            <Row>
              <Col md={3} />
              <Col md={3}>
                <div onClick={() => { browserHistory.push('/home/admin/main'); }}>
                  <svg style={{ width: '80%', height: '80%' }} viewBox="0 0 24 24">
                    <path fill="#27BCBD" d="M11,13H13V16H16V11H18L12,6L6,11H8V16H11V13M12,1L21,5V11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1Z" />
                  </svg>
                  <div style={{marginLeft: '93px', fontSize:'20px'}}>Home</div>
                </div>
              </Col>
              <Col md={3}>
                <div onClick={() => { browserHistory.push('/home/admin/dashboard'); }}>
                  <svg style={{ width: '80%', height: '80%' }} viewBox="0 0 24 24">
                    <path fill="#27BCBD" d="M2,5V19H8V5H2M9,5V10H15V5H9M16,5V14H22V5H16M9,11V19H15V11H9M16,15V19H22V15H16Z" />
                  </svg>
                  <div style={{marginLeft: '66px', fontSize:'20px'}}>Dashboard</div>
                </div>
              </Col>
              <Col md={3} />
            </Row>

            <Row>
              <Col md={3} />
              <Col md={3}>
                <div onClick={() => { browserHistory.push('/home/admin/sos'); }}>
                  <svg style={{ width: '80%', height: '80%' }} viewBox="0 0 24 24">
                    <path fill="#27BCBD" d="M10,3L8,5V7H5C3.85,7 3.12,8 3,9L2,19C1.88,20 2.54,21 4,21H20C21.46,21 22.12,20 22,19L21,9C20.88,8 20.06,7 19,7H16V5L14,3H10M10,5H14V7H10V5M11,10H13V13H16V15H13V18H11V15H8V13H11V10Z" />

                  </svg>
                  <div style={{marginLeft: '93px', fontSize:'20px'}}>SoS</div>
                </div>
              </Col>

              <Col md={3}>
                <div onClick={() => { browserHistory.push('/home/admin/config'); }}>
                  <svg style={{ width: '80%', height: '80%' }} viewBox="0 0 24 24">
                    <path fill="#27BCBD" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
                  </svg>
                  <div style={{marginLeft: '66px', fontSize:'20px'}}>configuration</div>
                </div>
              </Col>
              <Col md={3} />
            </Row>

          </Grid>

        </Paper>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
