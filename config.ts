import 'dotenv/config';
import { writeFile } from 'fs';
const targetPathProd = './src/environments/environment.prod.ts';
const targetPath = './src/environments/environment.ts';

// Environment variables definition
const envConfigFileProd = `export const environment = {
  production: true,
  FirebaseConfig: {
    apiKey: '${process.env['firebaseApiKey']}',
    authDomain: '${process.env['authDomain']}',
    databaseURL: '${process.env['databaseURL']}',
    projectId: '${process.env['projectId']}',
    storageBucket: '${process.env['storageBucket']}',
    messagingSenderId: '${process.env['messagingSenderId']}',
    appID: '${process.env['appId']}',
    measurementId: '${process.env['measurementId']}',
  }
}`;

const envConfigFile = `export const environment = {
  production: false,
  FirebaseConfig: {
    apiKey: '${process.env['firebaseApiKey']}',
    authDomain: '${process.env['authDomain']}',
    databaseURL: '${process.env['databaseURL']}',
    projectId: '${process.env['projectId']}',
    storageBucket: '${process.env['storageBucket']}',
    messagingSenderId: '${process.env['messagingSenderId']}',
    appID: '${process.env['appId']}',
    measurementId: '${process.env['measurementId']}',
  }
}`;

// console.group('environment variables endpoints:')
//   console.log('apiURL:', process.env.DOMAIN + '/api/',)
//   console.log('apiUsage:', process.env.DOMAIN_USAGE + '/api/',)
//   console.log('eventsApiURL:', process.env.DOMAIN_EVENTS + '/api/',)
//   console.log('accountsApiURL:', process.env.DOMAIN_ACCOUNTS + '/',)
//   console.log('apiMessagesURL:', process.env.DOMAIN_MESSAGES + '/api/',)
//   console.log('apiSubscriptionsURL:', process.env.DOMAIN_SUBSCRIPTIONS + '/api/',)
//   console.log('imgixDomain:', process.env.imgixURL + '/',)
//   console.log('');
// console.groupEnd


writeFile(targetPathProd, envConfigFileProd, 'utf-8', (err) => {
  if (err) {
    console.error(err);
  }
});
writeFile(targetPath, envConfigFile, 'utf-8', (err) => {
  if (err) {
    console.error(err);
  }
});
