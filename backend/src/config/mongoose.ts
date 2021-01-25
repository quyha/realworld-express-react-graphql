import mongoose from 'mongoose';
// import beautifulUnique from 'mongoose-beautiful-unique-validation';

// mongoose.plugin(beautifulUnique);

export default mongoose.connect(process.env.MONGODB_URL ?? '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
