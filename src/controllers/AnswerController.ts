import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
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
      throw new AppError("Survey user doesn't exist!", 400);
    }

    surveyUser.value = Number(value);

    await surveyUsersRepository.save(surveyUser);
    return response.json(surveyUser);
  }
}

export { AnswerController };
