import {StateSchema} from "@/app/providers/StoreProvider";
import {getLoginError} from "@/features/AuthByUsername/model/selectors/getLoginError/getLoginError";

import {ValidateProfileError} from "../../types/editableProfileCardSchema";
import {
    getProfileValidateErrors
} from "./getProfileValidateErrors";

describe('getProfileValidateErrors.test', () => {
    test('should return profile validateErrors', () => {

        const state: DeepPartial<StateSchema> = {
            profile: {
                validateErrors: [
                    ValidateProfileError.SERVER_ERROR,
                    ValidateProfileError.INCORRECT_AGE,
                ],
            }
        }

        expect(getProfileValidateErrors(state as StateSchema)).toEqual([
            ValidateProfileError.SERVER_ERROR,
            ValidateProfileError.INCORRECT_AGE,
        ])
    })
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getLoginError(state as StateSchema)).toEqual(undefined)
    })
})