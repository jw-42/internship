import axios from "axios";

class ApiServices {

    async getCatFact() {
        return axios.get(process.env.REACT_APP_CATFACT_API ?? 'https://catfact.ninja/fact');
    }

    async getAgeByName(name: string, options: any = undefined) {
        return axios.get(`${process.env.REACT_API_AGE_API ?? `https://api.agify.io/`}?name=${name}`, options);
    }

}

export default new ApiServices();