import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllCourses = async (req, res) => {
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


const addCourse = async (req, res) => {
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


const updateCourse = async (req, res) => {
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
const deleteCourse = async (req, res) => {
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

module.exports = {getAllCourses, addCourse, updateCourse, deleteCourse};