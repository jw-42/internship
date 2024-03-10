import {useQuery} from "@tanstack/react-query";
import ApiServices from "../services/api.services";

export const useAgify = (name: string) => {

    return useQuery(["age", name], async ({signal}) => {
        return (await ApiServices.getAgeByName(name, {
            signal
        }))?.data?.age;
    })

}