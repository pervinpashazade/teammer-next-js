const validation_422 = (error) => {
    var error_response = error.response.data.error;
    var validation_responses = {};
    if (error_response.validation) {
        for (let [key, value] of Object.entries(error_response.validation)) {
            if (value.length > 0) {
                validation_responses[key] = value[0];
            }
        }
    }
    return validation_responses;
}

export default validation_422;