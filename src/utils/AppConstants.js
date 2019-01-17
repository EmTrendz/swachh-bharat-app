const brand = 'rail'

export let BRAND = brand;

export let API = {
    HOST: 'http://emt-api.emtrendz.com',
    ROUTES: `/api/routes/${brand}`,
    LEFT_LAYOUTS: `/api/layout/${brand}/left`,
    TOP_LAYOUTS: `/api/layout/${brand}/top`
};
