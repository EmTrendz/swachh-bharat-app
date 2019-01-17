import axios from 'axios';
import {API} from './AppConstants';

var server = function axiosUtil() {
    //  if($cookies.get('token') && Util.isSameOrigin(config.url)) {
    //         config.headers.Authorization = `Bearer ${$cookies.get('token')}`;
    //       }
    var axiosObj = axios.create({
        baseURL: API.HOST,
        timeout: 5000,
        withCredentials: true
    });
    axiosObj.interceptors.request.use(
        config => {
            config.headers['accept-language'] = 'en_US';
            config.headers['Cookie'] = 'pong=s%3Au6ZvdAP9lQOV1xQvm89HHWha1mtOBG4L.poJmWvxxIVQYq8txprZ2nXpgLXwp1MisEBOVH6BsPkY'
            /*if (!config.headers.Authorization) {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }*/
            return config;
        },
        error => {
            Promise.reject(error)
        }
    );
    axiosObj.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error && error.response && error.response.status === 401) {
            //place your reentry code
            return error.response
        }
        return error;
    });
    return {
        // requires the url for get
        getData: function (url) {
            console.log(url);
            return axiosObj.get(url);
        },
        // requires URL and the post data object
        postData: function (url, data) {
            console.log(url);
            return axiosObj.post(url, data);
        },
        putData: function (url, data) {
            return axiosObj.put(url, data);
        },
        deleteData: function (url) {
            return axiosObj.delete(url);
        }
    }
};
export default server();
