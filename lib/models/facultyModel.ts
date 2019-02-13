import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const FacultySchema = new Schema({
    name: {
        type: String,
        required: 'Enter a Faculty name'
    },
    specialty: [{
        type: Schema.ObjectId, 
        ref: 'Specialty',      
    }],
        street: { 
        type: String            
    },
    phone: {
        type: Number            
    },
    created_date: {
        type: Date,
        default: Date.now
    },
});
export const Faculty = mongoose.model('Faculty', FacultySchema);
