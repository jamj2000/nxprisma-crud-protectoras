// 'use client'

import { CircleIcon, SquareIcon } from "./Icons";


export const InputCheck = ({ label = "", name, value, checked, disabled, icon, multiple = false }) => (
    <label className="flex items-center gap-2 w-fit">
        <input
            key={checked}
            type={multiple ? "checkbox" : "radio"}
            name={name}
            value={value}
            defaultChecked={checked}
            disabled={disabled}
            className="hidden peer"
        />
        {icon ? icon : (multiple ? <SquareIcon /> : <CircleIcon />)}
        <span className="peer-disabled:text-zinc-400">{label}</span>
    </label>
)

