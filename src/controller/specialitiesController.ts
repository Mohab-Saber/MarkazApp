import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getCount = async (req, res) => {

    try {
        const count = await prisma.specialities.count()
        res.status(200).send({count})
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}
const getSpeciality = async (req, res) => {

    try {
        const specialities = await prisma.specialities.findFirst({
            where : {
                id : parseInt(req.params.id)
            }

        })
        res.status(200).send(specialities)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}
const getSomeSpecialities = async (req, res) => {

    try {
        const specialities = await prisma.specialities.findMany({

            take: parseInt(req.query._limit),
            skip: (parseInt(req.query._page) - 1) * req.query._limit
        })
        res.status(200).send(specialities)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}

const getAllSpecialities = async (req, res) => {
    try {
        const specialities = await prisma.specialities.findMany()
        res.status(200).send(specialities)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}


const addSpeciality = async (req, res) => {
    try {
        const speciality = req.body;
        const opCode = await prisma.specialities.create({
            data: speciality
        })
        res.send(opCode)
        
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}


const updateSpeciality = async (req, res) => {
    try {
        const speciality = req.body;

        const opCode = await prisma.specialities.update({
            data: speciality,
            where: { id: speciality.id }
        })
        res.send(opCode)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}
const deleteSpeciality = async (req, res) => {
    try {
        const opCode = await prisma.specialities.delete({
            where: { id: parseInt(req.params.id) }
        })
        res.send(opCode)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}

module.exports = {getCount, getSpeciality, getAllSpecialities, getSomeSpecialities, addSpeciality, updateSpeciality, deleteSpeciality };