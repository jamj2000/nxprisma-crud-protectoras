'use server'
import prisma from '@/lib/prisma'






export async function getMascotas() {
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
