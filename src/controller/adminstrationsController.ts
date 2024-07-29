import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import ews from "../utility/eliminateWhiteSpace";

const getCount = async (req, res) => {

    try {
        const count = await prisma.adminstrations.count()
        res.status(200).send({count})
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}
const getWehda_names = async (req, res) => {

    try {
        const wehda_names = await prisma.adminstrations.findMany({
            distinct: "wehda_name",
            select: {
                id:true,
                wehda_name: true,
                wehda_code: true
            }
        })
        res.status(200).send(wehda_names)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}
const getBalad_names = async (req, res) => {

    try {
        const balad_names = await prisma.adminstrations.findMany({
            distinct: "balad_name",
            select: {
                id:true,
                balad_name: true,
                balad_code: true
            }
        })
        res.status(200).send(balad_names)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

const getAdminstration = async (req, res) => {

    try {
        const adminstrations = await prisma.adminstrations.findFirst({
            where : {
                id : parseInt(req.params.id)
            }

        })
        res.status(200).send(adminstrations)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}
const getSomeAdminstrations = async (req, res) => {

    try {
        const adminstrations = await prisma.adminstrations.findMany({
            include: {
                courses: true
            },
            take: parseInt(req.query._limit),
            skip: (parseInt(req.query._page) - 1) * req.query._limit
        })
        res.status(200).send(adminstrations)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}
const getAllAdminstrations = async (req, res) => {
    try {
        const adminstrations = await prisma.adminstrations.findMany({

        })
        res.status(200).send(adminstrations)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}


const addAdminstration = async (req, res) => {
    try {
        const adminstration = req.body;
        for (const property in adminstration) {
            if (adminstration[property] === "") { adminstration[property] = null }
            if (typeof adminstration[property] === "string") { adminstration[property] = ews(adminstration[property]) }
        }
        const opCode = await prisma.adminstrations.create({
            data: adminstration
        })
        res.send(opCode)

    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}


const updateAdminstration = async (req, res) => {
    try {
        const adminstration = req.body;
        for (const property in adminstration) {
            if (adminstration[property] === "") { adminstration[property] = null }
            if (typeof adminstration[property] === "string") { adminstration[property] = ews(adminstration[property]) }
        }
        const opCode = await prisma.adminstrations.update({
            data: adminstration,
            where: { id: adminstration.id }
        })
        res.send(opCode)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}
const deleteAdminstration = async (req, res) => {
    try {
        const opCode = await prisma.adminstrations.delete({
            where: { id: parseInt(req.params.id) }
        })
        res.send(opCode)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

module.exports = {getWehda_names, getBalad_names, getCount, getAdminstration,getSomeAdminstrations, getAllAdminstrations, addAdminstration, updateAdminstration, deleteAdminstration };