import momentTZ from 'moment-timezone';
import request from 'superagent';
import APIURL from '../constants/apiUrlConstants';
import ErrorMapping from '../utils/ErrorMapping';
import { loadState } from '../utils/StorageUtils';
import { patientData } from '../utils/data';
import { singlePatient } from '../utils/data';

const data = patientData;
const IncomingPatientSource = {
  getAllIncomingPatients() {
    return new Promise((resolve, reject) => {
      const updatedPatientData = [];
      patientData.forEach((element) => {
        const heatBeat = element.heartRate;
        const random = Math.floor((Math.random() * 100) / 10);
        let color,
          newHeartRate = element.heartRate;
        if (random > 5) {
          newHeartRate = Number(element.heartRate) + (random);
          color = 'red';
        } else {
          newHeartRate = Number(element.heartRate) - (random);
          color = 'green';
        }

        const finalObj = Object.assign({}, element, { color, heartRate: newHeartRate });
        updatedPatientData.push(finalObj);
      });
      resolve({ requestedResult: true, data: updatedPatientData });
    });
  },
  getCurrentPatient() {
    return new Promise((resolve, reject) => {
      console.log('in source');

      const updatedPatientData = [];
      singlePatient.forEach((element) => {
        const heatBeat = element.heartRate;
        const random = Math.floor((Math.random() * 100) / 10);
        let color,
          newHeartRate = element.heartRate;
        if (random > 5) {
          newHeartRate = Number(element.heartRate) + (random);
          color = 'red';
        } else {
          newHeartRate = Number(element.heartRate) - (random);
          color = 'green';
        }

        const finalObj = Object.assign({}, element, { color, heartRate: newHeartRate });

        updatedPatientData.push(finalObj);
        console.log('FINAL OBJECT going', finalObj);
      });
      resolve({ requestedResult: true, data: updatedPatientData });
    });
  },


};

export default IncomingPatientSource;
