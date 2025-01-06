
function VacunaVer({ vacuna = {} }) {
    return (
        <div>
            <div className="mb-4">
                <p className='text-2xl'>{vacuna?.nombre}</p>
                <p>Especie: {vacuna?.especie}</p>
                <p> Mascotas con esta vacuna: {vacuna?.mascotas?.map(mascota => mascota.nombre).join(', ')} </p>
            </div>
        </div >
    )
}


export default VacunaVer

