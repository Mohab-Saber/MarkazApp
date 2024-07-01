import { PrismaClient } from "@prisma/client";
import { equal } from "node:assert";
const prisma = new PrismaClient();

const getAllCourses = async (req, res) => {
    try {
        const courses = await prisma.courses.findMany({
            include:{
                trainees: true
            }
        })
        res.status(200).send(courses)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}


const addCourse = async (req, res) => {
    try {
        const course = req.body;
        console.log(course)
        const opCode = await prisma.courses.create({
            data: course
        })
        res.send(opCode)

    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}


const updateCourse = async (req, res) => {
    try {
        const course = req.body;

        const opCode = await prisma.courses.update({
            data: course,
            where: { id: course.id }
        })
        res.send(opCode)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}
const deleteCourse = async (req, res) => {
    try {
        const course = req.body;

        const opCode = await prisma.courses.delete({
            where: { id: course.id }
        })
        res.send(opCode)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

module.exports = {getAllCourses, addCourse, updateCourse, deleteCourse};