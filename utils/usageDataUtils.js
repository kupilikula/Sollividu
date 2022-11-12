import statisticsUtils from './statisticsUtils';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import * as RNLocalize from 'react-native-localize';

const SOLLIVIDU_POST_DATA_URL =
  'https://ztuholx66bs4szatgqasabzxci0gepqv.lambda-url.us-east-2.on.aws/postGameData';
const APP_ID = 'BCB9C644-3F19-4BA1-B2C8-39B2463EBDE3';

const sendUsageData = () => {
  const deviceUniqueId = DeviceInfo.getUniqueIdSync();
  const deviceInfo = {
    deviceId: DeviceInfo.getDeviceId(),
    deviceManufacturer: DeviceInfo.getManufacturerSync(),
    deviceModel: DeviceInfo.getModel(),
    systemVersion: DeviceInfo.getSystemVersion(),
    appVersion: DeviceInfo.getVersion(),
    appName: DeviceInfo.getApplicationName(),
    deviceName: DeviceInfo.getDeviceNameSync(),
    country: RNLocalize.getCountry(),
    timeZone: RNLocalize.getTimeZone(),
  };

  const games = statisticsUtils.getGameDataArrays();

  // axios
  //   .get('https://38.124.64.205:3000/test')
  //   .then(res => console.log('get res:', res))
  //   .catch(err => console.log('get err:', err));
  console.log(
    'sending games data to backend. deviceInfo:',
    deviceInfo,
    'games:',
    games
  );
  axios
    .post(
      SOLLIVIDU_POST_DATA_URL,
      {deviceUniqueId, deviceInfo, games},
      {app_id: APP_ID}
    )
    .then(response => console.log('post game data response:', response))
    .catch(err => console.log('post game data err:', err));
};

module.exports = {sendUsageData};
