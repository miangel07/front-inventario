import { ModalDinamic } from "@/components/DYNAMIC_COMPONENTS/ModalDinamic";
import RegisterUnitOfMeasurementComponent from "@/components/unitOfMeasurementsComponents/RegisterUnitOfMeasurementComponent";
import { useGetUnitOfMeasurementsQuery, useUpdateUnitOfMeasurementStateMutation } from "@/store/slice/unitOfMeasurementSlice";
import { Checkbox } from "@heroui/react";
import { Edit } from "lucide-react";
import { useEffect, useRef } from "react";
import { Id, toast } from "react-toastify";

const useListUnitOfMeasurementHook = ({ page = 1, search = "", limit = 10 }: { page?: number; search?: string; limit?: number }) => {
  const toastRefListar = useRef<Id | null>(null);
      const referenciaIdtostat = useRef<Id | null>(null);
  

  const { data, isLoading, isError, error } = useGetUnitOfMeasurementsQuery({
    page,
    search,
    limit,
  });

  const [updateUnitOfMeasurementStatus, { data: dataUpdateUnitOfMeasurementStatus, isSuccess: isSuccessUpdateUnitOfMeasurementStatus, isError: isErrorUpdateUnitOfMeasurementStatus, error: errorUpdateUnitOfMeasurementStatus }] = useUpdateUnitOfMeasurementStateMutation();

  const pagination = data?.meta;

  useEffect(() => {
    if (isLoading && !toastRefListar.current) {
      toastRefListar.current = toast.loading("Cargando categorias...");
    }

    if (!isLoading && toastRefListar.current) {
      toast.dismiss(toastRefListar.current);
      toastRefListar.current = null;
    }

    if (isError) {
      toast.error("Error al cargar las categorias");
    }
  }, [isLoading, isError]);

  useEffect(() => {
    if (isSuccessUpdateUnitOfMeasurementStatus) {
      toast.dismiss(referenciaIdtostat.current!);
      toast.success(`${dataUpdateUnitOfMeasurementStatus}`);
    }

    if (isErrorUpdateUnitOfMeasurementStatus && Array.isArray(errorUpdateUnitOfMeasurementStatus)) {
      toast.dismiss(referenciaIdtostat.current!);
      errorUpdateUnitOfMeasurementStatus.map((e) => toast.error(`${e.message}`));
    }
  }, [isSuccessUpdateUnitOfMeasurementStatus, isErrorUpdateUnitOfMeasurementStatus, errorUpdateUnitOfMeasurementStatus]);

  const UnitStatus = (id: number, NameCategory: string, currentStatus: string) => {
    try {
      if (id === 0) {
        return toast.error("Categorya no seleccionada");
      }

      // Determinar el nuevo estado (toggle)
      const newStatus = currentStatus === "active" ? "inactive" : "active";

      const confirmId = toast(
        () => (
          <div>
            <p>
              ¿Está seguro de cambiar el estado del usuario <strong>{NameCategory}</strong>?
            </p>
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                onClick={async () => {
                  toast.dismiss(confirmId);
                  referenciaIdtostat.current = toast.loading("Actualizando estado...");
                  try {
                    await updateUnitOfMeasurementStatus({ id, status: newStatus }).unwrap();
                  } catch (error) {
                    console.error("Error:", error);
                    toast.dismiss(referenciaIdtostat.current!);
                    toast.error("No se pudo actualizar el estado", {
                      position: "top-center",
                    });
                  }
                }}
                style={{
                  background: "green",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "4px",
                }}
              >
                Sí
              </button>
              <button
                onClick={() => toast.dismiss(confirmId)}
                style={{
                  background: "gray",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "4px",
                }}
              >
                No
              </button>
            </div>
          </div>
        ),
        {
          autoClose: false,
          position: "top-center",
        }
      );
    } catch (error) {
      console.error("Error al intentar mostrar la confirmación:", error);
      toast.error("Ocurrió un error al mostrar la confirmación", {
        position: "top-center",
      });
    }
  };

  const unitData =
    data?.data?.map((unit) => ({
      id: unit.id,
      active: (
        <Checkbox
          radius="full"
          size="lg"
          color="secondary"
          isSelected={unit.Status === "active"}
        onChange={() => UnitStatus(unit.id as number, unit.nameUnit, unit.Status as string)}
        />
      ),
      nameUnit: unit.nameUnit,
      code: unit.code,
      Status: <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${unit.Status === "active" ? "bg-accents-100 text-accents-800" : "bg-dangers-100 text-dangers-800"}`}>{unit.Status === "active" ? "Activo" : "Inactivo"}</span>,
      actions: (
        <>
          <ModalDinamic titleButon={<Edit size={15} className="cursor-pointer" />} sizeModal="4xl" titleModal="Actualizar unidad de medida" dataToEdit={unit} children={(onClose) => <RegisterUnitOfMeasurementComponent onClose={onClose} unit={unit} />} className="bg-white font-roboto" />
        </>
      ),
    })) || [];

  return {
    unitData,
    pagination,
    isLoading,
    isError,
    error,
  };
};

export default useListUnitOfMeasurementHook;
