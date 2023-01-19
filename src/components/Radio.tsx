
export interface RadioProps {
    label: string;
    name: string;
    value: string;
    checked: boolean;
    handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface Props {
    radioProps: RadioProps;
}

const Radio: React.FC<Props> = (props) => {
    let {label, name, value, checked, handleRadioChange} = props.radioProps

    return (
        <label className="flex items-center gap-3 w-fit">
            <input 
                type="radio" 
                name={name} 
                value={value} 
                checked={checked} 
                onChange={(e) => handleRadioChange(e)} 
                className="radio accent-purple" 
                required
            />
            <span>{label}</span>
        </label>
    )
}

export default Radio