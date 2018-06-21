import React from 'react';
import Divider from 'material-ui/Divider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Converters from '../utils/Converters';
import InputEditBox from './shared/forms/InputEditBox';
import { getAirportFromDeptLoc, getTerminalFromDeptLoc } from '../utils/Helpers';
import GlobalStyle from '../utils/Styles';
import statusMapping from '../utils/StatusMapping';
import LinearProgress from 'material-ui/LinearProgress';

// import InputEditBox from '../shared/forms/InputEditBox';
export default class incomingPatientEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incomingPatient: {},
      incomingPatient: {},
    };
    this.heartBeatInc = true;
    this.color = 'green';
  }

  componentDidMount() {
    setInterval(() => {
        this.refresh();
    }, 5000);

    
  }

  refresh() {
    const data = this.props.incomingPatient;
    const previousRate = this.state.incomingPatient.heartRate;
    const random = Math.floor((Math.random() * 100) / 10);
    const heartRate = (Number(data.heartRate) + (random));
    const finalDate = Object.assign({}, data, { heartRate });
    this.color = previousRate > heartRate ? 'green' : 'red';
    this.setState({ incomingPatient: finalDate });
  }
  componentWillReceiveProps(nextProps) {
    console.log('checking next props', nextProps);
    this.setState({ incomingPatient: nextProps.incomingPatient });
  }
  render() {
    const { setValue, editMode } = this.props;
    const { incomingPatient } = this.state;
    return (
      <div>
        <form className="form-validation">
        
          <h2 style={GlobalStyle.formHeadingsh1}>Patient Details: </h2>
          <br />
          <span style={{ color: '#29ABE2', fontSize: '15px' }}>Data Broadcasting...</span>
          <LinearProgress mode="indeterminate" />
          <Divider className="paper-divider" />
          <Grid fluid>
            <Row> 
              <Col md={6}>

                <Grid>
                  <Row style={{ padding: '5px' }}>
                    <Col md={6}>
                      <InputEditBox
                            id="name"
                            setValue={setValue}
                            prefilled={incomingPatient.name}
                            label="Name"
                            type="text"
                            disabled
                          />
                    </Col>
                    <Col md={6}>
                      <InputEditBox
                            id="age"
                            setValue={setValue}
                            prefilled={incomingPatient.gender}
                            label="Age"
                            type="text"
                            disabled
                          />
                    </Col>
                  </Row>

                  <Row style={{ padding: '5px' }}>
                    <Col md={6}>
                      <InputEditBox
                            id="gender"
                            setValue={setValue}
                            prefilled={incomingPatient.gender}
                            label="Gender"
                            type="text"
                            disabled
                          />
                    </Col>
                    <Col md={6}>
                      <InputEditBox
                            id="bloodgroup"
                            setValue={setValue}
                            prefilled={incomingPatient.bloodGroup}
                            label="Blood Group"
                            type="text"
                            disabled
                          />
                    </Col>
                  </Row>

                  <Row style={{ padding: '5px' }}>
                    <Col md={6}>
                      <InputEditBox
                            id="heigth"
                            setValue={setValue}
                            prefilled={incomingPatient.height}
                            label="Height"
                            type="text"
                            disabled
                          />
                    </Col>
                    <Col md={6}>
                      <InputEditBox
                            id="Weight"
                            setValue={setValue}
                            prefilled={incomingPatient.weight}
                            label="weight"
                            type="text"
                            disabled
                          />
                    </Col>
                  </Row>

                   <Row style={{ padding: '5px' }}>
                    <Col md={6}>
                      <InputEditBox
                            id="operated"
                            setValue={setValue}
                            prefilled={incomingPatient.operated}
                            label="Operated"
                            type="text"
                            disabled
                          />
                    </Col>
                    <Col md={6}>
                      <InputEditBox
                            id="previousTreatment"
                            setValue={setValue}
                            prefilled={incomingPatient.previousTreatment}
                            label="Previous treatment"
                            type="text"
                            disabled
                          />
                    </Col>
                  </Row>

                
                </Grid>

              </Col>

              <Col md={6}>

                <Grid>
                    

                  <Row style={{  height: '50px', padding: '5px', marginTop: '20px' }}>
                    <Col md={6}> Heartrate </Col>
                    <Col md={6} style={{ color: `${this.color}`, }}> <span style={{fontSize: '30px'}}>{incomingPatient.heartRate}</span> bpm </Col>
                  </Row>

                  <Row style={{  height: '50px', padding: '5px', }}>
                    <Col md={6}> Blood Pressure </Col>
                    <Col md={6} > <span style={{fontSize: '30px'}}>{incomingPatient.bloodPressure}</span> </Col>
                  </Row>

                  <Row style={{  height: '50px', padding: '5px', }}>
                    <Col md={6}> Temprature </Col>
                    <Col md={6} > <span style={{fontSize: '30px'}}>101</span> </Col>
                  </Row>

                  <Row style={{  height: '50px', padding: '5px' }}>
                    <Col md={6}> Cholestrol </Col>
                    <Col md={6} > <span style={{fontSize: '30px'}}>{incomingPatient.cholestrol}</span> mg/dl </Col>
                  </Row>


                  <Row style={{ padding: '5px' }}>
                    <Col md={6}>blood sugar  </Col>
                    <Col md={6} > <span style={{fontSize: '30px'}}>{incomingPatient.bloodSugar}</span> mg/dl</Col>
                  </Row>

                </Grid>
              </Col>
            </Row>
          </Grid>
       
          <h2 className="paper-title heading-spacing">First Aid</h2>
          <br />
          <Divider className="paper-divider" />
          <Grid fluid>

            {/* <Row className="form-row-spacing">
              <Col md={4}>
                <InputEditBox
                  id="heartRate"
                  setValue={setValue}
                  prefilled={incomingPatient.heartRate}
                  label="Heart Rate"
                  type="text"
                />
              </Col>
              <Col md={4}>
                <InputEditBox
                  id="bloodPressure"
                  setValue={setValue}
                  prefilled={incomingPatient.bloodPressure}
                  label="Blood Pressure"
                  type="text"
                />
              </Col>
              <Col md={4}>
                <InputEditBox
                  id="accident"
                  setValue={setValue}
                  prefilled={incomingPatient.accident}
                  label="Accident Y/N"
                  type="text"
                  fixedFloat
                />
              </Col>
            </Row>

            <Row className="form-row-spacing">
              <Col md={4}>
                <InputEditBox
                  id="commetns"
                  setValue={setValue}
                  prefilled={incomingPatient.comments}
                  label="comments"
                  type="text"
                />
              </Col>
              <Col md={4}>
                <InputEditBox
                  id="bloodPressure"
                  setValue={setValue}
                  prefilled={incomingPatient.bloodPressure}
                  label="Blood Pressure"
                  type="text"
                />
              </Col>
              <Col md={4}>
                <InputEditBox
                  id="wound"
                  setValue={setValue}
                  prefilled={incomingPatient.wound}
                  label="Wound Y/N"
                  type="text"
                  fixedFloat
                />
              </Col>
            </Row> */}
            <Row className=".form-row-spacing-comments">
              <Col md={4}>
                <InputEditBox
                  id="treatment"
                  setValue={setValue}
                  prefilled={incomingPatient.treatment}
                  label="Treatment"
                  type="text"
                  hintText="Initial treament given by porter"
                  multiLine
                  rows={6}
                />
              </Col>

            </Row>

          </Grid>


        </form>

      </div>
    );
  }
}
