'use client'   // <---- IMPORTANTE

import { Form, Button, CreateIcon, DeleteIcon, Modal, UpdateIcon, ViewIcon } from "@/components/simpleui";
import { createVacuna, deleteVacuna, updateVacuna } from "@/app/vacunas/actions";



const fields = (data) => [
    {
        name: "nombre",
        label: "Nombre",
        component: "InputText"
    },
    {
        name: "especie",
        label: "Especie",
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



export const CreateVacuna = ({ data = {} }) => (
    <Modal trigger={<CreateButton />} className="my-1">
        <h2 className="text-xl font-bold mb-4 text-green-400">Nueva Vacuna</h2>

        <Form
            data={data}
            action={createVacuna}
            fields={[
                ...fields(data),
                {
                    labels: ["Guardar vacuna", "Guardando vacuna ..."],
                    component: "Submit",
                    color: "green"
                }
            ]}
        />

    </Modal>
)


export const UpdateVacuna = ({ data = {} }) => (
    <Modal trigger={<UpdateButton />}>
        <h2 className="text-xl font-bold mb-4 text-orange-400">Modificar Vacuna</h2>

        <Form
            data={data}
            action={updateVacuna}
            fields={[
                ...fields(data),
                {
                    labels: ["Modificar vacuna", "Actualizando vacuna ..."],
                    component: "Submit",
                    color: "orange"
                }
            ]}
        />

    </Modal>
)




export const DeleteVacuna = ({ data = {} }) => (
    <Modal trigger={<DeleteButton />}>
        <h2 className="text-xl font-bold mb-4 text-red-400">Eliminar Vacuna</h2>

        <Form
            data={data}
            action={deleteVacuna}
            fields={[
                ...fields(data),
                {
                    labels: ["Eliminar vacuna", "Eliminando vacuna ..."],
                    component: "Submit",
                    color: "red"
                }
            ]}
            disabled />

    </Modal>
)


export const ViewVacuna = ({ data = {} }) => (
    <Modal trigger={<ViewButton />}>
        <h2 className="text-xl font-bold mb-4 text-blue-400">Ver Vacuna</h2>

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



export const CardVacuna = ({ data, actions }) => (
    <div className="p-4 flex flex-col gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-600 rounded-md shadow-md shadow-current/20">

        <div className="font-semibold ">{data.nombre}</div>

        <div className="text-sm text-gray-500 dark:text-gray-300">{data.descripcion}</div>

        <div className="mt-2 xl:mt-0">{data.especie}</div>

        {actions &&
            <div className="flex gap-1 self-end" onClick={e => e.stopPropagation()}>
                {actions.map((Action, index) =>
                    <Action key={index} data={data} />
                )}
            </div>
        }
    </div>
)



export const CardVacuna2 = ({ data, actions }) => (

    <div className={`
        place-self-stretch p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-600 rounded-md shadow-md shadow-current/20
        xl:p-2 xl:grid xl:grid-cols-[2fr_3fr_1fr_1fr] xl:border-none xl:rounded-none xl:items-center xl:gap-4 xl:bg-inherit xl:dark:bg-inherit
       `}
    >

        <div className="font-semibold ">{data.nombre}</div>

        <div className="text-sm text-gray-500 dark:text-gray-300">{data.descripcion}</div>

        <div className="mt-2 xl:mt-0">{data.especie}</div>

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