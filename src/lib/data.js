'use server'
import prisma from '@/lib/prisma'

//// MASCOTAS



export async function obtenerMascotas({ query, sort, page, per_page = 5 }) {
    const limit = +per_page
    const offset = (+page - 1) * +per_page


    try {
        const total = await prisma.mascota.count({
            where: {
                nombre: {
                    contains: query,
                    mode: 'insensitive',
                },
            },
        })
        const mascotas = await prisma.mascota.findMany({
            where: {
                nombre: {
                    contains: query,
                    mode: 'insensitive',
                },
            },
            // orderBy: {
            //     nombre: 'asc',
            // },
            take: limit,
            skip: offset
        })

        const totalPages = Math.ceil(total / per_page)

        return { mascotas, totalPages }
    } catch (error) {
        // console.log(error);  
        return null;
    }
}


export async function obtenerMascota(id) {  // obtener artículo con vacunas
    try {
        const mascota = await prisma.mascota.findUnique({
            where: { id: +id },
            include: {
                vacunas: true
            }
        })

        console.log(mascota);
        return mascota;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}



//// VACUNAS



export async function obtenerVacunas() {
    try {
        const vacunas = await prisma.vacuna.findMany()
        return vacunas;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}


export async function obtenerVacuna(id) {  // obtener vacunas con artículos
    try {
        const vacuna = await prisma.vacuna.findUnique({
            where: { id: +id },
            // include: {
            //     mASCOTAs: true
            // }
        })

        console.log(vacuna);
        return vacuna;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}

// Obtener array con IDs de todas las vacunas
export async function obtenerVacunasID() {
    try {
        const IDs = await prisma.vacuna.findMany({
            select: { id: true }
        })
        return IDs  // Formato: [ {id: 1}, {id: 2}, ...]
    } catch (error) {
        // console.log(error); 
        return null;
    }
}



//// PROTECTORAS


export async function obtenerProtectoras() {
    try {
        const protectoras = await prisma.protectora.findMany()
        return protectoras;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}


export async function obtenerProtectora(id) {  // obtener protectoras con artículos
    try {
        const protectora = await prisma.protectora.findUnique({
            where: { id: +id },
            // include: {
            //     mASCOTAs: true
            // }
        })

        console.log(protectora);
        return protectora;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}