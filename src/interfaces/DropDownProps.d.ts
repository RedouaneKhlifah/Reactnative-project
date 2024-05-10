interface DropDownProps {
    open: boolean;
    value: string | null;
    placeholder: string;
    label: string;
    items: { label: string; value: string }[];
    setOpen: Dispatch<SetStateAction<boolean>>; // Use Dispatch type here
    setValue: Dispatch<SetStateAction<string | null>>; // Use Dispatch type here
    setItems: Dispatch<SetStateAction<{ label: string; value: string }[]>>; // Use Dispatch type here
    disableBorderRadius?: boolean;
    maxHeight?: number;
    dropDownDirection?: 'TOP' | 'BOTTOM';
    placeholderStyle?: object;
    labelTextStyle?: object;
}