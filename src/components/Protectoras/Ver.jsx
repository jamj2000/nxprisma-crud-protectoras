
function ProtectoraVer({ protectora = {} }) {
    return (
        <div>
            <p><strong>{protectora?.nombre}</strong></p>
            <p>Localidad: {protectora?.localidad}</p>
            <p>Teléfono: {protectora?.telefono}</p>
        </div>
    )
}


export default ProtectoraVer

