'use client'

import { useState } from "react";


// img: Drag over
function dragOverHandler(ev) {
    ev.preventDefault();
}


// img: Drop
function dropHandler(ev) {
    ev.preventDefault();
    const imgPreview = ev.target;
    const fileInput = ev.target.nextSibling;
    // console.dir(ev.target)

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        // console.log(...ev.dataTransfer.items);
        [...ev.dataTransfer.items].forEach((item, i) => {
            // If dropped items are files ...
            if (item.kind === "file") {
                const file = item.getAsFile();
                fileInput.files = ev.dataTransfer.files;  // IMPORTANTE: Copia imagen al input type='file'

                let reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onloadend = () => imgPreview.src = reader.result
            }
        });
    }
}


// img: Double click
function dblclickHandler(ev) {
    const fileInput = ev.target.nextSibling;

    fileInput.click();
}


// input: Change
function changeHandler(ev) {
    const imgPreview = ev.target.previousSibling;
    const fileInput = ev.target;

    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);   // elegimos únicamente el primer archivo
        reader.onload = (e) => imgPreview.setAttribute("src", e.target.result);
    }
}


export const default_image = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iNTEyLjAwMDAwMHB0IiBoZWlnaHQ9IjUxMi4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDUxMi4wMDAwMDAgNTEyLjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsNTEyLjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKZmlsbD0iIzVlNWU1ZSIgc3Ryb2tlPSJub25lIj4KPHBhdGggZD0iTTM5MzUgNDU3NSBjLTI3IC03IC01NCAtMTEgLTU5IC04IC01IDQgLTYgMCAtMSAtNyA2IC0xMCA0IC0xMiAtOQotNyAtMTAgNCAtMTUgMyAtMTEgLTMgNiAtMTAgLTkgLTE1IC0zMCAtMTAgLTUgMSAtNyAtMSAtNCAtNCAzIC00IC0xMyAtMjUKLTM2IC00OSAtNjcgLTY2IC04MyAtMTY5IC0zMyAtMjE0IDE5IC0xNyAyMSAtMTcgNjEgNiAxMzMgNzcgMjA4IDk2IDI4MSA3MQo0NSAtMTQgOTggLTU4IDg5IC03MiAtMyAtNyAtMSAtOCA1IC00IDI4IDE3IDEwOCAtMjA4IDEwMCAtMjgxIC0yIC0xOCAwIC0yOQo2IC0yNiAxNCA5IDAgLTE4MCAtMTkgLTI2NiAtMjEgLTkwIC01OCAtMTg0IC03MCAtMTc0IC00IDUgLTUgMiAtMSAtNSAxMSAtMTkKLTY1IC0xNDIgLTEzNSAtMjE2IC0zMiAtMzUgLTg0IC04MCAtMTE0IC0xMDEgbC01NCAtMzggLTEzMyAxOSBjLTE5NCAyOCAtNzUyCjI3IC05ODggLTEgLTkxIC0xMSAtMTg0IC0xOSAtMjA3IC0yMCAtMjIgMCAtMzkgLTMgLTM3IC02IDIgLTQgLTIwIC05IC00OQotMTIgLTI4IC00IC0xMTAgLTE4IC0xODIgLTMyIC03MSAtMTQgLTEzNiAtMjMgLTE0NCAtMjAgLTkgMyAtMTIgMyAtOCAtMiAxMAotMTAgLTIxMSAtNjIgLTI5OSAtNjkgLTg4IC04IC0yMDcgMyAtMTk4IDE4IDUgNyAyIDggLTYgMyAtMTYgLTEwIC05MSAxNSAtODMKMjggNCA2IDEgNyAtNiAzIC0xNyAtMTEgLTg1IDM3IC0xNTggMTExIC03NSA3NiAtMTY3IDEzNyAtMjQyIDE2MCAtNjIgMTkKLTE4NiAxMTYgLTE3NCAxMzYgMyA3IDMgOSAtMiA1IC00IC00IC0zMyAxNSAtNjMgNDMgLTMxIDI4IC01NyA0NyAtNTggNDMgLTIKLTUgLTggLTU1IC0xNCAtMTExIC04IC02MyAtMTcgLTEwMyAtMjQgLTEwMyAtMjUgMCAtMTQzIC02MyAtMTc0IC05MyAtMTggLTE3Ci0zNyAtNDggLTQzIC02OSAtNSAtMjEgLTM2IC03MSAtNjggLTExMSAtODIgLTEwMyAtODUgLTEwOSAtNjYgLTE1MyA4IC0yMCAxMgotNDEgOCAtNDcgLTMgLTUgLTIgLTcgNCAtNCA2IDQgMTggLTExIDI4IC0zMyAyOCAtNjMgNTAgLTgwIDEwMCAtODAgMTE5IDAKMjMxIC00OSAzMzAgLTE0NCA5OSAtOTcgMTA1IC0xMTUgMTA0IC0zMDggMCAtOTAgLTQgLTI0MiAtOCAtMzM4IGwtNyAtMTc1Ci01MyAtOTcgYy0zMCAtNTQgLTU5IC05NCAtNjQgLTkxIC02IDMgLTcgMSAtMyAtNSAxMyAtMjIgLTE0OCAtMjM1IC0yNjkgLTM1NwotMTE3IC0xMTcgLTEzNCAtMTI3IC0yMjAgLTEzMyAtNTkgLTQgLTc4IC05IC05MyAtMjYgLTMyIC0zNCAtMzUgLTYwIC0xMSAtODkKMjAgLTI3IDIyIC0yNyAxNDMgLTI3IDEwNiAwIDEyNyAzIDE0OCAxOSAxMyAxMSA2NCA0NiAxMTMgNzkgODQgNTUgNTUzIDQzMQo2MzkgNTExIDIxIDIwIDYyIDY4IDkxIDEwNiA4MSAxMDkgMTc3IDE2NSAyNDYgMTQ1IDE5IC02IDcyIC0xMyAxMTkgLTE2IDExNQotOCAxNDQgLTE4IDE4NSAtNjcgNDIgLTQ5IDE2OCAtMjkxIDE1NyAtMzAyIC00IC01IC0yIC01IDQgLTIgNiAzIDM3IC00MiA3MgotMTA2IDUxIC05MiA2MiAtMTIwIDYyIC0xNTggMCAtNDMgLTMgLTQ5IC01MCAtODggLTQxIC0zNCAtNTAgLTQ4IC01MCAtNzQgMAotNTcgOSAtNjIgMTIwIC02NSAxNTEgLTYgMTQ4IC04IDE1MiAxNzMgMiA4MCAxIDE0NiAtMiAxNDggLTkgNCAtNzAgMjcwIC04MAozNTAgLTYgNDMgLTEwIDExMiAtMTAgMTUyIDAgNjYgMiA3NiAyMyA4OSAzMSAyMCAxMzUgNDkgMTUzIDQyIDggLTMgMTMgLTIgOQozIC0xMCAxNyAxMjYgMjUgMjExIDEzIDQ0IC03IDk1IC0xMiAxMTMgLTEyIDE4IDAgMzAgLTMgMjggLTcgLTMgLTUgNDcgLTcKMTEwIC01IDYzIDIgMTEzIDAgMTEwIC01IC0zIC00IDI5IC03IDcwIC01IDY5IDMgNzUgMiA4MCAtMTggMTcgLTYzIDc4IC0xNjQKMTQ0IC0yMzkgNDEgLTQ2IDczIC04NyA3MSAtOTIgLTEgLTUgMiAtOCA3IC03IDUgMiAyOSAtMjMgNTQgLTU2IDU0IC02OCA3NgotMTQ0IDU4IC0xOTkgLTE0IC00MSAtMTQ2IC0xOTYgLTE3OCAtMjA4IC0xMyAtNSAtNDEgLTkgLTYxIC05IC00MyAwIC0xMDIKLTMzIC0xMDkgLTYwIC0zIC0xMSAtOSAtMTcgLTE0IC0xNSAtNCAzIC0zIC04IDIgLTI1IDE5IC01MiA0MSAtNjAgMTY0IC02MApsMTEwIDAgMTc1IDIwMCBjOTYgMTEwIDE4MyAyMTcgMTk0IDIzNyAzMCA1OSAzMyAxODAgNyAyNzQgLTM1IDEyNCAtMjQgMTk5CjI3IDE5OSAzMiAwIDYyIC0xMiA1NSAtMjMgLTMgLTUgLTEgLTcgNCAtNCA2IDQgNTAgLTcgOTkgLTIzIDQ5IC0xNyAxMzMgLTM5CjE4NiAtNTAgMTE2IC0yNCAxMzAgLTI5IDEyMSAtNDMgLTQgLTYgLTEgLTcgNiAtMiAyMSAxMyAxMTUgLTk1IDE1NSAtMTc2IDQ0Ci05MyA2NiAtMTgzIDY2IC0yNzcgMCAtNjggMiAtNzYgMjkgLTEwMyAzNSAtMzQgNTkgLTM2IDk1IC04IDY0IDUxIDY4IDk5IDI2CjMwOSAtMTYgNzkgLTI2IDE0OSAtMjMgMTU1IDQgNSAzIDcgLTIgMyAtNCAtNCAtMzEgNTAgLTYwIDEyMCAtMjkgNzAgLTU5IDE0MwotNjcgMTYyIC04IDE5IC0zOSA1OCAtNjkgODUgLTE1MSAxNDAgLTIzMyAyNDMgLTI2NiAzMzUgLTI0IDY2IC00OCAyMTQgLTM4CjIzMSA1IDcgNCAxMCAtMiA2IC0xMyAtOCAtMjkgMTA2IC0xNyAxMjQgNCA3IDMgOSAtMiA2IC0xNSAtOSAtNTYgMjY4IC00NAoyOTggNSAxNCAzNiA2NCA2OCAxMTMgMjg0IDQyNSAzODkgODI0IDI5MiAxMTExIC02NCAxOTIgLTIzMyAzNTQgLTQyMCA0MDMKLTc4IDIwIC0xMjggMjEgLTE5NSAzeiIvPgo8cGF0aCBkPSJNMzI3OCAzMjIzIGMxMiAtMiAzMiAtMiA0NSAwIDEyIDIgMiA0IC0yMyA0IC0yNSAwIC0zNSAtMiAtMjIgLTR6Ii8+CjwvZz4KPC9zdmc+Cg=="


/*
La propiedad image puede tomar 3 tipos de valores string:
- imagen codificada en base64
- nombre de archivo dentro de la carpeta public, p.ej: 'image.png' o 'images/image.png'
- nombre de URL de archivo, p.ej: 'https://.../image.png'
*/
export default function InputImage({ image = default_image }) {

    return (
        <>
            <img
                id='imgPreview'
                src={image}
                onDrop={dropHandler}
                onDragOver={dragOverHandler}
                onDoubleClick={dblclickHandler}
                style={{
                    display: 'block',
                    aspectRatio: 1,
                    width: '324px',
                    height: '324px',
                    objectFit: 'cover',
                    objectPosition: 'center'
                }} />
            <input
                type='file'
                name='file'
                accept='image/*'
                onChange={changeHandler}
                style={{ display: 'none' }} />

        </>

    )
}