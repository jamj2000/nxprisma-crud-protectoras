'use client'   // <---- IMPORTANTE

import { Form, Button, CreateIcon, DeleteIcon, Modal, UpdateIcon, ViewIcon } from "@/components/simpleui";
import { createMascota, deleteMascota, updateMascota } from "@/app/mascotas/actions";



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
        value: data.fecha_nacimiento?.toISOString().split('T')[0] ?? new Date().toISOString().split('T')[0]
    },
    {
        name: "protectoraId",
        label: "Protectora",
        component: "InputSelect",
        options: data?.protectorasIdNombre?.map(({ id, nombre }) => ([nombre, id, data.protectora?.id == id])) ?? []
    },
    {
        name: "vacunas",
        label: "Vacunas",
        component: "InputGroup",
        multiple: true,
        options: data?.vacunasIdNombre?.map(({ id, nombre }) => ([nombre, id, data?.vacunas?.find(v => v.id == id)])) ?? []
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



export const CreateMascota = ({ data = {} }) => (
    <Modal trigger={<CreateButton />} className="my-1">
        <h2 className="text-xl font-bold mb-4 text-green-400">Nueva Mascota</h2>

        <Form
            data={data}
            action={createMascota}
            fields={[
                ...fields(data),
                {
                    labels: ["Guardar mascota", "Guardando mascota ..."],
                    component: "Submit",
                    color: "green"
                }
            ]}
        />

    </Modal>
)


export const UpdateMascota = ({ data = {} }) => (
    <Modal trigger={<UpdateButton />}>
        <h2 className="text-xl font-bold mb-4 text-orange-400">Modificar Mascota</h2>

        <Form
            data={data}
            action={updateMascota}
            fields={[
                ...fields(data),
                {
                    labels: ["Modificar mascota", "Actualizando mascota ..."],
                    component: "Submit",
                    color: "orange"
                }
            ]}
        />

    </Modal>
)




export const DeleteMascota = ({ data = {} }) => (
    <Modal trigger={<DeleteButton />}>
        <h2 className="text-xl font-bold mb-4 text-red-400">Eliminar Mascota</h2>

        <Form
            data={data}
            action={deleteMascota}
            fields={[
                ...fields(data),
                {
                    labels: ["Eliminar mascota", "Eliminando mascota ..."],
                    component: "Submit",
                    color: "red"
                }
            ]}
            disabled />

    </Modal>
)


export const ViewMascota = ({ data = {} }) => (
    <Modal trigger={<ViewButton />}>
        <h2 className="text-xl font-bold mb-4 text-blue-400">Ver Mascota</h2>

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