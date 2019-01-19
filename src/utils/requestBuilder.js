const qs = require('query-string');
var moment = require('moment');

var RequestBuilder = function () {
    queryStringFiller = function (queryString) {
        if (queryString.indexOf('#today#') > 0) {
            queryString = queryString.replace('#today#', '{"startDate":' + parseInt(moment().startOf('day').format('x')) + ',"endDate":' + parseInt(moment().endOf('day').format('x')) + '}');
        }
        if (queryString.indexOf('#this_month#') > 0) {
            queryString = queryString.replace('#this_month#', '{"startDate":' + parseInt(moment().startOf('month').format('x')) + ',"endDate":' + parseInt(moment().endOf('month').format('x')) + '}');
        }
        if (queryString.indexOf('#this_week#') > 0) {
            queryString = queryString.replace('#this_week#', '{"startDate":' + parseInt(moment().startOf('week').format('x')) + ',"endDate":' + parseInt(moment().endOf('week').format('x')) + '}');
        }
        return queryString;

    }
    buildParams = function (queryString, configuration) {
        var queryObj = {};
        if (queryString && queryString.length > 2) {
            queryString = queryStringFiller(queryString);
            queryObj = qs.parse(queryString);
        }
        if (configuration.params && configuration.params.requestParams && configuration.params.requestParams.fixedQuery) {
            for (var key in configuration.params.requestParams.fixedQuery) {
                var value = configuration.params.requestParams.fixedQuery[key];
                var queryValue;
                switch (key) {
                    case "respondedon": {
                        if (value === 'today') {
                            queryValue = {
                                startDate: moment().startOf('day').format('x'),
                                endDate: moment().endOf('day').format('x')
                            }
                        } else {
                            queryValue = {};
                            if (value.startDate) {
                                queryValue.startDate = moment().startOf(value.startDate).format('x');
                            }

                            if (value.endDate) {
                                queryValue.endDate = moment().endOf(value.endDate).format('x');
                            }
                        }
                        queryValue = JSON.stringify(queryValue);
                    }
                    default: {

                    }
                }
                queryObj[key] = queryValue;

                //query += ('&' + key + '=' + (me.configuration.params.requestParams.preQuery[key]).join(','));
            }
        }
        /*if (me.configuration.params && me.configuration.params.requestParams && me.configuration.params.requestParams.preQuery) {
            for (var key in me.configuration.params.requestParams.preQuery) {
                query += ('&' + key + '=' + (me.configuration.params.requestParams.preQuery[key]).join(','));
            }
        }*/
        queryString = qs.stringify(queryObj, { encode: false });
        if (queryString && queryString.indexOf('?') < 0) {
            queryString = '?&' + queryString;
        }
        var reqParams = Object.assign({
            widgetUID: configuration.uid,
            query: queryString
        }, configuration.params.requestParams);
        return reqParams;
    }
    return {
        buildParams: buildParams
    }
}
export default RequestBuilder();