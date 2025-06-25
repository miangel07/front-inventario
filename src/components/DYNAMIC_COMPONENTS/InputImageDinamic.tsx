import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useState } from "react";
import { Upload, X } from "lucide-react";

interface InputImageProps {
  name: string;
  register: UseFormRegister<any> | undefined;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors;
  placeholder?: string;
  width?: string;
  height?: string;
}

const InputImageDinamic = ({
  name,
  register,
  setValue,
  errors,
  placeholder = "Subir imagen",
  width = "7rem",
  height = "7rem",
}: InputImageProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    // console.log("Archivo seleccionado:", file);
    setValue(name, file); // <-- Actualizar el valor en react-hook-form
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const removeImage = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setPreview(null);
    setValue(name, null); // <-- Restablecer en react-hook-form

    const fileInput = document.getElementById(name) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div className="relative flex flex-col items-center gap-2 w-full">
      {preview ? (
        <div
          style={{ width, height }}
          className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-md p-2 relative"
        >
          <img
            src={preview}
            alt="Vista previa"
            style={{
              width: `calc(${width} - 1rem)`,
              height: `calc(${height} - 1rem)`,
            }}
            className="object-cover rounded-md"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label
          htmlFor={name}
          style={{ width, height }}
          className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-md cursor-pointer p-2 hover:border-blue-500 transition"
        >
          <div className="flex flex-col items-center text-gray-500">
            <Upload size={30} />
            <p className="text-xs text-center">{placeholder}</p>
          </div>
        </label>
      )}

      <input
        type="file"
        accept="image/*"
        id={name}
        className="hidden"
        {...(register
          ? {
              ...register(name, {
                setValueAs: (value) => {
                  // Asegurarse de que el archivo File se mantenga como tal
                  return value instanceof FileList && value.length > 0
                    ? value[0]
                    : value;
                },
              }),
              onChange: (e) => {
                if (register) register(name).onChange(e);
                handleImageChange(e);
              },
            }
          : {
              onChange: handleImageChange,
            })}
      />

      {errors[name] && (
        <p className="text-xs text-red-500 font-roboto">
          {errors[name].message as string}
        </p>
      )}
    </div>
  );
};

export default InputImageDinamic;
