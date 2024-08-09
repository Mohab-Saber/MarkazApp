import { PrismaClient } from "@prisma/client";
import ews from "../utility/eliminateWhiteSpace";
const prisma = new PrismaClient();

const getCount = async (req, res) => {

    try {
        const count = await prisma.courses.count()
        res.status(200).send({ count })
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}
const getSubjects = async (req, res) => {

    try {
        const subjects = await prisma.courses.findMany({
            distinct: "subject",
            select: {
                id: true,
                subject: true
            }
        })
        res.status(200).send(subjects)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}
const getCourseLevels = async (req, res) => {

    try {
        const courseLevels = await prisma.courses.findMany({
            distinct: "courseLevel",
            select: {
                id: true,
                courseLevel: true
            }
        })
        res.status(200).send(courseLevels)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

const getCourse = async (req, res) => {

    try {
        const courses = await prisma.courses.findFirst({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                trainers: true,
                trainees: {
                    orderBy: {
                        fullName: "asc"
                    }
                }
            }
        })
        res.status(200).send(courses)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}
const getSomeCourses = async (req, res) => {
    try {
        const courses = await prisma.courses.findMany({
            include: {
                trainees: true,
                trainers: true,
            },
            take: parseInt(req.query._limit) || 5,
            skip: (parseInt(req.query._page) - 1) * parseInt(req.query._limit)
        })
        res.status(200).send(courses)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

const getAllCourses = async (req, res) => {
    try {
        const courses = await prisma.courses.findMany({
            include: {
                trainers: {
                    select: {
                        id: true,
                        fullName: true,

                    }
                },
                trainees: {
                    select: {
                        id: true,
                        fullName: true,
                        nationalID: true
                    },
                    orderBy:{
                        fullName: "asc",
                    }
                }
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
        for (const property in course) {
            if (course[property] === "") { course[property] = null }
            if (typeof course[property] === "string") { course[property] = ews(course[property]) }
        }
        const opCode = await prisma.courses.create({
            data: {
                ...course,
                trainers: { connect: course.trainers },
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
            if (typeof course[property] === "string") { course[property] = ews(course[property]) }
        }
        const courseID = course.id;
        const trainees = course.selectedTrainees;
        const trainers = course.selectedTrainers;
        course.courseCode = course.courseCode || null
        course.attendanceDays = course.attendanceDays || null

        delete course.id; delete course.selectedTrainers; delete course.selectedTrainees;

        const myCourse = await prisma.courses.findUnique({
            where: {
                id: courseID
            },
            include: {
                trainers: true,
                trainees: true
            }
        })
        if (!myCourse) {
            throw new Error('User not found');
        }

        const disconnectTrainees = myCourse.trainees.map(e => {
            return { id: e.id };
        });
        const disconnectTrainers = myCourse.trainers.map(e => {
            return { id: e.id };
        });

        const deletedCourseRelations = await prisma.courses.update({
            data: {
                trainees:{
                    disconnect: disconnectTrainees
                },
                trainers:{
                    disconnect: disconnectTrainers
                }
            },
            where: { id: courseID }

        })

        const opCode = await prisma.courses.update({
            data: {
                ...course,
                trainees: {
                    connect: trainees.map((e) => ({id: e}))
                },
                trainers: {
                    connect: trainers.map((e) => ({id: e}))
                },

            },
            where: { id: courseID }

        })
        res.send(opCode)


    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}
const deleteCourse = async (req, res) => {
    try {
        const opCode = await prisma.courses.delete({
            where: { id: parseInt(req.params.id) }
        })
        res.send(opCode)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

module.exports = { getSubjects, getCourseLevels, getCount, getCourse, getSomeCourses, getAllCourses, addCourse, updateCourse, deleteCourse };