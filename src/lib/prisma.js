import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Evitamos realizar excesivas conexiones en Entorno de Desarrollo
if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export default prisma



// import { PrismaClient } from '@prisma/client';

// let prisma;

// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient();
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
//   prisma = global.prisma;
// }

// export default prisma;



