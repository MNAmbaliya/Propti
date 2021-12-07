import axios from 'axios';

const userRegister = async (requestBody) => {
    const backendApiUrl = `https://proptiapi.ignatiuslab.in/test_api.php`
    return axios.post(
        backendApiUrl,
        requestBody
    )
}

const userSignIn = async (requestBody) => {
    const backendApiUrl = `https://proptiapi.ignatiuslab.in/test_api.php`
    const res = await axios.post(
        backendApiUrl,
        requestBody
    )
    

    if(res.data.user_data.status == "true"){
        return res;
    }else{
        return false;
    }

    // return axios.post(
    //     backendApiUrl,
    //     requestBody
    // )
}

const userSignOut = async (requestBody) => {
    const backendApiUrl = `https://proptiapi.ignatiuslab.in/test_api.php`
    return axios.post(
        backendApiUrl.
        requestBody
    )
}
export {userRegister, userSignIn, userSignOut};