import {validateProfileData} from "entities/Profile/model/services/validateProfile/validateProfileData";
import {Country} from "entities/Country/model/types/Country";
import {Currency} from "entities/Currency/model/types/types";
import {ValidateProfileError} from "entities/Profile/model/types/profile";


const testData = {
    username: 'admin',
    age: 21,
    country: Country.Russia,
    lastname: 'malin',
    first: 'andrey',
    city: 'spb',
    currency: Currency.RUB
}


describe('validateProfileData.test', () => {
    test('success', async () => {
        const result = validateProfileData(testData)

        expect(result).toEqual([])
    })

    test('without first and last', async () => {
        const result = validateProfileData({...testData, first: '', lastname: ''})

        expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA])
    })
    test('incorrect age', async () => {
        const result = validateProfileData({...testData, age: undefined})

        expect(result).toEqual([ValidateProfileError.INCORRECT_AGE])
    })
    test('incorrect country', async () => {
        const result = validateProfileData({...testData, country: undefined})

        expect(result).toEqual([ValidateProfileError.INCORRECT_Country])
    })
    test('incorrect all', async () => {
        const result = validateProfileData({})

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_Country
        ])
    })
})