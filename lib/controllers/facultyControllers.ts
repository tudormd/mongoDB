import { Faculty } from '../models/facultyModel';
import { Request, Response } from 'express';

export class FacultyController {

    public addNewFaculty (req: Request, res: Response) {  

        let newFaculty = new Faculty(req.body);

        newFaculty.save((err, faculty) => { 
            if(err){
                res.send(err);
            }    
            res.json(faculty);
        });
    }
    public getFaculty (req: Request, res: Response) {  

        Faculty.find( {}, (err, faculty) => {  
            if(err){
                res.send(err); 
            }
            res.json(faculty);
        });
    }
    public addSpecialty (req: Request, res: Response) {           
        Faculty.findOneAndUpdate({ _id: req.params.facultyId },{"$addToSet": {specialty:req.body.specialty } },
         {new: true}).populate('specialty').exec( (err, university) => {
            if(err){
                res.send(err);
            }
         res.json(university);
    })
 }
    
}