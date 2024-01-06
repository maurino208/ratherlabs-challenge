import { Router } from 'express'
import fs from 'fs'
import yaml from 'js-yaml'
import swagger from 'swagger-ui-express'

export const swaggerDocument: any = yaml.load(fs.readFileSync('./swagger.yaml', 'utf8'))

swaggerDocument.host = process.env.SWAGGER_HOST

const swaggerRouter = Router()

swaggerRouter.use('/', swagger.serve, swagger.setup(swaggerDocument))

export default swaggerRouter
