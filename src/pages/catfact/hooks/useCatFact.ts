import ApiServices from "../../../shared/api/services";
import {useQuery} from "@tanstack/react-query";

export const useCatFact = () => {

    return useQuery(["fact"], async () => {
        return(await ApiServices.getCatFact()).data.fact;
    }, {
        staleTime: 0,
        cacheTime: 0
    });

}