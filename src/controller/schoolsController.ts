import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import ews from "../utility/eliminateWhiteSpace";

const getCount = async (req, res) => {

    try {
        const count = await prisma.schools.count()
        res.status(200).send({ count })
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}
const getGrades = async (req, res) => {

    try {
        const grades = await prisma.schools.findMany({
            distinct: "grade",
            select: {
                grade: true
            },
            
        })
        res.status(200).send( grades )
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}
const getSchool = async (req, res) => {

    try {
        const schools = await prisma.schools.findFirst({
            where: {
                id: parseInt(req.params.id)
            }

        })
        res.status(200).send(schools)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}
const getSomeSchools = async (req, res) => {

    try {
        const schools = await prisma.schools.findMany({
            include: {
                courses: true
            },
            take: parseInt(req.query._limit),
            skip: (parseInt(req.query._page) - 1) * req.query._limit
        })
        res.status(200).send(schools)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

const getAllSchools = async (req, res) => {
    try {
        const schools = await prisma.schools.findMany({

        })
        res.status(200).send(schools)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

const addSchool = async (req, res) => {
    try {
        const school = req.body;
        for (const property in school) {
            if (school[property] === "") { school[property] = null }
            if (typeof school[property] === "string") { school[property] = ews(school[property]) }
        }
        const opCode = await prisma.schools.create({
            data: school
        })
        res.send(opCode)

    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

const updateSchool = async (req, res) => {
    try {
        const school = req.body;
        for (const property in school) {
            if (school[property] === "") { school[property] = null }
            if (typeof school[property] === "string") { school[property] = ews(school[property]) }
        }
        const opCode = await prisma.schools.update({
            data: school,
            where: { id: school.id }
        })
        res.send(opCode)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}
const deleteSchool = async (req, res) => {
    try {
        const opCode = await prisma.schools.delete({
            where: { id: parseInt(req.params.id) }
        })
        res.send(opCode)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

module.exports = { getGrades, getCount, getSchool, getSomeSchools, getAllSchools, addSchool, updateSchool, deleteSchool };