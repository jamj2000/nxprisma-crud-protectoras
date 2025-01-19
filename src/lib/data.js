'use server'
import prisma from '@/lib/prisma'
import { PER_PAGE } from '@/lib/pagination';




// ------------------- PROTECTORAS -----------------------------


export async function obtenerProtectoras() {
    try {
        const protectoras = await prisma.protectora.findMany({
            include: {
                mascotas: true
            }
        })

        return protectoras;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}

export async function obtenerProtectoraMascotasVacunas(id) {  // obtener protectora con mascotas y vacunas
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

export async function obtenerProtectora(id) {  // obtener protectoras con mascotas
    try {
        const protectora = await prisma.protectora.findUnique({
            where: { id: +id },
        })

        return protectora;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}


// ------------------- MASCOTAS -----------------------------

// obtener mascotas y sus vacunas
export async function obtenerMascotasVacunas({ query, sort, page, per_page = PER_PAGE }) {
    const limit = +per_page
    const offset = (+page - 1) * +per_page

    let orderBy = {}

    switch (sort) {
        case 'nombre asc': orderBy = { nombre: 'asc' }; break;
        case 'nombre desc': orderBy = { nombre: 'desc' }; break;
        case 'createdAt asc': orderBy = { createdAt: 'asc' }; break;
        case 'createdAt desc': orderBy = { createdAt: 'desc' }; break;
        default:
    }


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
            include: {
                vacunas: true,
            },
            where: {
                nombre: {
                    contains: query,
                    mode: 'insensitive',
                },
            },
            orderBy,
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


export async function obtenerMascotasVacunasSinPag() {


    try {
        const mascotas = await prisma.mascota.findMany({
            include: {
                vacunas: true,
            },
        })

        return { mascotas }
    } catch (error) {
        // console.log(error);  
        return null;
    }
}



export async function obtenerMascotas() {
    try {
        const mascota = await prisma.mascota.findMany()

        //console.log(mascota);
        return mascota;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}


export async function obtenerMascota(id) {  // obtener mascota con vacunas
    try {
        const mascota = await prisma.mascota.findUnique({
            where: { id: +id },
        })

        //console.log(mascota);
        return mascota;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}


export async function obtenerMascotaVacunas(id) {  // obtener mascota con vacunas
    try {
        const mascota = await prisma.mascota.findUnique({
            where: { id: +id },
            include: {
                vacunas: true
            }
        })

        //console.log(mascota);
        return mascota;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}

// Obtener array con IDs de todas las mascotas
export async function obtenerMascotasIDs() {
    try {
        const IDs = await prisma.mascota.findMany({
            select: { id: true }
        })
        return IDs  // Formato: [ {id: 1}, {id: 2}, ...]
    } catch (error) {
        // console.log(error); 
        return null;
    }
}



// ------------------- VACUNAS -----------------------------


export async function obtenerVacunas() {
    try {
        const vacunas = await prisma.vacuna.findMany()
        return vacunas;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}

// obtener vacunas y las mascotas con dichas vacunas
export async function obtenerVacunasMascotas() {
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

export async function obtenerVacuna(id) {
    try {
        const vacuna = await prisma.vacuna.findUnique({
            where: { id: +id },
        })

        //console.log(vacuna);
        return vacuna;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}



export async function obtenerVacunaMascotas(id) {  // obtener vacuna con mascotas
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

// Obtener array con IDs de todas las vacunas
export async function obtenerVacunasIDs() {
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

