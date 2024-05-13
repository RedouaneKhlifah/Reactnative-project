type ValueType = string | number | boolean;
interface DropDownProps {
    value: ValueType | ValueType [] | null;
    placeholder: string;
    label: string;
    multiple?:boolean;
    items: { label: string; value: string }[];
    setValue: any; // Use Dispatch type here
    setItems: Dispatch<SetStateAction<{ label: string; value: string }[]>>; // Use Dispatch type here
    disableBorderRadius?: boolean;
    maxHeight?: number;
    dropDownDirection?: 'TOP' | 'BOTTOM';
    placeholderStyle?: object;
    labelTextStyle?: object;
    onSelectItem?:(value:object[]|string)=>void
}