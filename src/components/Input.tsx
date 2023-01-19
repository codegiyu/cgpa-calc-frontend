import { useState } from "react";

interface InputProps {
    label: string;
    type: string;
    name: string;
    value: string;
    placeholder: string;
    errorVal: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface Props {
    inputProps: InputProps;
}

const Input: React.FC<Props> = (props) => {
    let {label, type, name, value, errorVal, placeholder, handleInputChange} = props.inputProps

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
                <input 
                    type={type} 
                    name={name} 
                    value={value} 
                    onChange={(e) => handleInputChange(e)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    className={`input ${borderColor} ${shadow}`} 
                    required
                />
            </label>
            <div className="w-full h-4">
                <span className="text-red-700 text-xs">{errorVal}</span>
            </div>
        </fieldset>
    )
}

export default Input