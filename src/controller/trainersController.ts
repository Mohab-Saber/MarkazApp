import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import ews from "../utility/eliminateWhiteSpace";

const getCount = async (req, res) => {

    try {
        const count = await prisma.trainers.count()
        res.status(200).send({ count })
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}
const getSpecialities = async (req, res) => {

    try {
        const specialities = await prisma.trainers.findMany({
            distinct: "speciality",
            select: {
                id: true,
                speciality: true
            }
        })
        res.status(200).send(specialities)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}
const getTrainer = async (req, res) => {

    try {
        const trainers = await prisma.trainers.findFirst({
            where: {
                id: parseInt(req.params.id)
            }

        })
        res.status(200).send(trainers)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}
const getSomeTrainers = async (req, res) => {

    try {
        const trainers = await prisma.trainers.findMany({
            include: {
                courses: true
            },
            take: parseInt(req.query._limit),
            skip: (parseInt(req.query._page) - 1) * req.query._limit
        })
        res.status(200).send(trainers)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

const getAllTrainers = async (req, res) => {
    try {
        const trainers = await prisma.trainers.findMany({
            include: {
                // courses: true
            }
        })
        res.status(200).send(trainers)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}


const addTrainer = async (req, res) => {
    try {
        const trainer = req.body;
        for (const property in trainer) {
            if (trainer[property] === "") { trainer[property] = null }
            if (typeof trainer[property] === "string") { trainer[property] = ews(trainer[property]) }
        }
        const opCode = await prisma.trainers.create({
            data: trainer
        })
        res.send(opCode)

    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}


const updateTrainer = async (req, res) => {
    try {
        const trainer = req.body;
        const trainerID = trainer.id
        delete trainer.id
        for (const property in trainer) {
            if (trainer[property] === "") { trainer[property] = null }
            if (typeof trainer[property] === "string") { trainer[property] = ews(trainer[property]) }
        }
        const opCode = await prisma.trainers.update({
            data: trainer,
            where: { id: parseInt(trainerID) }
        })
        res.send(opCode)
    } catch (error: any) {
        console.log(error, `\n======================\n`)
        res.status(400).send(error.message)
    }
}
const deleteTrainer = async (req, res) => {
    try {
        const opCode = await prisma.trainers.delete({
            where: { id: parseInt(req.params.id) }
        })
        res.send(opCode)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

module.exports = { getSpecialities, getCount, getTrainer, getAllTrainers, getSomeTrainers, addTrainer, updateTrainer, deleteTrainer };