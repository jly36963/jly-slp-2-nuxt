// imports
import admin, { ServiceAccount } from 'firebase-admin';
import config from '../config/firebase-admin.config';

// app
const serviceAccount = <ServiceAccount>config;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
// auth
export const auth = admin.auth();
