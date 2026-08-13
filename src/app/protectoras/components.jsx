'use client'   // <---- IMPORTANTE

import { Form, Button, CreateIcon, DeleteIcon, Modal, UpdateIcon, ViewIcon } from "@/components/simpleui";
import { createProtectora, deleteProtectora, updateProtectora } from "@/app/protectoras/actions";



const fields = (data) => [
    {
        name: "nombre",
        label: "Nombre",
        component: "InputText"
    },
    {
        name: "localidad",
        label: "Localidad",
        component: "InputText"
    },

    {
        name: "telefono",
        label: "Telefono",
        component: "InputText"
    },
    {
        name: "mascotas",
        label: "Mascotas",
        component: "InputGroup",
        multiple: true,
        options: data?.mascotasIdNombre?.map(({ id, nombre }) => ([nombre, id, data?.mascotas?.find(m => m.id == id)])) ?? []
    },
]


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



export const CreateProtectora = ({ data = {} }) => (
    <Modal trigger={<CreateButton />} className="my-1">
        <h2 className="text-xl font-bold mb-4 text-green-400">Nueva Protectora</h2>

        <Form
            data={data}
            action={createProtectora}
            fields={[
                ...fields(data),
                {
                    labels: ["Guardar protectora", "Guardando protectora ..."],
                    component: "Submit",
                    color: "green"
                }
            ]}
        />

    </Modal>
)


export const UpdateProtectora = ({ data = {} }) => (
    <Modal trigger={<UpdateButton />}>
        <h2 className="text-xl font-bold mb-4 text-orange-400">Modificar Protectora</h2>

        <Form
            data={data}
            action={updateProtectora}
            fields={[
                ...fields(data),
                {
                    labels: ["Modificar protectora", "Actualizando protectora ..."],
                    component: "Submit",
                    color: "orange"
                }
            ]}
        />

    </Modal>
)




export const DeleteProtectora = ({ data = {} }) => (
    <Modal trigger={<DeleteButton />}>
        <h2 className="text-xl font-bold mb-4 text-red-400">Eliminar Protectora</h2>

        <Form
            data={data}
            action={deleteProtectora}
            fields={[
                ...fields(data),
                {
                    labels: ["Eliminar protectora", "Eliminando protectora ..."],
                    component: "Submit",
                    color: "red"
                }
            ]}
            disabled />

    </Modal>
)


export const ViewProtectora = ({ data = {} }) => (
    <Modal trigger={<ViewButton />}>
        <h2 className="text-xl font-bold mb-4 text-blue-400">Ver Protectora</h2>

        <Form
            data={data}
            action={async () => ({ type: "success", message: "Hasta la próxima" })}
            fields={[
                ...fields(data),
                {
                    labels: ["Aceptar", "..."],
                    component: "Submit",
                    color: "blue"
                }
            ]}
            disabled />

    </Modal>
)



export const CardProtectora = ({ data, actions }) => (
    <div className="p-4 flex flex-col gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-600 rounded-md shadow-md shadow-current/20">

        <div className="font-semibold ">{data.nombre}</div>

        <div className="text-sm text-gray-500 dark:text-gray-300">{data.localidad}</div>

        <div className="mt-2 xl:mt-0">{data.telefono}</div>

        {actions &&
            <div className="flex gap-1 self-end" onClick={e => e.stopPropagation()}>
                {actions.map((Action, index) =>
                    <Action key={index} data={data} />
                )}
            </div>
        }
    </div>
)

