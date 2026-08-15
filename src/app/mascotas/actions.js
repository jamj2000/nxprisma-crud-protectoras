'use server'
import { revalidatePath, updateTag } from 'next/cache';
import prisma from '@/lib/prisma'
import cloudinary from '@/lib/cloudinary';
import path from 'node:path'



async function imageUpload(file) {
  console.log(file);

  const fileBuffer = await file.arrayBuffer();

  let mime = file.type;
  let encoding = 'base64';
  let base64Data = Buffer.from(fileBuffer).toString('base64');
  let fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

  try {
    // Transformamos imagen al subirla
    // width: 512, aspect-ratio: 1
    const result = await cloudinary.uploader.upload(fileUri, {
      invalidate: true,
      asset_folder: 'protectora',
      public_id: path.parse(file.name).name,
      aspect_ratio: "1.0",
      width: 512,
      crop: "fill",
      gravity: "center"
    })

    console.log(result);
    return result.secure_url
  } catch (error) {
    console.log(error);
    return null
  }
}



export async function createMascota(prevState, formData) {
  const nombre = formData.get('nombre')
  const descripcion = formData.get('descripcion')
  const fecha_nacimiento = formData.get('fecha_nacimiento') ? formData.get('fecha_nacimiento') + "T00:00:00.000Z" : new Date()
  const protectoraId = Number(formData.get('protectoraId')) || null
  let foto = formData.get('foto')     // Tipo file

  const vacunas = formData.getAll('vacunas').map(id => ({ id: +id }))

  try {
    // si tenemos nuevo archivo en el input type=file
    if (foto.size > 0)
      foto = await imageUpload(foto)
    else
      foto = null


    await prisma.mascota.create({
      data: {
        nombre,
        descripcion,
        fecha_nacimiento,
        ...(foto && { foto }),
        protectoraId,
        vacunas: { connect: vacunas },
      },
    })

  } catch (error) {
    return {
      type: "error",
      message: "Error al registrar la mascota" + error
    }
  }

  updateTag('mascotas')
  // revalidatePath('/mascotas');
  return {
    type: "success",
    message: "Mascota registrada correctamente"
  }
}



export async function updateMascota(prevState, formData) {
  const id = Number(formData.get('id'))
  const nombre = formData.get('nombre')
  const descripcion = formData.get('descripcion')
  const fecha_nacimiento = formData.get('fecha_nacimiento') ? formData.get('fecha_nacimiento') + "T00:00:00.000Z" : new Date()
  const protectoraId = Number(formData.get('protectoraId')) || null
  let foto = formData.get('foto')  // Tipo file

  const vacunas = formData.getAll('vacunas').map(id => ({ id: +id }))


  try {
    // si tenemos nuevo archivo en el input type=file
    if (foto.size > 0)
      foto = await imageUpload(foto)
    else
      foto = null


    await prisma.mascota.update({
      where: { id },
      data: {
        nombre,
        descripcion,
        fecha_nacimiento,
        ...(foto && { foto }),
        protectoraId,
        vacunas: { set: vacunas }
      },
    })

  } catch (error) {
    return {
      type: "error",
      message: "Error al actualizar la mascota"
    }
  }

  updateTag('mascotas')
  updateTag('protectoras')
  // revalidatePath('/mascotas');
  return {
    type: "success",
    message: "Mascota actualizada correctamente"
  }
}


export async function deleteMascota(prevState, formData) {
  const id = Number(formData.get('id'))

  try {
    await prisma.mascota.delete({
      where: { id },
    })

  } catch (error) {
    return {
      type: "error",
      message: "Error al actualizar la mascota"
    }
  }

  updateTag('mascotas')
  // revalidatePath('/mascotas');
  return {
    type: "success",
    message: "Mascota actualizada correctamente"
  }
}

