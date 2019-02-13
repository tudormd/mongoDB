import { Request, Response } from 'express';
import { UserController } from '../controllers/userController';
import { UniversityController } from '../controllers/universityController';
import { FacultyController } from '../controllers/facultyControllers';
import { SpecialtyController } from '../controllers/specialtyController';

export class Routes {

  public contactController: UserController = new UserController();
  public universityController: UniversityController = new UniversityController();
  public facultyController: FacultyController = new FacultyController();
  public specialtyController: SpecialtyController = new SpecialtyController();

  public routes(app): void {

    // Specialty

    app.route('/specialty').post(this.specialtyController.addNewSpecialty);
    app.route('/specialty').get(this.specialtyController.getSpecialty);
    app.route('/specialty/:specialtyId/user').put(this.specialtyController.addUser);

    // Faculty

    app.route('/faculty').post(this.facultyController.addNewFaculty);
    app.route('/faculty').get(this.facultyController.getFaculty);
    app.route('/faculty/:facultyId/specialty').put(this.facultyController.addSpecialty);

    //University

    app.route('/university').post(this.universityController.addNewUniversity);
    app.route('/university').get(this.universityController.getUniversity);
    app.route('/university/:universityId/faculty').put(this.universityController.addFaculty);

    //User

    app.route('/user').post(this.contactController.addNewUser);
    app.route('/authenticate/user').post(this.contactController.authenticateUser);

    app.route('/user').get(this.contactController.getUsers);

    app.route('/user/order/:order').get(this.contactController.orderUsers);

    app.route('/university/user').get(this.contactController.getUserByUniversity);

    app .route('/user/:userId').get(this.contactController.validateUser,this.contactController.getUserWithId);

    app.route('/user/:userId').put(this.contactController.updateUser);

    app.route('/user/:userId').delete(this.contactController.deleteUser);

    app.route('/api').get(this.contactController.validateUser);

    app.route('/user/:userId')
      .get(this.contactController.getUserWithId)
      .put(this.contactController.updateUser)
      .delete(this.contactController.deleteUser);

    app.route('/').get((req: Request, res: Response) => {
      res.status(200).send({
        message: 'GET request successful!!!!' 
      });
    });
  }
}
