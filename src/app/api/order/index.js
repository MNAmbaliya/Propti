import axios from 'axios';
const loadReportFromDB = async (address) => {
    const backendApiUrl = `${process.env.REACT_APP_BACKEND_API_URL}/v1/strata?address=${address.formatted_address}`
    return axios.get(
        backendApiUrl
    )
}

export {loadReportFromDB};