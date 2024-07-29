import express from 'express';
import userRouter from './src/routers/userRouter';
import todoRouter from './src/routers/todoRouter';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/user', userRouter);
app.use('/todo', todoRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
