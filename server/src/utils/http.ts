import axios from 'axios';

const apiRequest = async (config: any) => {
    const axiosConfig = {
        ...config,
    };

    if (!axiosConfig.timeout) {
        axiosConfig.timeout = 10000;
    }

    try {
        const response = await axios(axiosConfig);
        console.log('=====================', response.data);
        return response;
    } catch (err: any) {
        console.log('err', err);
        return { error: err.message };
    }
};

export default apiRequest;
