import axios from "axios";

class ApiServices {

    async getCatFact() {
        return axios.get(process.env.REACT_APP_CATFACT_API_URL ?? 'https://catfact.ninja/fact');
    }

    async getAgeByName(name: string, options: any = undefined) {
        return axios.get(`${process.env.REACT_API_AGE_API_URL ?? `https://api.agify.io/`}?name=${name}`, options);
    }

}

export default new ApiServices();