import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
    const protectoras = await prisma.protectora.findMany();
    const mascotas = await prisma.mascota.findMany({ include: { vacunas: true } });
    const vacunas = await prisma.vacuna.findMany();

    fs.writeFileSync(
        'protectoras.json',
        JSON.stringify(protectoras, null, 2)
    );

    fs.writeFileSync(
        'mascotas.json',
        JSON.stringify(mascotas, null, 2)
    );


    fs.writeFileSync(
        'vacunas.json',
        JSON.stringify(vacunas, null, 2)
    );


}

main()
    .finally(() => prisma.$disconnect());