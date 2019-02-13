import { User } from '../models/userModel';
import { Request, Response } from 'express';
import * as bcrypt  from 'bcrypt';
import * as jwt  from 'jsonwebtoken';

export class UserController { 

public addNewUser (req: Request, res: Response) {  

        let newUser = new User(req.body);

        newUser.save((err, user) => {
            if(err){
                res.send(err);
            }    
            res.json(user);
        });

    }

    public getUsers (req: Request, res: Response) {           
        User.find( {}, (err, users) => {  
            // await User.updateMany({}, { $set: { firstName: 'firstName' } });     
            if(err){
                res.send(err); 
            }
            res.json(users);
        });
    }
    public orderUsers (req: Request, res: Response) {
        User.find(() => {  
        }).sort({lastName:req.params.order}).exec(function(err, model){
            if(err){
                res.send(err); 
            }
            res.json(model);
        })
    }
    public getUserByUniversity (req: Request, res: Response) {
        User.find({}).where('universityId').ne(null).exec( ((err, data)=>{
            if(err){
                res.send(err);
            }
            res.json(data);
        }))
    };

    public getUserWithId (req: Request, res: Response) {  
        User.findById(req.params.userId,{}, (err, user) => {
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }
    public  validateUser (req: Request, res: Response, next) {  
        const token =  req.body.token || req.query.token || req.headers['x-access-token'];
        jwt.verify(token, req.app.get('secretKey'), function(err, decoded) {
            if (err) {
              res.json({status:"error", message: err.message, data:null});
            }else{
              req.params.userId = decoded.id;
              next();
            }
          });
    }

    public authenticateUser (req: Request, res: Response) {           
        User.findOne({email:req.body.email}, (err, user) => {            
            if(err){
                res.send(err);
            } 
            else {
                if (user && bcrypt.compareSync(req.body.password, user.password)) {
                    const token = jwt.sign({ id: user._id }, req.app.get('secretKey'), { expiresIn: '1h' });
                    
                    res.json({ status: "success", message: "user found!!!", data: { user: user, token: token } });
                } else {
                    res.json({ status: "error", message: "Invalid email/password!!!", data: null });
                }
            }
        
        });
    }
    public updateUser (req: Request, res: Response) {           
        User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, user) => {
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }

    public deleteUser (req: Request, res: Response) {           
        User.remove({ _id: req.params.userId }, (err, user) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted contact!'});
        });
    }
}