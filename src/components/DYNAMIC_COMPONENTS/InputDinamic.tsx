import { Input } from "@heroui/react";
import { UseFormRegister, FieldErrors, Controller, Control } from "react-hook-form";

export interface propsInput {
  variants?: "bordered" | "flat" | "faded" | "underlined";
  placeholder: string;
  id: string;
  name: string;
  register?: UseFormRegister<any>;
  control?: Control<any>;
  type: string;
  errors: FieldErrors;
  onChangeCustom?: (value: string) => void;
  icon?: JSX.Element;
  iconStar?: JSX.Element;
  isReadOnly?: boolean;
  value?: string;
  isDisabled?: boolean
  isRequired?: boolean;
  decimal?: boolean;
}

export const InputDinamic = ({
  variants = "bordered",
  placeholder,
  id,
  name,
  control,
  type,
  errors,
  icon,
  isReadOnly,
  onChangeCustom,
  isRequired = false,
  iconStar,
  isDisabled,
  decimal = false
}: propsInput) => {

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
              isDisabled={isDisabled ? isDisabled : false}
              isReadOnly={isReadOnly ? isReadOnly : false}
              size="sm"
              type={type}
              id={id}
              label={placeholder}
              value={field.value || ""}
              onChange={
                (e) => {
                  field.onChange(e);
                  if (onChangeCustom) {
                    onChangeCustom(e.target.value);
                  }
                }}

              endContent={icon}
              className="font-roboto truncate"
              startContent={iconStar}
              min={type === "number" ? 0 : undefined}
              color={errors[name] ? "danger" : "default"}
              step={decimal ? "0.01" : undefined}
            />
          </div>
        )}
      />
      {errors[name] && (
        <p className="text-sm text-red-500 mt-1 font-roboto">{errors[name]?.message as string}</p>
      )}
    </div>
  );
}

