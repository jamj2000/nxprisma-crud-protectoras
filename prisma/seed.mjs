import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client"
const connectionString = process.env.DATABASE_URL


import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });



// DECLARACIÓN DE DATOS
const protectoras = [
    {
        nombre: 'La guarida',
        localidad: 'Lucena',
        telefono: '678111111',
    },
    {
        nombre: 'El refugio',
        localidad: 'Puente Genil',
        telefono: '678111112',
    },
    {
        nombre: 'Asociación protectora local',
        localidad: 'Montilla',
        telefono: '678111113',
    },
];


const mascotas = [
    {
        nombre: 'Aquiles',
        descripcion: 'Gato atigrado muy cariñoso',
        fecha_nacimiento: '2025-01-01T00:00:00.000Z',
    },
    {
        nombre: 'Xena',
        descripcion: 'Gata siamesa muy juguetona',
        fecha_nacimiento: '2025-01-02T00:00:00.000Z',
    },
    {
        nombre: 'Dama',
        descripcion: 'Perra pastora alemana muy fiel',
        fecha_nacimiento: '2025-01-03T00:00:00.000Z',
    },
];



const vacunas = [
    {
        nombre: 'Moquillo en perros',
        especie: 'perros',
        descripcion: 'Protege frente al virus del moquillo canino, una enfermedad infecciosa que puede afectar a los sistemas respiratorio, digestivo y nervioso.',
    },
    {
        nombre: 'Parvovirosis en perros',
        especie: 'perros',
        descripcion: 'Protege frente al parvovirus canino, que provoca principalmente vómitos, diarrea intensa y deshidratación.',
    },
    {
        nombre: 'Hepatitis vírica canina',
        especie: 'perros',
        descripcion: 'Protege frente al adenovirus canino tipo 1, responsable de una enfermedad que puede afectar principalmente al hígado.',
    },
    {
        nombre: 'Moquillo en gatos',
        especie: 'gatos',
        descripcion: 'Protege frente a la panleucopenia felina, una enfermedad vírica muy contagiosa que puede provocar fiebre, vómitos y alteraciones digestivas.',
    },
    {
        nombre: 'Rinotraqueítis felina',
        especie: 'gatos',
        descripcion: 'Protege frente al herpesvirus felino, una de las principales causas de enfermedad respiratoria y ocular en gatos.',
    },
    {
        nombre: 'Leucemia felina',
        especie: 'gatos',
        descripcion: 'Protege frente al virus de la leucemia felina (FeLV), que puede debilitar el sistema inmunitario y favorecer diversas enfermedades.',
    },
    {
        nombre: 'Peritonitis infecciosa felina',
        especie: 'gatos',
        descripcion: 'Vacunación destinada a la prevención de la infección por coronavirus felino asociada al desarrollo de peritonitis infecciosa felina.',
    },
    {
        nombre: 'Rabia',
        especie: 'perros y gatos',
        descripcion: 'Protege frente al virus de la rabia, una enfermedad grave que afecta al sistema nervioso y puede transmitirse a las personas.',
    },
];



const load = async () => {
    try {
        // await prisma.$queryRaw`ALTER SEQUENCE mascotas_id_seq RESTART WITH 1`;
        // console.log('reset mascota sequence to 1');
        await prisma.mascota.deleteMany({});
        console.log('Borrados los registros de la tabla mascotas');

        await prisma.mascota.createMany({
            data: mascotas,
        });
        console.log('Añadidos datos a tabla mascotas');

        await prisma.vacuna.deleteMany({});
        console.log('Borrados los registros de la tabla vacunas');

        await prisma.vacuna.createMany({
            data: vacunas,
        });
        console.log('Añadidos datos a tabla vacunas');

        await prisma.protectora.deleteMany({});
        console.log('Borrados los registros de la tabla protectoras');

        await prisma.protectora.createMany({
            data: protectoras,
        });
        console.log('Añadidos datos a tabla protectoras');

    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

load();