const {z} = require('zod');


function emailValidator(request) {
    const schema = z.object({
        email: z.string().email(),
    });

    let message = '';
    let hasError = false;
    let errorMessage = "";

    try {
        const passed = schema.parse(request);
        return {
            hasError: false,
            message,
            data: passed
        };
    } catch (e) {
        hasError = true;
        errorMessage = e.errors[0].message;
        message = errorMessage;
        return {
            hasError,
            message,
            data: null
        };
    }

}

module.exports = {
    emailValidator
};