import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const getCourse = async (courseID) => {

    try {
        const course = await prisma.courses.findUnique({
            where: {
                id: parseInt(courseID)
            },
            include: {
                trainees: {
                    include: {
                        school: true
                    }
                },
                trainers: true
            }
        })
        return course
    } catch (error: any) {
        throw new Error(error.message)
    }
}
module.exports = { getCourse };