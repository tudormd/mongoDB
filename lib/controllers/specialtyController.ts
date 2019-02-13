import { Specialty } from '../models/specialtyModel';
import { Request, Response } from 'express';

export class SpecialtyController {

    public addNewSpecialty (req: Request, res: Response) {  

        let newSpecialty = new Specialty(req.body);

        newSpecialty.save((err, specialty) => { 
            if(err){
                res.send(err);
            }    
            res.json(specialty);
        });
    }
    public getSpecialty (req: Request, res: Response) {  

        Specialty.find( {}, (err, specialty) => {  
            if(err){
                res.send(err); 
            }
            res.json(specialty);
        });
    }
    public addUser (req: Request, res: Response) {           
        Specialty.findOneAndUpdate({ _id: req.params.specialtyId },{"$addToSet": {user:req.body.user } },
         {new: true}).populate('user').exec( (err, specialty) => {
            if(err){
                res.send(err);
            }
         res.json(specialty);
    })
 }
    
}