import * as yup from "yup";

export const validationSchema =  yup.object().shape({
    check_in: yup.string().required('Check-in is required!'),
    check_out: yup.string().required('Check-out is required')
})
