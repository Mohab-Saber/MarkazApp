import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getUser = async (req, res) => {

    try {
        const user = await prisma.user.findFirst()
        res.status(200).send(user)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

const updateUser = async (req, res) => {
    try {
        const user = req.body;

        const opCode = await prisma.user.update({
            data: user,
            where: { id: 1 }
        })
        res.send(opCode)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

module.exports = { getUser, updateUser};