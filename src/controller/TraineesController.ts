import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import ews from "../utility/eliminateWhiteSpace";


const getAllTrainees = async (req, res) => {
    try {
        const trainees = await prisma.trainees.findMany({
            include: {
                courses: true
            }
        })
        res.status(200).send(trainees)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}


const addTrainee = async (req, res) => {
    try {
        const trainee = req.body;
        const opCode = await prisma.trainees.create({
            data: trainee
        })
        res.send(opCode)

    } catch (error: any) {
        res.status(400).send(error.message)
    }
}


const updateTrainee = async (req, res) => {
    try {
        const trainee = req.body;

        const opCode = await prisma.trainees.update({
            data: trainee,
            where: { id: trainee.id }
        })
        res.send(opCode)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}
const deleteTrainee = async (req, res) => {
    try {
        const trainee = req.body;

        const opCode = await prisma.trainees.delete({
            where: { id: trainee.id }
        })
        res.send(opCode)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}

module.exports = { getAllTrainees, addTrainee, updateTrainee, deleteTrainee };