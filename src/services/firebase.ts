export {};
// import remoteConfig from '@react-native-firebase/remote-config';
// import messaging from '@react-native-firebase/messaging';
// import analytics from '@react-native-firebase/analytics';

// export const fetchConfig = async () => {
//   await remoteConfig().setConfigSettings({
//     // isDeveloperModeEnabled: __DEV__,
//     minimumFetchIntervalMillis: 0,
//   });
//   await remoteConfig().fetchAndActivate();
// };

// export const refreshConfig = async () =>
//   await remoteConfig().fetchAndActivate();

// export const getRemoteValue = (key: string) =>
//   remoteConfig().getValue(key).asString();

// export const checkToken = async () => {
//   const fcmToken = await messaging().getToken();
//   if (fcmToken) {
//     console.log(fcmToken);
//   }
// };

// export const logEvent = async (
//   name: string,
//   params?:
//     | {
//         [key: string]: any;
//       }
//     | undefined,
// ) => {
//   analytics().logEvent(name, {
//     params,
//   });
// };
