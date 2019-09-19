import RFetch from '@r-ui/fetch';
import {
    message
} from 'antd';

const fetch = async (url, options) => {
    let response;
    try {
        response = await RFetch({
            url: url,
            credentials: 'include',
            redirect: 'manual',
            ...options
        });
    }
    catch (err) {
        let e = new Error('服务器开小差了');
        e.consumed = true;
        message.error(e.message);
        throw e;
    }
    const success = response.status == '200';
    let jsonResponse;
    try {
        jsonResponse = await response.json();
    }
    catch (e) {
        if (success) {
            throw e;
        }
        else {
            throw JSON.stringify({
                statusCode: response.status,
                message: JSON.stringify(e)
            }); 
        }
    }
    try {
        if (success) {
            if (jsonResponse.code && jsonResponse.code != '0000') {
                throw new Error(jsonResponse.message || jsonResponse.msg);
            }
            return jsonResponse;
        }
        else {
            throw new Error(jsonResponse.message || jsonResponse.error);
        }
    }
    catch (e) {
        if (e instanceof Error) {
            e.consumed = true;
            message.error(e.message);
            throw e;
        }
    }
};

export default fetch;