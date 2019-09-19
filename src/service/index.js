import fetch from '../utils/fetch';

const apiBase = window._api_base_;

const Service = {
    apiBase: apiBase,
    getList: (params) => {
        const api = `${apiBase}/dataApplyTypeGroup`;
        return fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
    },
    getDataSource: (id) => {
        const api = `${apiBase}/data/get?id=${id}`;
        return fetch(api, {
            method: 'GET'
        });
    },

}
export default Service