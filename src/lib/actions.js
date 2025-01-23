'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache';
import { obtenerMascotasIDs, obtenerVacunasIDs } from '@/lib/data'
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

export async function nuevaMascota(prevState, formData) {
  const nombre = formData.get('nombre')
  const descripcion = formData.get('descripcion')
  const fecha_nacimiento = new Date(formData.get('fecha_nacimiento'))
  const file = formData.get('file')
  let foto;  // URL de la foto
  const protectoraId = Number(formData.get('protectoraId')) || null

  // Array con IDs de todas las vacunas
  const vacunasIDs = await obtenerVacunasIDs()  // Formato: [ {id: 1}, {id: 2}, ...]

  const connect = vacunasIDs.filter(vacuna => formData.get(vacuna.id) !== null)
  const vacunas = { connect }

  // Información de depuración
  // console.log('VACUNAS ', vacunas);


  try {
    // si tenemos nuevo archivo en el input type=file
    if (file.size > 0) {
      foto = await imageUpload(file)
      console.log('foto', foto);
    }

    const mascota = await prisma.mascota.create({
      data: {
        nombre,
        descripcion,
        fecha_nacimiento,
        foto,
        protectoraId,
        vacunas,
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

export async function modificarMascota(prevState, formData) {
  const id = Number(formData.get('id'))
  const nombre = formData.get('nombre')
  const descripcion = formData.get('descripcion')
  const fecha_nacimiento = new Date(formData.get('fecha_nacimiento'))
  const file = formData.get('file')
  let foto = formData.get('foto')
  const protectoraId = Number(formData.get('protectoraId')) || null

  // Array con IDs de todas las vacunas
  const vacunasIDs = await obtenerVacunasIDs()  // Formato: [ {id: 1}, {id: 2}, ...]

  // -> Si disponemos de NodeJS 21+
  // Objecto con 2 arrays: connect con IDs de vacunas marcadas por el usuario y disconnect con IDs no marcadas
  const vacunas = Object.groupBy(vacunasIDs, vacuna => formData.get(vacuna.id) !== null ? 'connect' : 'disconnect')

  // -> Si NO disponemos de NodeJS 21+ 
  // const connect = vacunasIDs.filter(vacuna => formData.get(vacuna.id) !== null)
  // const disconnect = vacunasIDs.filter(vacuna => formData.get(vacuna.id) === null)
  // const vacunas = { connect, disconnect }

  // Información para depuración
  // console.log('VACUNAS ', vacunas);

  try {
    // si tenemos nuevo archivo en el input type=file
    if (file.size > 0) {
      foto = await imageUpload(file)
      console.log('foto', foto);
    }

    const mascota = await prisma.mascota.update({
      where: { id },
      data: {
        nombre,
        descripcion,
        fecha_nacimiento,
        foto,
        protectoraId,
        vacunas,
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
export async function eliminarMascota(prevState, formData) {
  const id = Number(formData.get('id'))

  try {
    const mascota = await prisma.mascota.delete({
      where: {
        id: id,
      },
    })

    // revalidatePath('/mascotas')
    return { success: 'Eliminación exitosa' }
  } catch (error) {
    return { error: error.message }
  }
}



//// VACUNAS

export async function nuevaVacuna(prevState, formData) {
  const nombre = formData.get('nombre')
  const especie = formData.get('especie')

  // Array con IDs de todas las mascotas
  const mascotasIDs = await obtenerMascotasIDs()  // Formato: [ {id: 1}, {id: 2}, ...]

  const connect = mascotasIDs.filter(mascota => formData.get(mascota.id) !== null)
  const mascotas = { connect }

  // Información de depuración
  // console.log('MASCOTAS ', mascotas);


  try {
    const vacuna = await prisma.vacuna.create({
      data: {
        nombre,
        especie,
        mascotas,
      }
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

  // Array con IDs de todas las mascotas
  const mascotasIDs = await obtenerMascotasIDs()  // Formato: [ {id: 1}, {id: 2}, ...]

  // -> Si disponemos de NodeJS 21+
  // Objecto con 2 arrays: connect con IDs de mascotas marcadas por el usuario y disconnect con IDs no marcadas
  const mascotas = Object.groupBy(mascotasIDs, mascota => formData.get(mascota.id) !== null ? 'connect' : 'disconnect')

  // -> Si NO disponemos de NodeJS 21+ 
  // const connect = mascotasIDs.filter(mascota => formData.get(mascota.id) !== null)
  // const disconnect = mascotasIDs.filter(mascota => formData.get(mascota.id) === null)
  // const mascotas = { connect, disconnect }

  // Información para depuración
  console.log('MASCOTAS ', mascotas);

  try {
    const vacuna = await prisma.vacuna.update({
      where: { id },
      data: {
        nombre,
        especie,
        mascotas,
      }
    })

    revalidatePath('/vacunas')
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
export async function eliminarVacuna(prevState, formData) {
  const id = Number(formData.get('id'))

  try {
    const vacuna = await prisma.vacuna.delete({
      where: {
        id: id,
      },
    })

    // revalidatePath('/vacunas')
    return { success: 'Eliminación exitosa' }
  } catch (error) {
    return { error: error.message }
  }
}





//// PROTECTORAS

export async function nuevaProtectora(prevState, formData) {
  const nombre = formData.get('nombre')
  const localidad = formData.get('localidad')
  const telefono = formData.get('telefono')

  try {
    const protectora = await prisma.protectora.create({
      data: { nombre, localidad, telefono },
    })

    revalidatePath('/protectoras')
    return { success: 'Creación exitosa' }
  } catch (error) {
    return { error: error.message }
  }
}


export async function modificarProtectora(prevState, formData) {
  const id = Number(formData.get('id'))
  const nombre = formData.get('nombre')
  const localidad = formData.get('localidad')
  const telefono = formData.get('telefono')

  try {
    const protectora = await prisma.protectora.update({
      where: { id },
      data: { nombre, localidad, telefono },
    })

    revalidatePath('/protectoras')
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
export async function eliminarProtectora(prevState, formData) {
  const id = Number(formData.get('id'))

  try {
    const protectora = await prisma.protectora.delete({
      where: {
        id: id,
      },
    })

    //revalidatePath('/protectoras')
    return { success: 'Eliminación exitosa' }
  } catch (error) {
    return { error: error.message }
  }
}

