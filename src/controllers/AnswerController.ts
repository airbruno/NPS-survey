import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyUserRepository } from "../repositories/SurveyUsersRepository";

class AnswerController {

  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const surveyUsersRepository = getCustomRepository(SurveyUserRepository)

    const surveyUser = await surveyUsersRepository.findOne({
      id: String(u)
    });

    if (!surveyUser) {
      return response.status(400).json({
        error: "Survey user doesn't exist!"
      })
    }

    surveyUser.value = Number(value);

    await surveyUsersRepository.save(surveyUser);
    return response.json(surveyUser);
  }
}

export { AnswerController };
