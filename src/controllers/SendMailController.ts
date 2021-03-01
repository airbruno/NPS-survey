import { Request, Response } from "express";
import { resolve } from 'path';
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveyRepository } from '../repositories/SurveyRepository';
import { SurveyUserRepository } from '../repositories/SurveyUsersRepository';
import { UsersRepository } from "../repositories/UserRepository";
import SendMailService from '../services/SendMailService';

class SendMailController {

  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveyRepository);
    const surveyUsersRepository = getCustomRepository(SurveyUserRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new AppError("User doesn't exist!", 400);
    }

    const survey = await surveysRepository.findOne({ id: survey_id });

    if (!survey) {
      throw new AppError("Survey doesn't exist!", 400);
    }

    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

    const surveyUserAlreadyExists = await surveyUsersRepository.findOne({
      where: { user_id: user.id, value: null },
      relations: ['user', 'survey'],
    });

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: "",
      link: process.env.URL_MAIL,
    };

    if (surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;
      await SendMailService.execute(email, survey.title, variables, npsPath);
      return response.json(surveyUserAlreadyExists);
    }

    // Salvar informaç~oes na tabela
    const surveyUser = surveyUsersRepository.create({
      user_id: user.id,
      survey_id
    });

    await surveyUsersRepository.save(surveyUser);
    variables.id = surveyUser.id;
    // Enviar email
    await SendMailService.execute(email, survey.title, variables, npsPath);

    return response.json(surveyUser);

  }
}

export { SendMailController };
