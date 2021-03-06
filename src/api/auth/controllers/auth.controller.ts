import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { sign } from 'jsonwebtoken';
import Sequelize from 'sequelize';
import { config } from '../../../config';
import { signUpService } from '../services/auth.service';

export const signUpController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await signUpService({
      dni: req.body.dni,
      cellphone: req.body.cellphone,
      email: req.body.email,
      name: req.body.name,
      lastname: req.body.lastname,
      password: req.body.password,
      sexo: req.body.sexo,
      date: req.body.date,
      image: req.body.image,
    });
    res.status(200).json('¡usuario creado!');
  } catch (err: any) {
    if (err instanceof Sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};
export const signInController = (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwt = sign({ _id: req.body.id }, config.SECRET_HIDDEN_KEY);

    res.status(200).json({
      name: req.body.name,
      lastname: req.body.lastname,
      date: req.body.date,
      sexo: req.body.sexo,
      path: req.body.path,
      rol_id: req.body.rol_id,
      sub_rol_id: req.body.sub_rol_id,
      jwt,
    });
  } catch (err: any) {
    if (err instanceof Sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};
