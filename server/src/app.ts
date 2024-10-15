import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './routes/authRoute';
import profileRoute from './routes/profileRoute';
import forgotPasswordRoute from './routes/forgotPassword';
import blogRoute from './routes/blogRoute';

const app: Application = express();

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/forgotPassword', forgotPasswordRoute);
app.use('/api/v1/profile', profileRoute);
app.use('/api/v1/blog', blogRoute);

export default app;
