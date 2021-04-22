import app from '@app'
import createConnection from '@database'
import request from 'supertest'
import { getConnection } from 'typeorm'
import Student from '../models/Students'

const student = {
    name: "João",
    email: "joao@pedefeijao.com",
    cpf: "12345678910",
    ra: "123456789"
} as Student

describe('Students', () => {
    let studentCreated: Student;

    beforeAll(async () => await createConnection())
    afterAll(async () => await getConnection().close())

    it('Should be able to create a new student', async () => {
        const response = await request(app).post('/students').send(student)
        expect(response.status).toBe(201)
        studentCreated = response.body
        expect(studentCreated.name).toBe(student.name)
        expect(studentCreated.email).toBe(student.email)
        expect(studentCreated.cpf).toBe(student.cpf)
        expect(studentCreated.ra).toBe(student.ra)
    })

    it('Should be able to get a student by ID', async () => {
        const response = await request(app).get(`/students/${studentCreated.id}`)
        expect(response.status).toBe(200)
        expect(response.body.name).toBe(studentCreated.name)
        expect(response.body.email).toBe(studentCreated.email)
        expect(response.body.cpf).toBe(studentCreated.cpf)
        expect(response.body.ra).toBe(studentCreated.ra)
    })

    it('Should be able to get all students', async () => {
        const response = await request(app).get('/students')
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeGreaterThan(0)
        expect(true).toBe(response.body.data.some((s: Student) => s.name == student.name))
    })

    it('Should be able to update a student', async () => {
        const updateStudent = {name: 'João pé de feijão'}
        await request(app).put(`/students/${studentCreated.id}`).send(updateStudent)
        const response = await request(app).get(`/students/${studentCreated.id}`)
        expect(response.status).toBe(200)
        expect(response.body.name).toBe(updateStudent.name)
        expect(response.body.email).toBe(studentCreated.email)
        expect(response.body.cpf).toBe(studentCreated.cpf)
        expect(response.body.ra).toBe(studentCreated.ra)
    })

    it('Should be able to remove a student', async () => {
        const response = await request(app).delete(`/students/${studentCreated.id}`)
        expect(response.status).toBe(200)
        expect(response.body.email).toBe(studentCreated.email)
        expect(response.body.cpf).toBe(studentCreated.cpf)
        expect(response.body.ra).toBe(studentCreated.ra)
    })
})