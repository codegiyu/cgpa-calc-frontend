import { useState } from "react";
import uuid from "react-uuid";

interface SelectProps {
    label: string;
    name: string;
    value: string;
    defaultOption: string;
    errorVal: string;
    handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
}

interface Props {
    selectProps: SelectProps;
}

const Select: React.FC<Props> = (props) => {
    let {label, name, value, defaultOption, options, errorVal, handleSelectChange} = props.selectProps

    let [isFocused, setIsFocused] = useState<boolean>(false)

    let borderColor = errorVal ? "border-red-700" : isFocused ? "border-purple" : "border-white"
    let shadow = errorVal ? "shadow-error" : isFocused ? "shadow-input" : ""

    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleBlur = () => {
        setIsFocused(false)
    }

    return (
        <fieldset className="w-full">
            <label className="w-full flex flex-col gap-2">
                <span className="font-semibold text-purple">{label}</span>
                <select 
                    name={name} 
                    value={value} 
                    onChange={(e) => handleSelectChange(e)} 
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required 
                    className={`input ${borderColor} ${shadow}`} 
                >
                    <option value="" disabled>{defaultOption}</option>
                    {options.map(item => <option key={uuid()} value={item}>{item}</option>)}
                </select>
            </label>
            <div className="w-full h-4">
                <span className="text-red-700 text-xs">{errorVal}</span>
            </div>
        </fieldset>
    )
}

export default Select