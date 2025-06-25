// import { Input } from "@heroui/react";
// import { UseFormRegister, FieldErrors, Controller, Control } from "react-hook-form";

// export interface propsInput {
//   variants?: "bordered" | "flat" | "faded" | "underlined";
//   placeholder: string;
//   id: string;
//   name: string;
//   register?: UseFormRegister<any>;
//   control?: Control<any>;
//   type: string;
//   errors: FieldErrors;
//   onChangeCustom?: (value: string) => void;
//   icon?: JSX.Element;
//   iconStar?: JSX.Element;
//   isReadOnly?: boolean;
//   value?: string;
//   isDisabled?: boolean
//   isRequired?: boolean;
//   decimal?: boolean;
// }

// export const InputDinamic = ({
//   variants = "bordered",
//   placeholder,
//   id,
//   name,
//   control,
//   type,
//   errors,
//   icon,
//   isReadOnly,
//   onChangeCustom,
//   isRequired = false,
//   iconStar,
//   isDisabled,
//   decimal = false
// }: propsInput) => {

//   return (
//     <div className="w-full flex flex-col">
//       <Controller
//         name={name}
//         control={control}
//         render={({ field }) => (
//           <div className="flex w-full h-full flex-wrap md:flex-nowrap md:mb-0 gap-2 font-sans">
//             <Input
//               isRequired={isRequired}
//               variant={variants}
//               isDisabled={isDisabled ? isDisabled : false}
//               isReadOnly={isReadOnly ? isReadOnly : false}
//               size="sm"
//               type={type}
//               id={id}
//               label={placeholder}
//               value={field.value || ""}
//               onChange={
//                 (e) => {
//                   field.onChange(e);
//                   if (onChangeCustom) {
//                     onChangeCustom(e.target.value);
//                   }
//                 }}

//               endContent={icon}
//               className="font-roboto truncate"
//               startContent={iconStar}
//               min={type === "number" ? 0 : undefined}
//               color={errors[name] ? "danger" : "default"}
//               step={decimal ? "0.01" : undefined}
//             />
//           </div>
//         )}
//       />
//       {errors[name] && (
//         <p className="text-sm text-red-500 mt-1 font-roboto">{errors[name]?.message as string}</p>
//       )}
//     </div>
//   );
// }


import { Input } from "@heroui/react";
import { UseFormRegister, FieldErrors, Controller, Control } from "react-hook-form";

export type InputValueType = "string" | "number" | "boolean" | "date" | "email";

export interface PropsInput {
  variants?: "bordered" | "flat" | "faded" | "underlined";
  placeholder: string;
  id: string;
  name: string;
  register?: UseFormRegister<any>;
  control?: Control<any>;
  type: React.HTMLInputTypeAttribute;
  valueType?: InputValueType;
  errors: FieldErrors;
  onChangeCustom?: (value: any) => void;
  icon?: JSX.Element;
  iconStar?: JSX.Element;
  isReadOnly?: boolean;
  value?: any;
  isDisabled?: boolean;
  isRequired?: boolean;
  decimal?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
}

export const InputDinamic = ({
  variants = "bordered",
  placeholder,
  id,
  name,
  control,
  type = "text",
  valueType = "string",
  errors,
  icon,
  isReadOnly,
  onChangeCustom,
  isRequired = false,
  iconStar,
  isDisabled,
  decimal = false,
  min,
  max,
  pattern
}: PropsInput) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    let value: any = e.target.value;

    // Convertir el valor según el tipo especificado
    switch (valueType) {
      case "number":
        value = decimal ? parseFloat(value) : parseInt(value);
        if (isNaN(value)) value = "";
        break;
      case "boolean":
        value = Boolean(value);
        break;
      case "date":
        // Mantener como string pero validar formato
        break;
      case "email":
        // Mantener como string pero validar formato
        break;
      default:
        // "string" - no se necesita conversión
        break;
    }

    field.onChange(value);
    if (onChangeCustom) {
      onChangeCustom(value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>, field: any) => {
    // Para números, asegurarse de que no queden valores vacíos
    if (valueType === "number" && e.target.value === "") {
      const defaultValue = decimal ? 0.0 : 0;
      field.onChange(defaultValue);
      if (onChangeCustom) {
        onChangeCustom(defaultValue);
      }
    }
  };

  return (
    <div className="w-full flex flex-col">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex w-full h-full flex-wrap md:flex-nowrap md:mb-0 gap-2 font-sans">
            <Input
              isRequired={isRequired}
              variant={variants}
              isDisabled={isDisabled}
              isReadOnly={isReadOnly}
              size="sm"
              type={type}
              id={id}
              label={placeholder}
              value={field.value ?? ""}
              onChange={(e) => handleChange(e, field)}
              onBlur={(e) => handleBlur(e, field)}
              endContent={icon}
              className="font-roboto truncate"
              startContent={iconStar}
              min={min !== undefined ? min : type === "number" ? 0 : undefined}
              max={max}
              pattern={pattern}
              color={errors[name] ? "danger" : "default"}
              step={decimal ? "0.01" : undefined}
            />
          </div>
        )}
      />
      {errors[name] && (
        <p className="text-sm text-red-500 mt-1 font-roboto">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};