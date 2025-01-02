'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache';
import { obtenerVacunasID } from '@/lib/data'


//// MASCOTAS

/* 
// EJEMPLO CREACIÓN
const result = await prisma.mascota.update({
  where: {
    id: 16,
  },
  include: {
    vacunas: true,
  },
  data: {
    vacunas: {
      connect: [{id: 4}, {id: 5}]     
    },
  },
})

*/

export async function nuevaMascota(prevState, formData) {
  const nombre = formData.get('nombre')
  const descripcion = formData.get('descripcion')
  const fecha_nacimiento = new Date(formData.get('fecha_nacimiento'))

  // Array con IDs de todas las vacunas
  // const vacunasID = await obtenerVacunasID()  // Formato: [ {id: 1}, {id: 2}, ...]

  // // Array con IDs de vacunas marcadas por el usuario
  // const connect = vacunasID.filter(({ id }) => formData.get(id.toString()) !== null)
  // console.log('VACUNAS ', { connect });

  try {
    const mascota = await prisma.mascota.create({
      data: {
        nombre,
        descripcion,
        fecha_nacimiento,
        vacunas: { connect }
      },
      // include: {
      //   vacunas: true,
      // },
    })

    revalidatePath('/mascotas')
    return { success: 'Creación exitosa' }
  } catch (error) {
    return { error: error.message }
  }
}


/* 
// EJEMPLO ACTUALIZACIÓN
const result = await prisma.mascota.update({
  where: {
    id: 16,
  },
  include: {
    vacunas: true,
  },
  data: {
    vacunas: {
      connect: [{id: 4}, {id: 5}],
      disconnect: [{ id: 12 }, { id: 19 }],
    },
  },

})

*/

export async function modificarMascota(prevState, formData) {
  const id = Number(formData.get('id'))
  const nombre = formData.get('nombre')
  const descripcion = formData.get('descripcion')
  const fecha_nacimiento = new Date(formData.get('fecha_nacimiento'))

  // Array con IDs de todas las vacunas
  const vacunasID = await obtenerVacunasID()  // Formato: [ {id: 1}, {id: 2}, ...]

  // -> Si no disponemos de NodeJS 21+ 
  // Array con IDs de vacunas marcadas por el usuario
  const connect = vacunasID.filter(({ id }) => formData.get(id.toString()) !== null)

  // Array con IDs de vacunas NO marcadas por el usuario
  const disconnect = vacunasID.filter(({ id }) => formData.get(id.toString()) === null)

  // Información para depuración
  console.log('VACUNAS ', { connect, disconnect });

  // -> Si disponemos de NodeJS 21+
  // Objecto con 2 arrays: connect con IDs de vacunas marcadas por el usuario y disconnect con IDs no marcadas
  // const vacunas = Object.groupBy(vacunasID, ({ id }) => formData.get(id.toString()) !== null ? 'connect' : 'disconnect')
  // console.log('VACUNAS ', vacunas);

  try {
    const mascota = await prisma.mascota.update({
      where: { id },
      data: {
        nombre,
        descripcion,
        fecha_nacimiento,
        vacunas: { connect, disconnect },
        //vacunas  // -> Si hemos usado Object.groupBy disponible en NodeJS 21+
      },
      include: {
        vacunas: true,
      },
    })

    revalidatePath('/mascotas')
    return { success: 'Modificación exitosa' }
  } catch (error) {
    return { error: error.message }
  }
}


export async function eliminarMascota(prevState, formData) {
  const id = Number(formData.get('id'))

  try {
    const mascota = await prisma.mascota.delete({
      where: {
        id: id,
      },
    })

    revalidatePath('/mascotas')
    return { success: 'Eliminación exitosa' }
  } catch (error) {
    return { error: error.message }
  }
}



//// VACUNAS

export async function nuevaVacuna(prevState, formData) {
  const nombre = formData.get('nombre')
  const especie = formData.get('especie')

  try {
    const vacuna = await prisma.vacuna.create({
      data: { nombre, especie },
    })

    revalidatePath('/vacunas')
    return { success: 'Creación exitosa' }
  } catch (error) {
    return { error: error.message }
  }
}


export async function modificarVacuna(prevState, formData) {
  const id = Number(formData.get('id'))
  const nombre = formData.get('nombre')
  const especie = formData.get('especie')

  try {
    const vacuna = await prisma.vacuna.update({
      where: { id },
      data: { nombre, especie },
    })

    revalidatePath('/vacunas')
    return { success: 'Modificación exitosa' }
  } catch (error) {
    return { error: error.message }
  }
}


export async function eliminarVacuna(prevState, formData) {
  const id = Number(formData.get('id'))

  try {
    const vacuna = await prisma.vacuna.delete({
      where: {
        id: id,
      },
    })

    revalidatePath('/vacunas')
    return { success: 'Eliminación exitosa' }
  } catch (error) {
    return { error: error.message }
  }
}

