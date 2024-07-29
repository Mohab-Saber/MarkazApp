import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import ews from "../utility/eliminateWhiteSpace";


const getSpecialities = async (req, res) => {

    try {
        const specialities = await prisma.trainees.findMany({
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
const getJobTitles = async (req, res) => {

    try {
        const jobTitles = await prisma.trainees.findMany({
            distinct: "jobTitle",
            select: {
                id: true,
                jobTitle: true
            }
        })
        res.status(200).send(jobTitles)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}
const getQualifications = async (req, res) => {

    try {
        const qualifications = await prisma.trainees.findMany({
            distinct: "qualification",
            select: {
                id: true,
                qualification: true
            }
        })
        res.status(200).send(qualifications)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}
const getGrades = async (req, res) => {

    try {
        const qualifications = await prisma.trainees.findMany({
            distinct: "grade",
            select: {
                id: true,
                grade: true
            }
        })
        res.status(200).send(qualifications)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}
const getCount = async (req, res) => {

    try {
        const count = await prisma.trainees.count()
        res.status(200).send({ count })
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}
const getTrainee = async (req, res) => {

    try {
        const trainees = await prisma.trainees.findFirst({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                school: true
            },

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
                school: true
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
            include: {
                school: true,
                // courses: true
            }
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
            if (typeof trainee[property] === "string") { trainee[property] = ews(trainee[property]) }
        }
        const traineeSchool = trainee.school
        delete trainee.school

        if(traineeSchool.length >= 1){
            trainee.school = {
                connect: {id: traineeSchool[0]}
            }
        }
        const opCode = await prisma.trainees.create({
            data: {
                ...trainee,
            },

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
        const traineeSchool = trainee.school

        for (const property in trainee) {
            if (trainee[property] === "") { trainee[property] = null }
            if (typeof trainee[property] === "string") { trainee[property] = ews(trainee[property]) }
        }

        delete trainee.id
        delete trainee.school


        const opCode = await prisma.trainees.update({
            data: {
                ...trainee,
                school_id:  traineeSchool.length === 1 ? traineeSchool[0] : null
            },
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

module.exports = { getGrades, getQualifications, getJobTitles, getSpecialities, getCount, getTrainee, getAllTrainees, getSomeTrainees, addTrainee, updateTrainee, deleteTrainee };