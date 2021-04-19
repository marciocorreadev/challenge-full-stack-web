import { EntityRepository, Repository } from "typeorm"
import Student from "@models/Students"

@EntityRepository(Student)
export default class StudentRepository extends Repository<Student> { }