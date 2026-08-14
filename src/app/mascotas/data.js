'use server'
import prisma from '@/lib/prisma'
import { cacheTag } from 'next/cache'






export async function getMascotas() {
    'use cache'
    cacheTag('mascotas')


    try {
        const mascotas = await prisma.mascota.findMany({
            include: {
                protectora: true,
                vacunas: true
            }
        })

        return mascotas
    } catch (error) {
        // console.log(error);  
        return null;
    }
}



export async function getMascota(id) {
    'use cache'
    cacheTag('mascotas', `mascota:${id}`)

    try {
        const mascota = await prisma.mascota.findUnique({
            where: { id: +id },
            include: {
                vacunas: true,
                protectora: true
            }
        })

        //console.log(mascota);
        return mascota;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}


export async function getMascotasIdNombre() {
    'use cache'
    cacheTag('mascotas', 'mascotas:id-nombre')

    try {
        const mascota = await prisma.mascota.findMany({
            select: {
                id: true,
                nombre: true
            }
        })

        // console.log(mascota);
        return mascota;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}



export async function getMascotasSinVacunar() {
    'use cache'
    cacheTag('mascotas', 'mascotas:sin-vacunar')

    try {
        const mascotas = await prisma.mascota.findMany({
            where: {
                vacunas: {
                    none: {},
                },
            }
        })

        // console.log(mascota);
        return mascotas;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}



export async function getMascotasSinProtectora() {
    'use cache'
    cacheTag('mascotas', 'sin-protectora')

    try {
        const mascotas = await prisma.mascota.findMany({
            where: {
                protectoraId: null,
            }
        })

        // console.log(mascota);
        return mascotas;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}
