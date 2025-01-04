
function VacunaVer({ vacuna = {} }) {
    return (
        <div>
            <p><strong>{vacuna?.nombre}</strong></p>
            <p>Especie: {vacuna?.especie}</p>
        </div>
    )
}


export default VacunaVer

