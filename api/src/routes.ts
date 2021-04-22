import { Router } from 'express'
import StudentController from '@controllers/StudentController'
import IndexController from '@controllers/IndexController'

const router = Router()
const studentController = new StudentController()
const indexController = new IndexController()

router.get('/ping', indexController.ping)
router.post('/students', studentController.create)
router.get('/students', studentController.show)
router.get('/students/:id', studentController.findById)
router.put('/students/:id', studentController.update)
router.delete('/students/:id', studentController.remove)

export default router