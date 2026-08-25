'use server'
import prisma from '@/lib/prisma'
import { updateTag } from 'next/cache'
import { redirect } from 'next/navigation'


export async function createProtectora(prevState, formData) {
  const nombre = formData.get('nombre')
  const localidad = formData.get('localidad')
  const telefono = formData.get('telefono')


  const mascotas = formData.getAll('mascotas').map(id => ({ id: +id }))


  try {
    await prisma.protectora.create({
      data: {
        nombre,
        localidad,
        telefono,
        mascotas: { connect: mascotas },
      }
    })

    updateTag('protectoras')
    updateTag('mascotas')
    return {
      type: "success",
      message: "Protectora creada correctamente"
    }

  } catch (error) {
    return {
      type: "error",
      message: "Error al crear la protectora"
    }
  }
}






export async function updateProtectora(prevState, formData) {
  const id = Number(formData.get('id'))
  const nombre = formData.get('nombre')
  const localidad = formData.get('localidad')
  const telefono = formData.get('telefono')


  const mascotas = formData.getAll('mascotas').map(id => ({ id: +id }))


  try {
    await prisma.protectora.update({
      where: { id },
      data: {
        nombre,
        localidad,
        telefono,
        mascotas: { set: mascotas },
      }
    })
    updateTag('protectoras')
    updateTag('mascotas')
    return {
      type: "success",
      message: "Protectora modificada correctamente"
    }

  } catch (error) {
    return {
      type: "error",
      message: "Error al modificar la protectora"
    }
  }



}


export async function deleteProtectora(prevState, formData) {
  const id = Number(formData.get('id'))

  try {
    await prisma.protectora.delete({
      where: { id }
    })
    updateTag('protectoras')
    updateTag('mascotas')
    // return {
    //   type: "success",
    //   message: "Protectora eliminada correctamente"
    // }

  } catch (error) {
    console.log(error)
    return {
      type: "error",
      message: "Error al eliminar la protectora"
    }
  }

  redirect('/protectoras')
}
