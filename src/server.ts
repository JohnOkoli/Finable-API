import app from './app';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Finable API by the Lastcode Bender is running on port ${PORT}`);
});