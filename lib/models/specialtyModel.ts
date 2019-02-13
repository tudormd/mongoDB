import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const SpecialtySchema = new Schema({
    name: {
        type: String,
        required: 'Enter a Specialty name'
    },
    object:[{
        name:String,
        marks:Number
    }],
    user:[ {
        type: Schema.ObjectId, 
        ref: 'User',        
    }],
    phone: {
        type: Number            
    },
    created_date: {
        type: Date,
        default: Date.now
    },
});
export const Specialty = mongoose.model('Specialty', SpecialtySchema);
