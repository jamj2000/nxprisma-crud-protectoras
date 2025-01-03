import { PrismaClient } from '@prisma/client'

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
    },
    {
        nombre: 'Parvovirosis en perros',
        especie: 'perros',
    },
    {
        nombre: 'Hepatitis vírica canina',
        especie: 'perros',
    },
    {
        nombre: 'Moquillo en gatos',
        especie: 'gatos',
    },
    {
        nombre: 'Rinotraqueítis felina',
        especie: 'gatos',
    },
    {
        nombre: 'Leucemia felina',
        especie: 'gatos',
    },
    {
        nombre: 'Peritonitis infecciosa felina',
        especie: 'gatos',
    },
    {
        nombre: 'Rabia',
        especie: 'perros y gatos',
    },
];


const prisma = new PrismaClient();

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