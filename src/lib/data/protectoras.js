'use server'
import prisma from '@/lib/prisma'
import { cacheTag } from 'next/cache'



export async function getProtectoras() {
    'use cache'
    cacheTag('protectoras')

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


export async function getProtectora(id) {
    'use cache'
    cacheTag('protectoras', `protectora:${id}`)

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
    'use cache'

    cacheTag('protectoras', 'protectoras:id-nombre')

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
    'use cache'
    cacheTag('protectoras', 'protectoras:no-mascotas')

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


