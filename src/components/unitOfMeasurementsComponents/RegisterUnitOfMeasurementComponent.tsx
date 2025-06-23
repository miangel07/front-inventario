import { useRegisterUnitOfMeasurementMutation, useUpdateUnitOfMeasurementMutation } from "@/store/slice/unitOfMeasurementSlice";
import { RegisterUnitOfMeasurementsProps, UnitOfMeasurementsType } from "@/types/unitOfMeasurementTypes/unitOfMeasurementType";
import { UnitOfMeasurementSchemaZod } from "@/validations/unitOfMeasurement/unitOfMeasurementSchemaZod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Barcode, Edit3, Loader2, PlusCircle, Ruler } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Id, toast } from "react-toastify";
import { InputDinamic } from "../DYNAMIC_COMPONENTS/InputDinamic";

const RegisterUnitOfMeasurementComponent = ({ onClose, unit }: RegisterUnitOfMeasurementsProps) => {
  const referenciaIdtostat = useRef<Id | null>(null);

  const [registerUnit, { isLoading: isLoadingRegister, isSuccess: isSuccessRegister, isError: isErrorRegister, error: errorRegister }] = useRegisterUnitOfMeasurementMutation();

  const [updateUnit, { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate, isError: isErrorUpdate, error: errorUpdate }] = useUpdateUnitOfMeasurementMutation();

  const isLoading = isLoadingRegister || isLoadingUpdate;
  const isSuccess = isSuccessRegister || isSuccessUpdate;
  const isError = isErrorRegister || isErrorUpdate;
  const error = errorRegister || errorUpdate;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UnitOfMeasurementsType>({
    resolver: zodResolver(UnitOfMeasurementSchemaZod),
    defaultValues: {},
  });

  useEffect(() => {
    if (unit) {
      reset(unit);
    }
  }, [unit, reset]);

  useEffect(() => {
    if (isLoading) {
      referenciaIdtostat.current = toast.loading("Procesando...");
    }
    if (isSuccess) {
      toast.dismiss(referenciaIdtostat.current!);
      toast.success(`Bodega ${unit ? "actualizada" : "registrada"} correctamente.`);
      onClose();
    }

    if (isError) {
      toast.dismiss(referenciaIdtostat.current!);
      if (Array.isArray(error)) {
        error.forEach((e) => toast.error(`${e.message}`));
      } else {
        toast.error("Ocurrió un error al procesar la solicitud");
      }
    }
  }, [isLoading, isSuccess, isError, error]);

  const onSubmit = async (data: UnitOfMeasurementsType) => {
    try {
      if (unit?.id) {
        await updateUnit({ ...data, id: unit.id }).unwrap();
      } else {
        await registerUnit(data).unwrap();
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Información Básica del Almacén */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Ruler className="w-4 h-4 text-cuarto" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Información de unidad de medida</h3>
                  <p className="text-sm text-gray-600">Datos básicos de la unidad de medida</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Ruler className="w-4 h-4" />
                    Nombre unidad de medida
                  </label>
                  <InputDinamic errors={errors} control={control} id="nameUnit" type="text" name="nameUnit" placeholder="Ingrese el nombre de la unidad de medida" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Barcode className="w-4 h-4" />
                    codigo de unidad de medida
                  </label>
                  <InputDinamic errors={errors} control={control} id="code" type="text" name="code" placeholder="Ingrese el codigo de la unidad de medida" />
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button type="button" onClick={onClose} className="flex-1 sm:flex-none px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium focus:ring-2 focus:ring-gray-200 focus:outline-none">
                Cancelar
              </button>

              <button type="submit" disabled={isLoadingRegister || isLoadingUpdate} className="flex-1 sm:flex-none px-6 py-3 bg-accents-500 text-white rounded-lg hover:bg-accents-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:outline-none flex items-center justify-center gap-2">
                {isLoadingRegister || isLoadingUpdate ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    {unit ? (
                      <>
                        <Edit3 className="w-4 h-4" />
                        Actualizar Almacén
                      </>
                    ) : (
                      <>
                        <PlusCircle className="w-4 h-4" />
                        Registrar Almacén
                      </>
                    )}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterUnitOfMeasurementComponent;
