import React, { useState } from 'react';
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  useDisclosure
} from '@nextui-org/react';
import { User, Mail, Phone, MapPin, Lock, CreditCard } from 'lucide-react';

interface FormData {
  username: string;
  lastname: string;
  phone: string;
  identificationNumber: string;
  address: string;
  password: string;
  typeDocument: string;
  email: string;
}

const RegistrationForm: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    lastname: '',
    phone: '',
    identificationNumber: '',
    address: '',
    password: '',
    typeDocument: 'cc',
    email: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const documentTypes = [
    { key: 'cc', label: 'Cédula de Ciudadanía' },
    { key: 'ce', label: 'Cédula de Extranjería' },
    { key: 'ti', label: 'Tarjeta de Identidad' },
    { key: 'passport', label: 'Pasaporte' },
    { key: 'nit', label: 'NIT' }
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.username.trim()) newErrors.username = 'El nombre es requerido';
    if (!formData.lastname.trim()) newErrors.lastname = 'El apellido es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Teléfono debe tener 10 dígitos';
    }
    if (!formData.identificationNumber.trim()) {
      newErrors.identificationNumber = 'El número de identificación es requerido';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Datos del formulario:', formData);
      alert('¡Registro exitoso! Revisa la consola para ver los datos.');
      onOpenChange();
      // Reset form
      setFormData({
        username: '',
        lastname: '',
        phone: '',
        identificationNumber: '',
        address: '',
        password: '',
        typeDocument: 'cc',
        email: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Sistema de Registro</h1>
        <p className="text-gray-600 mb-8">Haz clic en el botón para abrir el formulario de registro</p>
        <Button 
          onPress={onOpen}
          color="primary"
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-200"
        >
          Abrir Formulario de Registro
        </Button>
      </div>

      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="center"
        size="2xl"
        scrollBehavior="inside"
        classNames={{
          base: "bg-white",
          header: "border-b border-gray-200",
          body: "py-6",
          footer: "border-t border-gray-200"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-gray-800">Registro de Usuario</h2>
                <p className="text-sm text-gray-500">Complete todos los campos para crear su cuenta</p>
              </ModalHeader>
              
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nombre */}
                  <Input
                    label="Nombre"
                    placeholder="Ingrese su nombre"
                    value={formData.username}
                    onValueChange={(value) => handleInputChange('username', value)}
                    startContent={<User className="text-gray-400" size={18} />}
                    variant="bordered"
                    isInvalid={!!errors.username}
                    errorMessage={errors.username}
                    classNames={{
                      input: "text-gray-700",
                      inputWrapper: "border-gray-300 hover:border-blue-400 focus-within:border-blue-500"
                    }}
                  />

                  {/* Apellido */}
                  <Input
                    label="Apellido"
                    placeholder="Ingrese su apellido"
                    value={formData.lastname}
                    onValueChange={(value) => handleInputChange('lastname', value)}
                    startContent={<User className="text-gray-400" size={18} />}
                    variant="bordered"
                    isInvalid={!!errors.lastname}
                    errorMessage={errors.lastname}
                    classNames={{
                      input: "text-gray-700",
                      inputWrapper: "border-gray-300 hover:border-blue-400 focus-within:border-blue-500"
                    }}
                  />

                  {/* Email */}
                  <Input
                    label="Email"
                    placeholder="correo@ejemplo.com"
                    type="email"
                    value={formData.email}
                    onValueChange={(value) => handleInputChange('email', value)}
                    startContent={<Mail className="text-gray-400" size={18} />}
                    variant="bordered"
                    isInvalid={!!errors.email}
                    errorMessage={errors.email}
                    classNames={{
                      input: "text-gray-700",
                      inputWrapper: "border-gray-300 hover:border-blue-400 focus-within:border-blue-500"
                    }}
                  />

                  {/* Teléfono */}
                  <Input
                    label="Teléfono"
                    placeholder="3001234567"
                    value={formData.phone}
                    onValueChange={(value) => handleInputChange('phone', value)}
                    startContent={<Phone className="text-gray-400" size={18} />}
                    variant="bordered"
                    isInvalid={!!errors.phone}
                    errorMessage={errors.phone}
                    classNames={{
                      input: "text-gray-700",
                      inputWrapper: "border-gray-300 hover:border-blue-400 focus-within:border-blue-500"
                    }}
                  />

                  {/* Tipo de Documento */}
                  <Select
                    label="Tipo de Documento"
                    placeholder="Seleccione el tipo"
                    selectedKeys={[formData.typeDocument]}
                    onSelectionChange={(keys) => {
                      const value = Array.from(keys)[0] as string;
                      handleInputChange('typeDocument', value);
                    }}
                    startContent={<CreditCard className="text-gray-400" size={18} />}
                    variant="bordered"
                    classNames={{
                      trigger: "border-gray-300 hover:border-blue-400 data-[focus=true]:border-blue-500",
                      value: "text-gray-700"
                    }}
                  >
                    {documentTypes.map((doc) => (
                      <SelectItem key={doc.key} value={doc.key}>
                        {doc.label}
                      </SelectItem>
                    ))}
                  </Select>

                  {/* Número de Identificación */}
                  <Input
                    label="Número de Identificación"
                    placeholder="123456789"
                    value={formData.identificationNumber}
                    onValueChange={(value) => handleInputChange('identificationNumber', value)}
                    startContent={<CreditCard className="text-gray-400" size={18} />}
                    variant="bordered"
                    isInvalid={!!errors.identificationNumber}
                    errorMessage={errors.identificationNumber}
                    classNames={{
                      input: "text-gray-700",
                      inputWrapper: "border-gray-300 hover:border-blue-400 focus-within:border-blue-500"
                    }}
                  />

                  {/* Dirección */}
                  <div className="md:col-span-2">
                    <Input
                      label="Dirección"
                      placeholder="Ingrese su dirección (opcional)"
                      value={formData.address}
                      onValueChange={(value) => handleInputChange('address', value)}
                      startContent={<MapPin className="text-gray-400" size={18} />}
                      variant="bordered"
                      classNames={{
                        input: "text-gray-700",
                        inputWrapper: "border-gray-300 hover:border-blue-400 focus-within:border-blue-500"
                      }}
                    />
                  </div>

                  {/* Contraseña */}
                  <div className="md:col-span-2">
                    <Input
                      label="Contraseña"
                      placeholder="Ingrese su contraseña"
                      type="password"
                      value={formData.password}
                      onValueChange={(value) => handleInputChange('password', value)}
                      startContent={<Lock className="text-gray-400" size={18} />}
                      variant="bordered"
                      isInvalid={!!errors.password}
                      errorMessage={errors.password}
                      classNames={{
                        input: "text-gray-700",
                        inputWrapper: "border-gray-300 hover:border-blue-400 focus-within:border-blue-500"
                      }}
                    />
                  </div>
                </div>
              </ModalBody>
              
              <ModalFooter>
                <Button 
                  color="danger" 
                  variant="light" 
                  onPress={onClose}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Cancelar
                </Button>
                <Button 
                  color="primary" 
                  onPress={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6"
                >
                  Registrar Usuario
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default RegistrationForm;