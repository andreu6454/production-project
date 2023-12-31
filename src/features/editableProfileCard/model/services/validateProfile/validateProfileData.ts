import {Profile} from "@/entities/Profile";

import {ValidateProfileError} from "../../types/editableProfileCardSchema";

export const validateProfileData = (profile?: Profile) => {
    if(!profile){
        return [ValidateProfileError.NO_DATA]
    }

    const {
        first,
        lastname,
        age,
        country
    } = profile

    const errors: ValidateProfileError[] = []


    if (!first || !lastname) {
        errors.push(ValidateProfileError.INCORRECT_USER_DATA)
    }

    if (Number.isNaN(age) || age === 0 || age === undefined) {
        errors.push(ValidateProfileError.INCORRECT_AGE)
    }

    if (!country) {
        errors.push(ValidateProfileError.INCORRECT_Country)
    }

    return errors
}