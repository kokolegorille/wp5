// Capitalize the first letter of a string
// https://flexiple.com/javascript-capitalize-first-letter/
export const capitalizeFirst = str => str.charAt(0).toUpperCase() + str.slice(1);

export const handleError = (key, error) => {
    if (!error) { return }

    if (error.type) {
        // Standard hook error
        switch (error.type) {
            case "required":
                return `${key} is required`
            case "minLength":
                return `${key} is too short`
            case "maxLength":
                return `${key} is too long`
            case "pattern":
                return `${key} invalid format`
            default:
                return `${key} ${error.type} error`
        }
    } else if (Array.isArray(error)) {
        // Error from api
        return error.join(", ")
    } else {
        // Unknown error
        return `${key} undefined error`
    }
};