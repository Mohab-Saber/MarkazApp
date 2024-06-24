import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

const getAllTrainees = async (req, res) => {
    const trainees = await prisma.trainees.findMany({
        include : {
            courses : true
        }
    })
    res.status(200).send(trainees)
}


const addTrainee = async (req, res) => {
    const trainee = req.body;

    const opCode = await prisma.trainees.create({
        data: trainee
    })
    res.send(opCode)
}


const updateTrainee = async (req, res) => {
    const trainee = req.body;

    const opCode = await prisma.trainees.update({
        data: trainee,
        where: {id : trainee.id }
    })
    res.send(opCode)

}
const deleteTrainee = async (req, res) => {
    const trainee = req.body;

    const opCode = await prisma.trainees.delete({
        where: {id : trainee.id }
    })
    res.send(opCode)
}

module.exports = { getAllTrainees, addTrainee, updateTrainee, deleteTrainee };