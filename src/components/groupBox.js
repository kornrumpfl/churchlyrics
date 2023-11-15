
import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

export default function GroupBox({ numberOfGroupedLines }) {
    const [selectedNumberOfLines, setSelectedNumberOfLines] = useState(null);
    const lines = [
        { name: 'Single line', code: 'One' },
        { name: 'Two lines', code: 'Two' },
        { name: 'Three lines', code: 'Three' },
        { name: 'Four lines', code: 'Four' }
    ];

    const dealWithData = (data) => {
        setSelectedNumberOfLines(data)
        numberOfGroupedLines(data.name)
    }

    return (
        <div className="card flex align-items-center justify-content-center" >
            <Dropdown value={selectedNumberOfLines} onChange={(e) => dealWithData(e.value)} options={lines} optionLabel="name"
                placeholder="How many lines do you want to group?  " className="w-full md:w-25rem" />
        </div>
    )
}
