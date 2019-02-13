import * as mongoose from 'mongoose';
import * as bcrypt  from 'bcrypt';

const saltRounds = 10;

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name'
    }, 
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    age: {
        type: Number,
        required: 'Enter age'
    },
    university: {
        type: Schema.ObjectId,
        ref: 'University'
    }, 
    email: {
        type: String            
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    company: {
        type: String            
    },
    phone: {
        type: Number             
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    update_At: {
        type: Date,
        default: Date.now
    },

});
UserSchema.post('save', ((data)=>{
    // console.log('data', data) ;

}));

UserSchema.post('findOne', function(doc) {
    // console.log('post find 1', doc);
  })
  UserSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);    
    next();
    });


export const User = mongoose.model('User', UserSchema);
