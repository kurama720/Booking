import * as yup from "yup";

export const validationSchema = yup.object().shape({
    first_name: yup.string().matches(/^[a-zA-Z]+$/, "Must be only letters")
        .min(2, 'The minimum number of letters must be 2!')
        .max(32, 'The maximum number of letters must be 2!').required('The \'First Name\' field is required!'),
    last_name: yup.string().matches(/^[a-zA-Z]+$/, "Must be only letters")
        .min(2, 'The minimum number of letters must be 2')
        .max(32, 'The maximum number of letters must be 32').required('The \'Last Name\' field is required!'),

    email: yup.string().email('You’ve entered invalid e-mail!').required('The \'E-mail\' field is required!'),

    password: yup.string().matches(/^((?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,})$/,
        "Password must be at least 8 characters, one uppercase letter, one lowercase letter!"
    ).required('The \'Password\' field is required'),

    confirm_password: yup.string().oneOf([yup.ref('password')], "Password didn't match").required('The \'Confirm Password\' field is required!')
})