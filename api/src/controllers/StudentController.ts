import AppError from '@errors/AppErro'
import Student from '@models/Students'
import { studentValidate } from '@validators'
import { Request, Response } from 'express'
import { getConnection } from 'typeorm'

import StudentRepository from '../repositories/StudentsRepository'

export default class StudentController {

    async create({ body }: Request, response: Response) {
        const
            { name, email, cpf, ra } = body,
            student = { email, name, cpf, ra } as Student,
            studentRepository = getConnection(process.env.NODE_ENV).getCustomRepository(StudentRepository);

        try {
            await studentValidate(student)
        } catch (error) {
            throw new AppError(error.errors);
        }

        try {
            const studentAlreadyExists = await studentRepository.findOne({ ra })
            if (studentAlreadyExists) return response.status(400).json({ message: 'Student alteady exists!', ra })

            const createStudent: Student = studentRepository.create(student)
            await studentRepository.save(createStudent)

            return response.status(201).json(createStudent)
        } catch (error) {
            throw new AppError(error.message, 500)
        }
    }

    async update({ body, params }: Request, response: Response) {
        const { id } = params, studentRepository = getConnection(process.env.NODE_ENV).getCustomRepository(StudentRepository)

        try {
            let student  = <Student>await studentRepository.findOne({id})
            if(!student) throw new Error("Student not exists!");
            
            student = {...student, ...body, updatedAt: new Date()}
            await studentValidate(student)

            const updatedStudent = await studentRepository.update({id}, student)
            return response.status(200).json(updatedStudent)
        } catch (error) {
            throw new AppError(error.message, 500)
        }
    }

    async remove({ params }: Request, response: Response) {
        const { id } = params, studentRepository = getConnection(process.env.NODE_ENV).getCustomRepository(StudentRepository)

        try {
            let student  = <Student>await studentRepository.findOne({id})
            if(!student) throw new Error("Student not exists!");
            
            const updatedStudent = await studentRepository.remove(student)
            return response.status(200).json(updatedStudent)
        } catch (error) {
            throw new AppError(error.message, 500)
        }
    }

    async show({ query: { limit = '10', skip = '0', keyword = '' } }: Request, response: Response) {
        const studentRepository = getConnection(process.env.NODE_ENV).getCustomRepository(StudentRepository)

        try {
            const [data, total] = await studentRepository.createQueryBuilder("user").skip(Number(skip)).limit(Number(limit))
                .where("user.name || user.cpf || user.ra || user.email like '%' || :keyword || '%'", { keyword }).getManyAndCount();

            return response.status(200).json({ data, count: data.length, limit, skip, total })
        } catch (error) {
            throw new AppError(error.message, 500)
        }
    }

    async findById({ params: { id } }: Request, response: Response) {
        const studentRepository = getConnection(process.env.NODE_ENV).getCustomRepository(StudentRepository)

        try {
            const student = await studentRepository.findOne(id) as Student
            if (!student) return response.status(404).json({ message: 'Student does not exists!' })

            response.status(200).json(student)
        } catch (error) {
            throw new AppError(error.message, 500)
        }
    }

}

