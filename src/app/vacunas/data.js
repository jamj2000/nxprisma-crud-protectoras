'use server'
import prisma from '@/lib/prisma'





export async function getVacunas() {
    try {
        const vacunas = await prisma.vacuna.findMany({
            include: {
                mascotas: true
            }
        })
        return vacunas;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}


export async function getVacuna(id) {
    try {
        const vacuna = await prisma.vacuna.findUnique({
            where: { id: +id },
            include: {
                mascotas: true
            }
        })

        //console.log(vacuna);
        return vacuna;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}



export async function getVacunasIdNombre() {
    try {
        const vacuna = await prisma.vacuna.findMany({
            select: {
                id: true,
                nombre: true
            }
        })

        // console.log(vacuna);
        return vacuna;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}


export async function getVacunasSinAdministar() {
    try {
        const vacunas = await prisma.vacuna.findMany({
            where: {
                mascotas: {
                    none: {},
                },
            }
        })

        // console.log(vacunas);
        return vacunas;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}
