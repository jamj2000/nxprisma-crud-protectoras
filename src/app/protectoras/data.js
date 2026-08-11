'use server'
import prisma from '@/lib/prisma'



export async function getProtectoras() {
    try {
        const protectoras = await prisma.protectora.findMany({
            include: {
                mascotas: {
                    include: {
                        vacunas: true
                    }
                }
            }
        })

        return protectoras;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}


export async function getProtectora(id) {  // obtener protectoras con mascotas
    try {
        const protectora = await prisma.protectora.findUnique({
            where: { id: +id },
            include: {
                mascotas: {
                    include: {
                        vacunas: true
                    }
                }
            }
        })

        return protectora;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}


export async function getProtectorasIdNombre() {
    try {
        const protectora = await prisma.protectora.findMany({
            select: {
                id: true,
                nombre: true
            }
        })

        // console.log(protectora);
        return protectora;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}



export async function getProtectorasSinMascotas() {
    try {
        const protectoras = await prisma.protectora.findMany({
            where: {
                mascotas: {
                    none: {},
                },
            }
        })

        console.log('PROTECTORAS', protectoras);
        return protectoras;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}


