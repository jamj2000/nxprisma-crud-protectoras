'use client'   // <---- IMPORTANTE

import { Form, Button, CreateIcon, DeleteIcon, Modal, UpdateIcon, ViewIcon } from "@/components/simpleui";
import { createMascota, deleteMascota, updateMascota } from "@/lib/actions/mascotas";
import Image from 'next/image';
import { defaultImage } from '@/lib/constants';
// import { ViewTransition } from "react";



const fields = (data) => [
    {
        name: "foto",
        label: "Foto",
        component: "InputImage",
        width: 240,
        height: 240,
        className: "self-end"
    },
    {
        name: "nombre",
        label: "Nombre",
        component: "InputText"
    },
    {
        name: "descripcion",
        label: "Descripción",
        component: "InputText",
    },
    {
        name: "fecha_nacimiento",
        label: "Fecha de nacimiento",
        component: "InputDate",
        // value: data.fecha_nacimiento?.toISOString().split('T')[0] ?? new Date().toISOString().split('T')[0]
    },
    {
        name: "protectoraId",
        label: "Protectora",
        component: "InputSelect",
        options: data?.protectorasIdNombre?.map(({ id, nombre }) => ([nombre, id, (data.protectora?.id ?? data.protectoraId) == id])) ?? []
    },
    {
        name: "vacunas",
        label: "Vacunas",
        component: "InputGroup",
        multiple: true,
        options: data?.vacunasIdNombre?.map(({ id, nombre }) => ([nombre, id, data?.vacunas?.find(v => v.id == id)])) ?? []
    }
]



const FormMascota = ({ data = {}, action, disabled }) => {

    const submit = () => {
        switch (action) {
            case createMascota: return {
                color: "green",
                component: "Submit",
                labels: ["Registrar mascota", "Registrando mascota ..."],
            }

            case updateMascota: return {
                color: "orange",
                component: "Submit",
                labels: ["Modificar mascota", "Modificando mascota ..."],
            }

            case deleteMascota: return {
                color: "red",
                component: "Submit",
                labels: ["Eliminar mascota", "Eliminando mascota ..."]
            }
            default:
                return null
        }
    }

    const submitField = submit();

    return (
        <Form
            data={data}
            action={action}
            disabled={disabled}
            fields={[
                ...fields(data),
                ...(submitField ? [submitField] : [])
            ]}
        />
    )
}


const CreateButton = () => (
    <Button color="green">
        <CreateIcon className={"size-4 md:size-6"} />
    </Button>
)


const UpdateButton = () => (
    <Button color="orange">
        <UpdateIcon className={"size-4 md:size-6"} />
    </Button>
)

const DeleteButton = () => (
    <Button color="red">
        <DeleteIcon className={"size-4 md:size-6"} />
    </Button>
)


const ViewButton = () => (
    <Button color="blue">
        <ViewIcon className={"size-4 md:size-6"} />
    </Button>
)



export const CreateMascota = ({ data = {} }) => (
    <Modal trigger={<CreateButton />} className="my-1">
        <h2 className="text-xl font-bold mb-4 text-green-400">Nueva Mascota</h2>

        <FormMascota data={data} action={createMascota} />
    </Modal>
)


export const UpdateMascota = ({ data = {} }) => (
    <Modal trigger={<UpdateButton />}>
        <h2 className="text-xl font-bold mb-4 text-orange-400">Modificar Mascota</h2>

        <FormMascota data={data} action={updateMascota} />
    </Modal>
)




export const DeleteMascota = ({ data = {} }) => (
    <Modal trigger={<DeleteButton />}>
        <h2 className="text-xl font-bold mb-4 text-red-400">Eliminar Mascota</h2>

        <FormMascota data={data} action={deleteMascota} disabled />
    </Modal>
)


export const ViewMascota = ({ data = {} }) => (
    <Modal trigger={<ViewButton />}>
        <h2 className="text-xl font-bold mb-4 text-blue-400">Información de la Mascota</h2>

        <FormMascota data={data} action={async () => ({ type: "success" })} disabled />
    </Modal>
)




export const CardMascota = ({ data, actions }) => (
    <div className="p-4 flex flex-col gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-600 rounded-md shadow-md shadow-current/20">

        <div className="grid grid-cols-[80px_auto] gap-2">

            {/* <ViewTransition name={`mascota-foto-${data.id}`}> */}
            <Image src={data.foto || defaultImage} alt={data.nombre || 'mascota'} width={80} height={80} className="object-cover rounded-md shadow-sm" />
            {/* </ViewTransition> */}


            <div>
                <div className="font-semibold ">{data.nombre}</div>

                <div className="text-sm text-gray-500 dark:text-gray-300">{data.descripcion}</div>

                <div className="mt-2 xl:mt-0">{data.fecha_nacimiento}</div>

            </div>
        </div>

        {actions &&
            <div className="flex gap-1 self-end" onClick={e => e.stopPropagation()}>
                {actions.map((Action, index) =>
                    <Action key={index} data={data} />
                )}
            </div>
        }
    </div>
)



export const CardMascota2 = ({ data, actions }) => (

    <div className={`
        place-self-stretch p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-600 rounded-md shadow-md shadow-current/20
        xl:p-2 xl:grid xl:grid-cols-[2fr_3fr_1fr_1fr] xl:border-none xl:rounded-none xl:items-center xl:gap-4 xl:bg-inherit xl:dark:bg-inherit
       `}
    >

        <div className="xl:col-span-3 grid grid-cols-[80px_auto] gap-2">
            {/* <ViewTransition name={`mascota-foto-${data.id}`}> */}
            <Image src={data.foto || defaultImage} alt={data.nombre || 'mascota'} width={80} height={80} className="object-cover rounded-md shadow-sm" />
            {/* </ViewTransition> */}

            <div>
                <div className="font-semibold ">{data.nombre}</div>

                <div className="text-sm text-gray-500 dark:text-gray-300">{data.descripcion}</div>

                <div className="mt-2 xl:mt-0">{data.fecha_nacimiento}</div>
            </div>
        </div>

        <div className="mt-3 xl:mt-0 flex justify-end">
            {actions &&
                <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                    {actions.map((Action, index) =>
                        <Action key={index} data={data} />
                    )}
                </div>
            }
        </div>
    </div>
)