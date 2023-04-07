import ky from "ky";

const ExtendedKy = ky.extend({
    prefixUrl: 'http://5.128.221.139:7119/api',
    headers: {
        'x-apikey': '59a7ad19f5a9fa0808f11931',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
    hooks: {
        afterResponse: [
            async (request, options, response) => {
                if (!response.ok) {

                }
                return response;
            }
        ]
    }
});

export default ExtendedKy;
