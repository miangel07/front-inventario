import { Button, Card, CardBody, Divider } from "@heroui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/authenticationHook/authenticationGlobalHook";
import { useLoginUserConfirmMutation } from "@/store/slice/loginSlice";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import { Id } from "react-toastify";

interface SelectStorageModalProps {
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
    business: any;
    storages: Array<{ id: number; name: string }>;
  };
  onClose: () => void;
}

export const SelectStorageModal = ({ user, onClose }: SelectStorageModalProps) => {

  const navigate = useNavigate();
  const { confirmStorage, clearTempUser } = useAuth();
  const [loginUserConfirm, { isLoading, isSuccess, isError, error, data }] = useLoginUserConfirmMutation();
  const [selectedStorageId, setSelectedStorageId] = useState<number | null>(null);
  const toastRef = useRef<Id | null>(null);

  // Manejar la respuesta de la confirmación
  useEffect(() => {
    if (isLoading) {
      toastRef.current = toast.loading("Confirmando acceso...");
    }

    if (isSuccess && data) {
      toast.dismiss(toastRef.current!);
      
      if (data.access_token) {
        toast.success(data.message);
        confirmStorage(data.user, data.access_token);
        onClose();
        navigate('/home');
      } else {
        toast.error("Error: No se recibió el token de acceso");
      }
    }

    if (isError) {
      toast.dismiss(toastRef.current!);
      
      if (Array.isArray(error)) {
        error.forEach((err) => {
          toast.error(`${err.field}: ${err.message}`);
        });
      } else {
        toast.error("Error al confirmar la bodega");
      }
    }
  }, [isLoading, isSuccess, isError, error, data, confirmStorage, onClose, navigate]);

  const handleConfirm = async () => {
    if (!selectedStorageId) {
      toast.error("Por favor selecciona una bodega");
      return;
    }

    try {
      await loginUserConfirm({
        email: user.email, 
        storageId: selectedStorageId
      }).unwrap();
    } catch (error) {
      console.error("Error al confirmar storage:", error);
    }
  };

  const handleCancel = () => {
    clearTempUser(); // Limpiar usuario temporal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md"
      >
        <Card shadow="lg">
          <CardBody className="p-6">
            <h2 className="text-xl font-bold mb-4">Selecciona una bodega</h2>
            <p className="text-gray-600 mb-6">
              Tienes acceso a múltiples bodegas. Por favor selecciona una para continuar.
            </p>

            <div className="space-y-3 mb-6">
              {user.storages?.map((storage) => (
                <div
                  key={storage.id}
                  className={`p-4 border rounded-md cursor-pointer transition-colors ${
                    selectedStorageId === storage.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedStorageId(storage.id)}
                >
                  <h3 className="font-medium">{storage.name}</h3>
                  <p className="text-sm text-gray-500">ID: {storage.id}</p>
                </div>
              ))}
            </div>

            <Divider className="my-4" />

            <div className="flex justify-end space-x-3">
              <Button 
                variant="light" 
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                onClick={handleConfirm}
                disabled={isLoading || !selectedStorageId}
              >
                {isLoading ? "Confirmando..." : "Confirmar"}
              </Button>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};