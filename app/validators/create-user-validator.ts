import * as Yup from 'yup';
export const CreateUserValidator: Yup.ObjectSchema = Yup.object()
    .shape({
        email: Yup.string()
            .trim()
            .email()
            .max(60)
            .required(),
        name: Yup.string()
            .trim()
            .max(50)
            .min(3)
            .required(),
    })
    .required();
