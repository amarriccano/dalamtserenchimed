import express from 'express';
import cors from 'cors';
import { connectDB } from './database.js';
import adminModule from './apps/admin/index.js';
import customerModule from './apps/customer/index.js'
// TODO import { verifyAdmin } from './apps/admin/middleware';

const PORT = process.env.PORT || 3001;

const app = express();

// Allow requests from your Vue frontend
app.use(cors({
  origin: 'https://agwaanluwsan.pages.dev'
}));

app.use(express.json());

await connectDB();

app.use('/api/v1', customerModule);

app.use('/api/v1/admin', adminModule);

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));


