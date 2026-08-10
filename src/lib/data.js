'use server'
import prisma from '@/lib/prisma'





// ------------------- PROTECTORAS -----------------------------


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



// ------------------- MASCOTAS -----------------------------

// obtener mascotas y sus vacunas
export async function getMascotasVacunas({
    query = '',
    sort = 'createdAt desc',
    page = 1,
    limit = 10
} = {}) {
    const limitNum = Number(limit);
    const skip = (Number(page) - 1) * limitNum;

    // Directo y sin fallos: sort siempre es un string válido
    const [campo, orden] = sort.split(' ');
    const orderBy = { [campo]: orden };

    const where = { nombre: { contains: query, mode: 'insensitive' } };

    try {
        const [total, mascotas] = await prisma.$transaction([
            prisma.mascota.count({ where }),
            prisma.mascota.findMany({
                where,
                orderBy,
                take: limitNum,
                skip,
                include: { vacunas: true },
            }),
        ]);

        return {
            mascotas,
            totalPages: Math.ceil(total / limitNum) || 1
        };
    } catch (error) {
        return null;
    }
}



export async function getMascotas() {
    try {
        const mascotas = await prisma.mascota.findMany({
            select: {
                id: true,
                nombre: true,
                descripcion: true,
                foto: true,
                vacunas: true,
                protectora: true
            }
        })

        //console.log(mascota);
        return mascotas
    } catch (error) {
        // console.log(error);  
        return null;
    }
}



export async function getMascota(id) {  // obtener mascota con vacunas
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




// ------------------- VACUNAS -----------------------------


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

