import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import ews from "../utility/eliminateWhiteSpace";

const getCount = async (req, res) => {

    try {
        const count = await prisma.trainees.count()
        res.status(200).send({count})
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}
const getTrainee = async (req, res) => {

    try {
        const trainees = await prisma.trainees.findFirst({
            where : {
                id : parseInt(req.params.id)
            }

        })
        res.status(200).send(trainees)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}
const getSomeTrainees = async (req, res) => {

    try {
        const trainees = await prisma.trainees.findMany({
            include: {
                courses: true
            },
            take: parseInt(req.query._limit),
            skip: (parseInt(req.query._page) - 1) * req.query._limit
        })
        res.status(200).send(trainees)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}
const getAllTrainees = async (req, res) => {
    try {
        const trainees = await prisma.trainees.findMany({
            // include: {
            //     courses: true
            // }
        })
        res.status(200).send(trainees)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}


const addTrainee = async (req, res) => {
    try {
        const trainee = req.body;
        for (const property in trainee) {
            if (trainee[property] === "") { trainee[property] = null }
        }
        delete trainee.school
        trainee.speciality = trainee.speciality[0]
        const opCode = await prisma.trainees.create({
            data: trainee
        })
        res.send(opCode)

    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}


const updateTrainee = async (req, res) => {
    try {
        const trainee = req.body;
        const traineeID = trainee.id
        for (const property in trainee) {
            if (trainee[property] === "") { trainee[property] = null }
        }
        delete trainee.id
        delete trainee.school
        trainee.speciality = trainee.speciality[0] || null
        const opCode = await prisma.trainees.update({
            data: trainee,
            where: { id: parseInt(traineeID) }
        })
        res.send(opCode)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}
const deleteTrainee = async (req, res) => {
    try {
        const opCode = await prisma.trainees.delete({
            where: { id: parseInt(req.params.id) }
        })
        res.send(opCode)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

module.exports = {getCount, getTrainee, getAllTrainees,getSomeTrainees, addTrainee, updateTrainee, deleteTrainee };