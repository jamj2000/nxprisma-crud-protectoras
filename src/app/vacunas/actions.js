'use server'
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma'



export async function createVacuna(prevState, formData) {
  const nombre = formData.get('nombre')
  const especie = formData.get('especie')

  const mascotas = formData.getAll('mascotas').map(id => ({ id: +id }))


  try {
    await prisma.vacuna.create({
      data: {
        nombre,
        especie,
        mascotas: { connect: mascotas }
      }
    })

  } catch (error) {
    return {
      type: "error",
      message: "Error al crear la vacuna"
    }
  }

  updateTag('vacunas')
  // revalidatePath('/vacunas');
  return {
    type: "success",
    message: "Vacuna creada correctamente"
  }
}


export async function updateVacuna(prevState, formData) {
  const id = Number(formData.get('id'))
  const nombre = formData.get('nombre')
  const especie = formData.get('especie')

  const mascotas = formData.getAll('mascotas').map(id => ({ id: +id }))

  try {
    await prisma.vacuna.update({
      where: { id },
      data: {
        nombre,
        especie,
        mascotas: { set: mascotas },
      }
    })


  } catch (error) {
    return {
      type: "error",
      message: "Error al actualizar la vacuna"
    }
  }

  updateTag('vacunas')
  updateTag('vacunas')
  // revalidatePath('/vacunas');
  return {
    type: "success",
    message: "Vacuna actualizada correctamente"
  }
}



export async function deleteVacuna(prevState, formData) {
  const id = Number(formData.get('id'))

  try {
    await prisma.vacuna.delete({
      where: { id },
    })

  } catch (error) {
    return {
      type: "error",
      message: "Error al eliminar la vacuna"
    }
  }

  updateTag('vacunas')
  // revalidatePath('/vacunas');
  return {
    type: "success",
    message: "Vacuna eliminada correctamente"
  }
}



