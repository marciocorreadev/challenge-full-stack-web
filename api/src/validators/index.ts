import * as yup from 'yup'
import Student  from '@models/Students'

function studentValidate(student: Student) {
    return yup.object().shape({
        name: yup.string().required(),
        ra: yup.string().required(),
        cpf: yup.string().required(),
        email: yup.string().email().required()
    }).validate(student, { abortEarly: false })
}

export { studentValidate }