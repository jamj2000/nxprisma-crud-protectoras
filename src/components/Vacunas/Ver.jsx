
function VacunaVer({ vacuna = {} }) {
    return (
        <div>
            <div className="mb-4">
                <p className='text-2xl'>{vacuna?.nombre}</p>
                <p>Especie: {vacuna?.especie}</p>
            </div>
        </div >
    )
}


export default VacunaVer

