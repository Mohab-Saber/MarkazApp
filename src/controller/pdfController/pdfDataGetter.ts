import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const parseDateIntoArr = (date: string) => {
    if(date.length !== 10){throw new Error('Error Parsing Dates');}
    return [parseInt(date.split('-')[0]), parseInt(date.split('-')[1]),  parseInt(date.split('-')[2])]
}
const checkFirstIsBeforeSecondDate = (date1: string, date2: string) => {
    const firstDate = parseDateIntoArr(date1);
    const secondDate = parseDateIntoArr(date2);
    for(let i = 0;i < firstDate.length;i++){
        if(firstDate[i] < secondDate[i]){
            return true
        }else if(firstDate[i] > secondDate[i]){
            return false
        }
    }
    return true
}

const filterCoursesBasedOnDate = (courses, startDate, finishDate) => {
    const filteredCourses = courses.filter((c) => {
        // filter null and empty records
        if (!c.startDate && !c.finishDate) { return false }

       // if (c.startDate after startDate && c.finishDate before finishDate ){ return true }
       if (checkFirstIsBeforeSecondDate(startDate, c.startDate) && checkFirstIsBeforeSecondDate(c.finishDate, finishDate) ){ return true }

       return false
    })
    return filteredCourses
}

const getCoursesPdfSubject = async (subject) => {
    try {
        const courses = await prisma.courses.findMany({
            where: {
                subject: `${subject}`
            }
        })
        return courses
    } catch (error: any) {
        throw new Error(error.message)
    }
}
const getCoursesPdfTrainer = async (trainer) => {
    try {
        const courses = await prisma.trainers.findUnique({
            where: {
                id: trainer.id
            },
             
        }).courses();

        return courses
    } catch (error: any) {
        throw new Error(error.message)
    }
}
const getCoursesPdfTrainee = async (trainee) => {
    try {
        const courses = await prisma.trainees.findUnique({
            where: {
                id: trainee.id
            },
        }).courses();

        return courses
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const getCoursesPdfDateWithoutNames = async (startDate: string, finishDate: string) => {
    try {
        const courses = await prisma.courses.findMany()
        return filterCoursesBasedOnDate(courses, startDate, finishDate)
    } catch (error: any) {
        throw new Error(error.message)
    }
}
const getCoursesPdfDateWithNames = async (startDate: string, finishDate: string) => {
    try {
        const courses = await prisma.courses.findMany({
            include:{
                trainees: {
                    orderBy: {
                        fullName: "asc"
                    }
                },
                trainers: {
                    orderBy: {
                        fullName: "asc"
                    }
                }
            }
        })
        return filterCoursesBasedOnDate(courses, startDate, finishDate)
    } catch (error: any) {
        throw new Error(error.message)
    }
}
const getCourseDataList = async (courseID: string) => {
    try {
        const course = await prisma.courses.findUnique({
            where: {
                id: parseInt(courseID)
            },
            include:{
                trainees: {
                    include: {
                        school: true
                    },
                    orderBy: {
                        fullName: "asc"
                    }
                },
                trainers: {
                    orderBy: {
                        fullName: "asc"
                    }
                }
            },
        })
        return course
    } catch (error: any) {
        throw new Error(error.message)
    }
}

module.exports = { getCoursesPdfSubject, getCoursesPdfTrainer, getCoursesPdfTrainee, getCoursesPdfDateWithoutNames, getCoursesPdfDateWithNames, getCourseDataList };