import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllSchools = async (req, res) => {
    try {
        const schools = await prisma.schools.findMany({

        })
        res.status(200).send(schools)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}

const addSchool = async (req, res) => {
    try {
        const school = req.body;
        const opCode = await prisma.schools.create({
            data: school
        })
        res.send(opCode)

    } catch (error: any) {
        res.status(400).send(error.message)
    }
}

const updateSchool = async (req, res) => {
    try {
        const school = req.body;

        const opCode = await prisma.schools.update({
            data: school,
            where: { id: school.id }
        })
        res.send(opCode)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}
const deleteSchool = async (req, res) => {
    try {
        const school = req.body;

        const opCode = await prisma.schools.delete({
            where: { id: school.id }
        })
        res.send(opCode)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}

module.exports = { getAllSchools, addSchool, updateSchool, deleteSchool };