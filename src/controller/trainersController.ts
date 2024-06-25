import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllTrainers = async (req, res) => {
    try {
        const trainers = await prisma.trainers.findMany({
            include: {
                courses: true
            }
        })
        res.status(200).send(trainers)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}


const addTrainer = async (req, res) => {
    try {
        const trainer = req.body;
        const opCode = await prisma.trainers.create({
            data: trainer
        })
        res.send(opCode)

    } catch (error: any) {
        res.status(400).send(error.message)
    }
}


const updateTrainer = async (req, res) => {
    try {
        const trainer = req.body;

        const opCode = await prisma.trainers.update({
            data: trainer,
            where: { id: trainer.id }
        })
        res.send(opCode)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}
const deleteTrainer = async (req, res) => {
    try {
        const trainer = req.body;

        const opCode = await prisma.trainers.delete({
            where: { id: trainer.id }
        })
        res.send(opCode)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}

module.exports = { getAllTrainers, addTrainer, updateTrainer, deleteTrainer };