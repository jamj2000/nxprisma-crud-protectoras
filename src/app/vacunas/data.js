'use server'
import prisma from '@/lib/prisma'
import { cacheTag } from 'next/cache'





export async function getVacunas() {
    'use cache'
    cacheTag('vacunas')

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
    // 'use cache'
    // cacheTag('vacunas', `vacuna:${id}`)

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
    // 'use cache'
    // cacheTag('vacunas', 'vacunas:id-nombre')

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
    // 'use cache'
    // cacheTag('vacunas', 'sin-administar')

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
