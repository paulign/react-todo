import config from '../config';

export const apiRequest = async (url, method = 'GET', body = null, contentType = 'application/json') => {
    try {
        let { apiURL } = config,
            headers = new Headers(),
            responseStatus;
        headers.append("Content-Type", contentType);
        let response = await fetch(apiURL + url, { method, body, headers });
        responseStatus = response.status;

        let data = await (response.json());
        console.log(data);

        if (response.status === 200) {
            return data;
        }

        else {
            throw new Error(data.message)
        }

    } catch (error) {
        console.log(error);
        throw new Error(error.message)
    }
}