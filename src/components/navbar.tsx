import {Navbar as HeroUINavbar,NavbarContent,} from "@heroui/navbar";
import { Avatar} from "@heroui/react";
import { Bell, HelpCircle, LogOut, Settings, Shield, UserIcon } from "lucide-react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const Navbar = () => {
  // Estado para controlar el dropdown
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HeroUINavbar 
      maxWidth="xl" 
      position="sticky"
      className="bg-white/95 backdrop-blur-xl border-b border-primarys-200/50 shadow-sm"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        {/* Logo y título del sistema */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primarys-600 to-accents-500 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">IN</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-primarys-800 text-lg tracking-tight">INVENTARIOS</h1>
            <p className="text-xs text-primarys-500 -mt-1">Sistema de Gestión</p>
          </div>
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {/* Indicadores de notificaciones */}
        <div className="flex items-center gap-3 mr-4">
          <button className="relative p-2 rounded-xl text-primarys-600 hover:text-accents-600 hover:bg-accents-50 transition-all duration-200 group">
            <Bell size={20} className="group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-dangers-500 rounded-full flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
            </span>
          </button>
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <div className="relative">
          {/* Trigger del dropdown - Mejorado con nueva paleta */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-primarys-50 transition-all duration-200 group border border-transparent hover:border-primarys-200 shadow-sm hover:shadow-md"
          >
            <Avatar
              size="sm"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              name="Usuario"
              className="ring-2 ring-primarys-200 group-hover:ring-accents-300 transition-all duration-200"
            />
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-primarys-800">
                Juan Pérez
              </p>
              <p className="text-xs text-primarys-500">
                Administrador
              </p>
            </div>
            <div className="w-2.5 h-2.5 bg-accents-400 rounded-full shadow-sm animate-pulse"></div>
            <ChevronDown 
              className={`w-4 h-4 text-primarys-500 transition-all duration-200 ${
                isOpen ? 'rotate-180 text-accents-600' : ''
              }`} 
            />
          </button>

          {/* Dropdown menu - Completamente rediseñado */}
          {isOpen && (
            <>
              {/* Overlay para cerrar al hacer click fuera */}
              <div 
                className="fixed inset-0 z-40 bg-primarys-900/10 backdrop-blur-sm" 
                onClick={() => setIsOpen(false)}
              />
              
              {/* Menu */}
              <div className="absolute right-0 top-full mt-3 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-primarys-200/50 z-50 overflow-hidden">
                {/* Header - Rediseñado */}
                <div className="p-5 bg-gradient-to-r from-primarys-50 to-accents-50 border-b border-primarys-200/50">
                  <div className="flex items-center gap-4">
                    <Avatar
                      size="md"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                      name="Usuario"
                      className="ring-3 ring-accents-200 shadow-lg"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-primarys-800">
                        Juan Pérez
                      </p>
                      <p className="text-xs text-primarys-600 mb-1">
                        juan.perez@empresa.com
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accents-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-accents-600 font-medium">En línea</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu items - Rediseñados */}
                <div className="py-2">
                  <button 
                    className="w-full flex items-center gap-4 px-5 py-3 text-sm text-primarys-700 hover:bg-primarys-50 hover:text-primarys-800 transition-all duration-200 group"
                    onClick={() => {
                      setIsOpen(false);
                      // Lógica para ir al perfil
                    }}
                  >
                    <div className="w-8 h-8 bg-primarys-100 group-hover:bg-primarys-200 rounded-lg flex items-center justify-center transition-colors">
                      <UserIcon className="w-4 h-4 text-primarys-600" />
                    </div>
                    <span className="font-medium">Mi Perfil</span>
                  </button>

                  <button 
                    className="w-full flex items-center gap-4 px-5 py-3 text-sm text-primarys-700 hover:bg-primarys-50 hover:text-primarys-800 transition-all duration-200 group"
                    onClick={() => {
                      setIsOpen(false);
                      // Lógica para configuración
                    }}
                  >
                    <div className="w-8 h-8 bg-primarys-100 group-hover:bg-primarys-200 rounded-lg flex items-center justify-center transition-colors">
                      <Settings className="w-4 h-4 text-primarys-600" />
                    </div>
                    <span className="font-medium">Configuración</span>
                  </button>

                  <button 
                    className="w-full flex items-center gap-4 px-5 py-3 text-sm text-primarys-700 hover:bg-warnings-50 hover:text-warnings-800 transition-all duration-200 group"
                    onClick={() => {
                      setIsOpen(false);
                      // Lógica para notificaciones
                    }}
                  >
                    <div className="w-8 h-8 bg-warnings-100 group-hover:bg-warnings-200 rounded-lg flex items-center justify-center transition-colors relative">
                      <Bell className="w-4 h-4 text-warnings-600" />
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-dangers-500 rounded-full"></span>
                    </div>
                    <div className="flex-1 text-left">
                      <span className="font-medium">Notificaciones</span>
                      <div className="text-xs text-warnings-600 mt-0.5">3 nuevas</div>
                    </div>
                  </button>

                  <button 
                    className="w-full flex items-center gap-4 px-5 py-3 text-sm text-primarys-700 hover:bg-accents-50 hover:text-accents-800 transition-all duration-200 group border-b border-primarys-100"
                    onClick={() => {
                      setIsOpen(false);
                      // Lógica para panel admin
                    }}
                  >
                    <div className="w-8 h-8 bg-accents-100 group-hover:bg-accents-200 rounded-lg flex items-center justify-center transition-colors">
                      <Shield className="w-4 h-4 text-accents-600" />
                    </div>
                    <span className="font-medium">Panel de Admin</span>
                  </button>

                  <button 
                    className="w-full flex items-center gap-4 px-5 py-3 text-sm text-primarys-700 hover:bg-primarys-50 hover:text-primarys-800 transition-all duration-200 group"
                    onClick={() => {
                      setIsOpen(false);
                      // Lógica para ayuda
                    }}
                  >
                    <div className="w-8 h-8 bg-primarys-100 group-hover:bg-primarys-200 rounded-lg flex items-center justify-center transition-colors">
                      <HelpCircle className="w-4 h-4 text-primarys-600" />
                    </div>
                    <span className="font-medium">Ayuda y Soporte</span>
                  </button>

                  <button 
                    className="w-full flex items-center gap-4 px-5 py-3 text-sm text-dangers-600 hover:bg-dangers-50 hover:text-dangers-700 transition-all duration-200 group mt-2"
                    onClick={() => {
                      setIsOpen(false);
                      // Lógica para cerrar sesión
                    }}
                  >
                    <div className="w-8 h-8 bg-dangers-100 group-hover:bg-dangers-200 rounded-lg flex items-center justify-center transition-colors">
                      <LogOut className="w-4 h-4 text-dangers-600" />
                    </div>
                    <span className="font-medium">Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </NavbarContent>
    </HeroUINavbar>
  );
};