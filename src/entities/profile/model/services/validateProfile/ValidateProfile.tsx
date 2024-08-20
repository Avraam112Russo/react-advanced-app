import {Profile} from "entities/profile";
import {VALIDATE_PROFILE_ERROR} from "entities/profile/model/types/profile";



// async request to backend
export const validateProfile = (profile: Profile) => {
    const {first, lastname,country, age}=profile
    const errors:VALIDATE_PROFILE_ERROR[] = [];
    if (!first || !lastname){
        errors.push(VALIDATE_PROFILE_ERROR.INCORRECT_USER_DATA)
    }
    if (!country){
        errors.push(VALIDATE_PROFILE_ERROR.INCORRECT_COUNTRY)
    }
    if (!age || !Number.isInteger(age)){
        errors.push(VALIDATE_PROFILE_ERROR.INCORRECT_AGE)
    }
    return errors;
}