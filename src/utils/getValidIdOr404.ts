import {Request, Response} from "express";

export function getValidIdOr404(req: Request, res: Response) {
  const id = Number(req.params["id"]);
  if (isNaN(id) || id < 0) {
    res.status(400).send("Invalid ID - ID must be a positive number.");
  }
  return id;
}