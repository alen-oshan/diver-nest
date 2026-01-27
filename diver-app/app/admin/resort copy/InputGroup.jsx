import React from 'react'

const InputGroup = ({ label, ...props }) => {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold text-gray-500">{label}</label>
            <input className="p-2 border rounded" {...props} />
        </div>
    );

}

export default InputGroup