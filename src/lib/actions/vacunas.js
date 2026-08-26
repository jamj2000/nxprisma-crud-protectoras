'use server'
import prisma from '@/lib/prisma'
import { updateTag } from 'next/cache'




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

    updateTag('vacunas')
    return {
      type: "success",
      message: "Vacuna creada correctamente"
    }
  } catch (error) {
    return {
      type: "error",
      message: "Error al crear la vacuna"
    }
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

    updateTag('vacunas')
    return {
      type: "success",
      message: "Vacuna actualizada correctamente"
    }
  } catch (error) {
    return {
      type: "error",
      message: "Error al actualizar la vacuna"
    }
  }
}




export async function deleteVacuna(prevState, formData) {
  const id = Number(formData.get('id'))

  try {
    await prisma.vacuna.delete({
      where: { id },
    })

    updateTag('vacunas')
    return {
      type: "success",
      message: "Vacuna eliminada correctamente"
    }

  } catch (error) {
    return {
      type: "error",
      message: "Error al eliminar la vacuna"
    }
  }
}



