import { Router } from 'express'
import StudentController from '@controllers/StudentController'

const router = Router()
const studentController = new StudentController()

router.post('/students', studentController.create)
router.get('/students', studentController.show)
router.get('/students/:id', studentController.findById)
router.put('/students/:id', studentController.update)
router.delete('/students/:id', studentController.remove)

export default router