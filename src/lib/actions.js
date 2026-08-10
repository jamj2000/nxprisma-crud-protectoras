'use server'
import { revalidatePath } from 'next/cache';
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




//// MASCOTAS

/* 
// EJEMPLO CREACIÓN
const result = await prisma.mascota.create({
  data: {
    nombre: 'Aquiles',
    vacunas: {
      connect: [{id: 4}, {id: 5}]     
    },
  },
})

*/

export async function createMascota(prevState, formData) {
  const nombre = formData.get('nombre')
  const descripcion = formData.get('descripcion')
  const fecha_nacimiento = formData.get('fecha_nacimiento')
  const file = formData.get('file')
  let foto;  // URL de la foto
  const protectoraId = Number(formData.get('protectoraId')) || null

  const vacunas = formData.getAll('vacunas').map(id => ({ id: +id }))



  try {
    // si tenemos nuevo archivo en el input type=file
    if (file.size > 0) {
      foto = await imageUpload(file)
      console.log('foto', foto);
    }

    await prisma.mascota.create({
      data: {
        nombre,
        descripcion,
        fecha_nacimiento,
        foto,
        protectoraId,
        vacunas: { connect: vacunas },
      },
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
  data: {
    nombre: 'Aquiles Junior',
    vacunas: {
      connect: [{id: 4}, {id: 5}],
      disconnect: [{ id: 12 }, { id: 19 }],
    },
  },
})

*/

export async function updateMascota(prevState, formData) {
  const id = Number(formData.get('id'))
  const nombre = formData.get('nombre')
  const descripcion = formData.get('descripcion')
  const fecha_nacimiento = formData.get('fecha_nacimiento')
  const file = formData.get('file')
  let foto = formData.get('foto')
  const protectoraId = Number(formData.get('protectoraId')) || null

  const vacunas = formData.getAll('vacunas').map(id => ({ id: +id }))


  try {
    // si tenemos nuevo archivo en el input type=file
    if (file.size > 0) {
      foto = await imageUpload(file)
      console.log('foto', foto);
    }

    await prisma.mascota.update({
      where: { id },
      data: {
        nombre,
        descripcion,
        fecha_nacimiento,
        foto,
        protectoraId,
        vacunas: { set: vacunas }
      },
    })


    revalidatePath('/mascotas')
    return { success: 'Modificación exitosa' }
  } catch (error) {
    return { error: error.message }
  }
}

/*
cuando eliminamos un elemento usaremos refresh en el cliente 
en lugar de revalidatePath en el servidor para dar tiempo
a mostrar el mensaje success o error antes de 
eliminar el elemento de la vista
*/
export async function deleteMascota(prevState, formData) {
  const id = Number(formData.get('id'))

  try {
    await prisma.mascota.delete({
      where: { id },
    })

    // revalidatePath('/mascotas')
    return { success: 'Eliminación exitosa' }
  } catch (error) {
    return { error: error.message }
  }
}



//// VACUNAS

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

  revalidatePath('/vacunas');
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

  revalidatePath('/vacunas');
  return {
    type: "success",
    message: "Vacuna actualizada correctamente"
  }
}

/*
cuando eliminamos un elemento usaremos refresh en el cliente 
en lugar de revalidatePath en el servidor para dar tiempo
a mostrar el mensaje success o error antes de 
eliminar el elemento de la vista
*/
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

  revalidatePath('/vacunas');
  return {
    type: "success",
    message: "Vacuna eliminada correctamente"
  }
}






//// PROTECTORAS

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

  } catch (error) {
    return {
      type: "error",
      message: "Error al crear la protectora"
    }
  }

  revalidatePath('/protectoras');
  return {
    type: "success",
    message: "Protectora creada correctamente"
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

  } catch (error) {
    return {
      type: "error",
      message: "Error al modificar la protectora"
    }
  }

  revalidatePath('/protectoras');
  return {
    type: "success",
    message: "Protectora modificada correctamente"
  }

}


export async function deleteProtectora(prevState, formData) {
  const id = Number(formData.get('id'))

  try {
    await prisma.protectora.delete({
      where: { id }
    })

  } catch (error) {
    console.log(error);
    return {
      type: "error",
      message: "Error al eliminar la protectora"
    }
  }

  revalidatePath('/protectoras');
  return {
    type: "success",
    message: "Protectora eliminada correctamente"
  }
}
