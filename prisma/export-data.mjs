import { PrismaClient } from '@prisma/client';
import protectoras from './protectoras.json' with { type: 'json'}
import vacunas from './vacunas.json' with { type: 'json'}
import mascotas from './mascotas.json' with { type: 'json'}

const prisma = new PrismaClient();

async function main() {

    await prisma.protectora.deleteMany({})
    await prisma.vacuna.deleteMany({})
    await prisma.mascota.deleteMany({})

    await prisma.protectora.createMany({
        data: protectoras,
        skipDuplicates: true, // solo funciona si hay índices únicos
    });

    await prisma.vacuna.createMany({
        data: vacunas,
        skipDuplicates: true, // solo funciona si hay índices únicos
    });

    const mascotasCreadas = await prisma.$transaction(mascotas.map(mascota => {
        const { vacunas, ...datosMascota } = mascota;

        return prisma.mascota.create({
            data: {
                ...datosMascota,
                vacunas: vacunas?.length ? {
                    connect: mascota.vacunas?.map(({ id }) => ({ id })) // [{ id: 1 }, { id: 2 }]
                } : undefined
            },
        })
    }
    )
    );

    console.log('mascotas creadas', mascotasCreadas)

    console.log(`Se insertaron ${protectoras.length} protectoras.`);
    console.log(`Se insertaron ${vacunas.length} vacunas.`);
    console.log(`Se insertaron ${mascotas.length} mascotas.`);


}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });