// import { Autocomplete, AutocompleteItem } from "@heroui/react";
// import { SearchIcon } from 'lucide-react';
// import { Control, Controller, FieldErrors } from 'react-hook-form';

// export interface PropsAutoComplete {
//     data?: { key: string | number, label: string, decripcion?: string }[]
//     label: string;
//     defaultValue?: string | number;
//     control: Control<any>;
//     errors?: FieldErrors;
//     placeholder?: string;
//     name: string;
//     className?: string;
//     id?: string
//     radius?: "none" | "sm" | "md" | "lg" | "full"
//     isRequired?: boolean
//     isDisabled?:boolean,
//     variant?: "flat" | "bordered" | "faded" | "underlined";
//     onSelectionChange?: (selectedKey: string | number) => void;
//     onBlurCustom?: () => void; 
//     onInputChange?: (value: string) => void; 
// }

// const SelectSearchAutoCompleteDinamic = ({
//     data,
//     label,
//     id,
//     defaultValue,
//     control,
//     name,
//     isRequired = false,
//     placeholder,
//     isDisabled,
//     errors,
//     className,
//     radius = "full",
//     variant = "bordered",
//     onSelectionChange,
//     onInputChange, 
//     onBlurCustom,
// }: PropsAutoComplete) => {

//     return (
//         <Controller
//             name={name}
//             control={control}
//             defaultValue={defaultValue || null}
//             render={({ field: { onChange, value } }) => (
//                 <Autocomplete
//                     id={id ? id : name}
//                     isRequired={isRequired}
//                     className={`${className} truncate font-roboto line-clamp-1`}
//                     defaultItems={data}
//                     selectedKey={value || ''}
//                     onBlur={() => {
                      
//                         if (onBlurCustom) onBlurCustom();
//                     }}
//                     onSelectionChange={(val) => {
//                         onChange(val || ''); 
//                         if (onSelectionChange) {
//                             onSelectionChange(val as string | number);
//                         }
//                     }}
//                     onInputChange={(value) => {
                       
//                         if (onInputChange) {
//                             onInputChange(value);
//                         }
//                     }}
//                     label={label}
//                     isDisabled={isDisabled ?isDisabled :false }
//                     placeholder={placeholder}
//                     isInvalid={!!errors?.[name]}
//                     errorMessage={errors?.[name]?.message as string}
//                     radius={radius}
//                     startContent={<SearchIcon className="text-default-400" size={20} strokeWidth={2.5} />}
//                     variant={variant}
//                     aria-labelledby={name}
//                 >
//                     {(item) => (
//                         <AutocompleteItem key={item.key} className=" font-roboto " description={item.decripcion}>
//                             {item.label}
//                         </AutocompleteItem>
//                     )}
//                 </Autocomplete>
//             )}
//         />
//     );
// };

// export default SelectSearchAutoCompleteDinamic;


import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { SearchIcon } from 'lucide-react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

export interface PropsAutoComplete {
    data?: { key: string | number, label: string, decripcion?: string }[]
    label: string;
    defaultValue?: string | number;
    control: Control<any>;
    errors?: FieldErrors;
    placeholder?: string;
    name: string;
    className?: string;
    id?: string
    radius?: "none" | "sm" | "md" | "lg" | "full"
    isRequired?: boolean
    isDisabled?:boolean,
    variant?: "flat" | "bordered" | "faded" | "underlined";
    onSelectionChange?: (selectedKey: string | number) => void;
    onBlurCustom?: () => void; 
    onInputChange?: (value: string) => void; 
    valueType?: 'string' | 'number' // Nueva prop
}

const SelectSearchAutoCompleteDinamic = ({
    data,
    label,
    id,
    defaultValue,
    control,
    name,
    isRequired = false,
    placeholder,
    isDisabled,
    errors,
    className,
    radius = "full",
    variant = "bordered",
    onSelectionChange,
    onInputChange, 
    onBlurCustom,
    valueType = 'string',
}: PropsAutoComplete) => {

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || null}
            render={({ field: { onChange, value } }) => (
                <Autocomplete
                    id={id ? id : name}
                    isRequired={isRequired}
                    className={`${className} truncate font-roboto line-clamp-1`}
                    defaultItems={data}
                                        selectedKey={
                        value !== null && value !== undefined 
                            ? valueType === 'number' 
                                ? String(value) // Autocomplete espera string, pero luego lo convertiremos
                                : String(value)
                            : ''
                    }
                    onBlur={() => {
                      
                        if (onBlurCustom) onBlurCustom();
                    }}
                    onSelectionChange={(val) => {
                        const finalValue = val 
                            ? valueType === 'number' 
                                ? Number(val) 
                                : val
                            : '';
                        
                        onChange(finalValue);
                        
                        if (onSelectionChange) {
                            onSelectionChange(finalValue as string | number);
                        }
                    }}
                    onInputChange={(value) => {
                       
                        if (onInputChange) {
                            onInputChange(value);
                        }
                    }}
                    label={label}
                    isDisabled={isDisabled ?isDisabled :false }
                    placeholder={placeholder}
                    isInvalid={!!errors?.[name]}
                    errorMessage={errors?.[name]?.message as string}
                    radius={radius}
                    startContent={<SearchIcon className="text-default-400" size={20} strokeWidth={2.5} />}
                    variant={variant}
                    aria-labelledby={name}
                >
                    {(item) => (
                        <AutocompleteItem key={item.key} className=" font-roboto " description={item.decripcion}>
                            {item.label}
                        </AutocompleteItem>
                    )}
                </Autocomplete>
            )}
        />
    );
};

export default SelectSearchAutoCompleteDinamic;