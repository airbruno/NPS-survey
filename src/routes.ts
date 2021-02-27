import { Router } from 'express';
import { SurveyController } from './controllers/SurveyControler';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();

router.post('/surveys', surveyController.create);
router.post('/users', userController.create);

router.get('/surveys', surveyController.show);

export { router };
