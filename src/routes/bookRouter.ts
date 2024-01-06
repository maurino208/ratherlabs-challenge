import express from 'express'

import { getBookController } from '../controller/bookController'
import { marketController } from '../controller/marketController'
import swaggerRouter from '../utils/swagger'

const router = express.Router()

router.use('/swagger', swaggerRouter)
router.get('/book', getBookController)
router.post('/market', marketController)

export default router
