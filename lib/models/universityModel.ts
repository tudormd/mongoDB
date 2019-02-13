import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UniversitySchema = new Schema({
    name: {
        type: String,
        required: 'Enter a University name'
    },
    country: { 
        type: String
    },
    street: {
        type: String
    },
    faculty:[ {
        type: Schema.ObjectId,
        ref: 'Faculty',
    }],
    phone: {
        type: Number            
    },
    created_date: {
        type: Date,
        default: Date.now
    },
});
export const University = mongoose.model('University', UniversitySchema);
