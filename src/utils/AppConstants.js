import { Platform } from 'react-native';

export const BRAND = 'sbm';
export const CHANNEL = Platform.OS;

export let API = {
    HOST: `http://emt-api.emtrendz.com`,
    ROUTES: `/${CHANNEL}/api/routes/${BRAND}/menu`,
    LEFT_LAYOUTS: `/${CHANNEL}/api/layout/${BRAND}/left`,
    TOP_LAYOUTS: `/${CHANNEL}/api/layout/${BRAND}/top`
};
