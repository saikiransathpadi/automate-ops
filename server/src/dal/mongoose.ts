import mongoose from 'mongoose';

const mongoUri = `mongodb://${process.env.MONGODB_SERVER}${process.env.DB_NAME}`;
console.log(mongoUri);

export const mongooseConnect = async () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(mongoUri, (err) => {
        if (err) console.log('error while connecting to mongodb', err);
        else console.log('connected');
    });
};
