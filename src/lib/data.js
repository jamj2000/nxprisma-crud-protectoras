'use server'
import prisma from '@/lib/prisma'





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
export async function obtenerMascotasVacunas({
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
