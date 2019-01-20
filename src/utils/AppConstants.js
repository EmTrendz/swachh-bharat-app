import { Platform } from 'react-native';

export const BRAND = 'rail';
export const CHANNEL = Platform.OS;

export let API = {
    HOST: `http://emt-api.emtrendz.com`,
    ROUTES: `/api/routes/${BRAND}/menu`,
    LEFT_LAYOUTS: `/api/layout/${BRAND}/left`,
    TOP_LAYOUTS: `/api/layout/${BRAND}/top`
};
