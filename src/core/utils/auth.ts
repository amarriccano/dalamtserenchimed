import { Router, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

const router = Router()

router.post('/login', (req: Request, res: Response) => {
  const { password } = req.body

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid password.' })
  }

  const token = jwt.sign(
    { role: 'admin' },
    process.env.JWT_SECRET as string,
    { expiresIn: '8h' }
  )

  res.json({ token })
})

export default router