import express from 'express';
import cors from 'cors';
import { connectDB } from './database.js';
import adminModule from './apps/admin/index.js';
import customerModule from './apps/customer/index.js'
import authRouter from './core/utils/auth.js'
// TODO import { verifyAdmin } from './apps/admin/middleware';

const PORT = process.env.PORT || 3001;

const app = express();

// TODO Allow requests from your Vue frontend
app.use(cors({
  origin: ['https://agwaanluwsan.pages.dev', 'http://localhost:3000'],
  optionsSuccessStatus: 200,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))


app.use(express.json());

await connectDB();

app.use('/api/v1', customerModule);

app.use('/api/v1/admin', adminModule);

app.use('/api/v1/auth', authRouter)

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));


