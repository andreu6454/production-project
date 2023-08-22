import {Currency} from "@/entities/Currency/model/types/types";
import {Country} from "@/entities/Country/model/types/Country";


export interface Profile {
    first?: string,
    lastname?: string,
    age?: number,
    currency?: Currency,
    country?: Country,
    city?: string,
    username?: string,
    avatar?: string,
    id?: string,
}

