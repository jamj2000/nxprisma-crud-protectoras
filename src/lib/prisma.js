import { PrismaClient } from '@prisma/client';

let prisma;

// Evitamos realizar excesivas conexiones en Entorno de Desarrollo
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default prisma;



// Según https://github.com/prisma/prisma-examples/tree/latest/orm/nextjs/lib
// podría simplicarse de la siguiente manera
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// // Evitamos realizar excesivas conexiones en Entorno de Desarrollo
// if (process.env.NODE_ENV !== 'production') global.prisma = prisma

// export default prisma
