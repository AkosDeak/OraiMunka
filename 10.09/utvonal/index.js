import express from 'express';
import olvasoRoutes from './routes/olvaso.js';

const app = express();
app.use('/olvaso', olvasoRoutes);
app.use('/konyv', olvasoRoutes);

app.listen(3000,() => {
    console.log("http://localhost:3000");
})