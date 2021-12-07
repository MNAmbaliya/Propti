import axios from 'axios'
const querystring = require('querystring');
export const  getDomainApiAcccessToken = async () => {
    const data = querystring.stringify({
        grant_type: 'client_credentials',
        scope: 'api_agencies_read api_listings_read'
    });
    const res = await axios.post(
        process.env.REACT_APP_GET_DOMAIN_API_TOKEN_URL,
        data,
        {
            headers: {
                'Authorization': `Basic ${base64(`${process.env.REACT_APP_DOMAIN_API_OAUTH_CLIENT_ID}:${process.env.REACT_APP_DOMAIN_API_OAUTH_CLIENT_SECRET}`)}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
    )
    return res;
}

function base64(str) {
    return Buffer.from(str).toString('base64')
}


export const getPropertyOfAddress = async (address) => {
    const api_url = `${process.env.REACT_APP_DOMAIN_API_URL}/v1/listings/residential/_search`;
    
}