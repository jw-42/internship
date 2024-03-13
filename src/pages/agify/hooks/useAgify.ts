import ApiServices from "../../../shared/api/services";
import {useQuery} from "@tanstack/react-query";

export const useAgify = (name: string) => {

    return useQuery(["age", name], async ({signal}) => {
        return (await ApiServices.getAgeByName(name, {
            signal
        }))?.data?.age;
    })

}