import { Router } from "express";
import userModel from "../dao/mongo/models/user";

const router = Router();

router.get("/", async (req, res) =>{
    const users = await userModel.find();
    res.send({status:"success",payload:users});
});

export default router;