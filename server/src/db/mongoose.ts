import mongoose from 'mongoose';

const mongoUri = `mongodb://${process.env.local ? 'host.docker.internal:27017/' : process.env.MONGODB_SERVER}${process.env.DB_NAME}`;
console.log(mongoUri);

export const mongooseConnect = async () => {
    mongoose.set('strictQuery', true);
    console.log('Connecting to MongoDb.....');
    try {
        await mongoose.connect(mongoUri, {});
        console.log('connected to db');
    } catch (err: any) {
        console.error('Error while connecting to db', err.message);
    }
};
