import { 
  Card, 
  CardBody, 
  CardHeader, 
  Chip, 
  Divider,
  Avatar
} from "@heroui/react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  IdCard, 
  FileText 
} from "lucide-react";
import { UsersType } from '@/types/usersTypes/usersTypes';

interface Props {
  user: UsersType;
}

const DetailsUserComponent = ({ user }: Props) => {
  // Formatear fecha de creación
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Formatear tipo de documento
  const formatDocumentType = (type: string) => {
    const types: { [key: string]: string } = {
      'cc': 'Cédula de Ciudadanía',
      'ti': 'Tarjeta de Identidad',
      'ce': 'Cédula de Extranjería',
    };
    return types[type.toLowerCase()] || type.toUpperCase();
  };

  // Obtener iniciales para el avatar
  const getInitials = (username: string, lastname: string) => {
    const firstInitial = username.charAt(0).toUpperCase();
    const lastInitial = lastname.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header Card - Información Principal */}
      <Card className="w-full">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-2">
          <Avatar
            size="lg"
            name={getInitials(user.username, user.lastname)}
            className="bg-blue-100 text-blue-600 text-lg font-semibold"
          />
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.username} {user.lastname}
                </h1>
                <p className="text-gray-600 text-sm">Usuario #{user.id}</p>
              </div>
              <Chip
                color={user.Status === 'active' ? 'success' : 'danger'}
                variant="flat"
                size="sm"
              >
                {user.Status === 'active' ? 'Activo' : 'Inactivo'}
              </Chip>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Grid de Información */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Información Personal */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Información Personal</h2>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <IdCard className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700">Documento</p>
                  <p className="text-sm text-gray-900 break-words">
                    {formatDocumentType(user.typeDocument)} - {user.identificationNumber}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <FileText className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700">Nombre Completo</p>
                  <p className="text-sm text-gray-900 break-words">
                    {user.username} {user.lastname}
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Información de Contacto */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-900">Contacto</h2>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700">Correo Electrónico</p>
                  <p className="text-sm text-gray-900 break-words">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700">Teléfono</p>
                  <p className="text-sm text-gray-900">{user.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700">Dirección</p>
                  <p className="text-sm text-gray-900 break-words">{user.address}</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Información del Sistema */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900">Información del Sistema</h2>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700">Fecha de Registro</p>
                <p className="text-sm text-gray-900">{formatDate(user.createDate??'')}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <User className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700">Estado de la Cuenta</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-2 h-2 rounded-full ${
                    user.Status === 'active' ? 'bg-accents-500' : 'bg-red-500'
                  }`} />
                  <p className="text-sm text-gray-900 capitalize">{user.Status === 'active'? 'activo' : 'inactivo'}</p>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default DetailsUserComponent;