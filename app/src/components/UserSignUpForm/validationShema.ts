import * as yup from "yup";


//validate schema
export const validationSchema = yup.object().shape({

    first_name: yup.string().matches(/^[a-zA-Z]+$/, "Must be only letters")
        .min(2, 'The minimum letters be 2!')
        .max(32, 'The maximum letters be 2!').required('First Name is required!'),
    last_name: yup.string().matches(/^[a-zA-Z]+$/, "Must be only letters")
        .min(2, 'The minimum letters be 2!')
        .max(32, 'The maximum letters be 32!').required('Last Name is required!'),

    email: yup.string().email('You’ve entered invalid e-mail!').required('E-mail is required!'),

    password: yup.string().matches(/^((?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,})$/,
        "Password must be at least 8 characters, one uppercase letter, one lowercase letter!"
    ).required('The Password is required'),

    confirm_password: yup.string().oneOf([yup.ref('password')], "The passwords don't match!").required('Confirm Password is required!')
})