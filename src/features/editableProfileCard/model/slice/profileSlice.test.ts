import {DeepPartial} from "@reduxjs/toolkit";
import {Country} from "entities/Country/model/types/Country";
import {Currency} from "entities/Currency/model/types/types";
import {ProfileSchema} from "features/editableProfileCard";
import {ValidateProfileError} from "../types/editableProfileCardSchema";
import {profileActions, profileReducer} from "./profileSlice";
import {updateProfileData} from "../services/updateProfileData/updateProfileData";

const testData = {
    username: 'admin',
    age: 21,
    country: Country.Russia,
    lastname: 'malin',
    first: 'andrey',
    city: 'spb',
    currency: Currency.RUB
}
describe('profileSlice.test', () => {
    test('test set readonly', () => {
        const state: DeepPartial<ProfileSchema> = {readonly: false}

        expect(profileReducer(
            state as ProfileSchema,
            profileActions.setReadonly(true)
        )).toEqual({readonly: true})
    })
    test('test cancel edit', () => {
        const state: DeepPartial<ProfileSchema> = {
            data: testData,
            form: testData,
            readonly: false,
            validateErrors: [ValidateProfileError.INCORRECT_USER_DATA]
        }

        expect(profileReducer(
            state as ProfileSchema,
            profileActions.cancelEdit()
        )).toEqual({readonly: true, validateErrors: [], data: testData, form: testData})
    })
    test('test update profile', () => {
        const state: DeepPartial<ProfileSchema> = {form: {username: ''}}

        expect(profileReducer(
            state as ProfileSchema,
            profileActions.updateProfile({username: 'test'})
        )).toEqual({
            form: {username: 'test'}
        })
    })

    test('test update profile service pending', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateErrors: [ValidateProfileError.INCORRECT_Country]
        }

        expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.pending
        )).toEqual({
            isLoading: true,
            validateErrors: []
        })
    })

    test('test update profile service fulfilled', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
            validateErrors: [ValidateProfileError.INCORRECT_Country]
        }

        expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.fulfilled(testData, '')
        )).toEqual({
            isLoading: false,
            validateErrors: [],
            readonly: true,
            form: testData,
            data: testData
        })
    })
})