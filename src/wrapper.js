const URL = require('url');

export function fetch_wrapper(url, options) {
    options['headers'] = {
        "Content-Type": "application/json"
    };
    return fetch(url, options)
        .then((res) => {
            if (res.status >= 300) {
                return Promise.reject(res);
            } else return res.json();
        });
}

export function query_wrapper(url, params) {
    let searchParams = new URLSearchParams();
    for(let key of Object.keys(params)) {
        if(params[key] instanceof Object) {
            params[key] = JSON.stringify(params[key]);
        }
        searchParams.append(key, params[key]);
    }

    return url + "?" + searchParams.toString();
}
