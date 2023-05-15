import ky from "ky";

const ExtendedKy = ky.extend({
    prefixUrl: 'http://192.168.0.107:7119/api',
    credentials: 'include',
    throwHttpErrors: false,
    hooks: {
        beforeError: [],
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
