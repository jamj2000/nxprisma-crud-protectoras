import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client"
const connectionString = process.env.DATABASE_URL


import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });


import fs from 'fs';



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