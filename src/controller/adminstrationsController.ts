import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllAdminstrations = async (req, res) => {
    try {
        const adminstrations = await prisma.adminstrations.findMany({

        })
        res.status(200).send(adminstrations)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}


const addAdminstration = async (req, res) => {
    try {
        const adminstration = req.body;
        const opCode = await prisma.adminstrations.create({
            data: adminstration
        })
        res.send(opCode)

    } catch (error: any) {
        res.status(400).send(error.message)
    }
}


const updateAdminstration = async (req, res) => {
    try {
        const adminstration = req.body;

        const opCode = await prisma.adminstrations.update({
            data: adminstration,
            where: { id: adminstration.id }
        })
        res.send(opCode)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}
const deleteAdminstration = async (req, res) => {
    try {
        const adminstration = req.body;

        const opCode = await prisma.adminstrations.delete({
            where: { id: adminstration.id }
        })
        res.send(opCode)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}

module.exports = { getAllAdminstrations, addAdminstration, updateAdminstration, deleteAdminstration };