import {useQuery} from "@tanstack/react-query";
import ApiServices from "../services/api.services";

export const useCatFact = () => {

    return useQuery(["fact"], async () => {
        return(await ApiServices.getCatFact()).data.fact;
    }, {
        staleTime: 0,
        cacheTime: 0
    });

}