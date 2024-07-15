import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getCourse = async (req, res) => {

    try {
        const courses = await prisma.courses.findFirst({
            where: {
                id: parseInt(req.params.id)
            },
            include:{
                trainer: true,
                trainees: true
            }
        })
        res.status(200).send(courses)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}

const getAllCourses = async (req, res) => {
    try {
        const courses = await prisma.courses.findMany({
            // include:{
            //    trainer:{
            //     select:{
            //         fullName: true
            //     }
            //    },
            //     trainees: {
            //         select:{
            //             fullName: true
            //         }
            //     }
            // }
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
        for (const property in course) {
            if (course[property] === "") { course[property] = null }
        }
        const opCode = await prisma.courses.create({
            data: {
                subject: course.subject,
                startDate: course.startDate,
                finishDate: course.finishDate,
                attendanceDays: parseInt(course.attendanceDays),
                courseCode: parseInt(course.courseCode),
                courseLevel: course.courseLevel,
                trainer: { connect: { id: course.trainer } },
                trainees: { connect: course.trainees }
            }
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
        for (const property in course) {
            if (course[property] === "") { course[property] = null }
        }
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

module.exports = { getCourse, getAllCourses, addCourse, updateCourse, deleteCourse };