import { University } from '../models/universityModel';
import { Request, Response } from 'express';

export class UniversityController {

    public addNewUniversity (req: Request, res: Response) {  

        let newUniversity = new University(req.body);

        newUniversity.save((err, user) => { 
            if(err){
                res.send(err);
            }    
            res.json(user);
        });
    }
    public getUniversity(req: Request, res: Response) {
        University.find().populate({
            path: 'faculty', populate: {
                path: 'specialty'
            }
        }).exec(function (err, data) {
            if (err) {
                res.send(err);
            }
            res.json(data);

        })
    }
    public addFaculty (req: Request, res: Response) {           
        University.findOneAndUpdate({ _id: req.params.universityId },{"$addToSet": {faculty:req.body.faculty } },
         {new: true}).populate('faculty').exec( (err, university) => {
            if(err){
                res.send(err);
            }
         res.json(university);
    })
 }
}