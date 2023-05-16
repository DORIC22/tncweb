import ky from "ky";

const ExtendedKy = ky.extend({
    prefixUrl: 'http://192.168.0.107:7119/api',
    credentials: 'include',
    throwHttpErrors: false,
    headers: {
        'x-apikey': '59a7ad19f5a9fa0808f11931',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
    hooks: {
        beforeError: [],
        beforeRequest: [
            request => {
                const useCookie = localStorage.getItem('useCookie') === 'true'

                if (useCookie)
                    return

                const accessToken = localStorage.getItem('accessToken')

                if (!useCookie && accessToken !== null) {
                    request.headers.set('Authorization', `Bearer ${accessToken}`)
                }
            }
        ],
        afterResponse: [
            async (request, options, response) => {
                if (response.status === 401) {
                    if (request.method === 'HEAD' && request.url.includes('auth'))
                        return response

                    console.log('Update access token')
                    await ExtendedKy.put("auth")
                }

                return response
            }
        ]
    }
});

export default ExtendedKy;
