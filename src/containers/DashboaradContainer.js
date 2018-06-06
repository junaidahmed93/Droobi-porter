import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* eslint no-unused-vars: "off" */
import { Doughnut } from 'react-chartjs-2';
import BookingCharts from '../components/BookingCharts';
import GlobalStyle from '../utils/Styles';
import { XAxis, YAxis, LineChart, Line, Tooltip, Legend, PieChart, Pie, CartesianGrid, Label, BarChart, Bar } from 'recharts';
import DriporterMap from '../components/map/DriporterMap';
import * as actions from '../actions/DashboardActions';
import AverageStats from '../components/dashboard/AverageStats';

const style = {
  width: '98%',
  textAlign: 'center',
  display: 'inline-block',
  margin: '0.5rem 1rem',
  padding: '5px',
};

const shortSheets = {
  width: '35%',
  textAlign: 'center',
  display: 'inline-block',
  margin: '1rem 1rem',
};

class DashboaradContainer extends Component {
  constructor(props) {
    super(props);
    this.searchedArea = '';
    this.interval = '';
    this.data = [];
  }


  componentDidMount() {
    // this.interval = setInterval(() => {
    //   this.props.actions.getDriportersLocation();
    // }, 10000);
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  setValue = (key, value) => {
    if (!(value === this.searchedArea)) {
      let interval;
      clearInterval(interval);
      this.searchedArea = value;
      interval = setInterval(() => {
        this.props.actions.getDriportersLocation();
      }, 30000);
    }
  }

  getRandomNumber() {
    if (this.data && this.data.length && this.data.length > 0) {
      return this.data;
    }

    for (let i = 0; i < 10; i++) {
      this.data.push({
        name: i, 'Zone A': Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000, 'Zone B': Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000, 'Zone C': Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000,
      });
    }
    return this.data;
  }

  render() {
    const data01 = [
      { name: 'Group A', value: 400 },
      { name: 'Group B', value: 300 },
      { name: 'Group C', value: 300 },
      { name: 'Group D', value: 200 },
    ];
    const data02 = [
      { name: 'A1', value: 100 },
      { name: 'A2', value: 300 },
      { name: 'B1', value: 100 },
      { name: 'B2', value: 80 },
      { name: 'B3', value: 40 },
      { name: 'B4', value: 30 },
      { name: 'B5', value: 50 },
      { name: 'C1', value: 100 },
      { name: 'C2', value: 200 },
      { name: 'D1', value: 150 },
      { name: 'D2', value: 50 }];

    // const data03 = [
    //   { name: 'Page A', uv: 4000, pv: 9000 },
    //   { name: 'Page B', uv: 3000, pv: 7222 },
    //   { name: 'Page C', uv: 2000, pv: 6222 },
    //   { name: 'Page D', uv: 1223, pv: 5400 },
    //   { name: 'Page E', uv: 1890, pv: 3200 },
    //   { name: 'Page F', uv: 2390, pv: 2500 },
    //   { name: 'Page G', uv: 3490, pv: 1209 },
    // ];

    const data = [
      {
        name: 'Zone A', uv: 4000, female: 2400, male: 2400,
      },
      {
        name: 'Zone B', uv: 3000, female: 1398, male: 2210,
      },
      {
        name: 'Zone C', uv: 2000, female: 9800, male: 2290,
      },
      {
        name: 'Zone D', uv: 2780, female: 3908, male: 2000,
      },
      {
        name: 'Zone E', uv: 1890, female: 4800, male: 2181,
      },
      {
        name: 'Zone F', uv: 2390, female: 3800, male: 2500,
      },
      {
        name: 'Zone G', uv: 3490, female: 4300, male: 2100,
      },
    ];

    const getPath = (x, y, width, height) => `M${x},${y + height}
                    C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
                    C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
                    Z`;

    const TriangleBar = (props) => {
      const {
        fill, x, y, width, height,
      } = props;

      return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    return (
      <div className="dashboardContainer">
        <div style={{ display: 'flex' }}>
          <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
            <BookingCharts />
          </Paper>

        </div>
        <Paper style={style} zDepth={0}>
          <AverageStats />
        </Paper>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    driporterLocations: state.DashboardReducer.driporterLocations,
    driporterLocationsSuccess: state.DashboardReducer.driporterLocationsSuccess,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboaradContainer);
// export default DashboaradContainer;
