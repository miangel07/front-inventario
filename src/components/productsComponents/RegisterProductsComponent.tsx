import { useRegisterProductMutation, useUpdateProductMutation } from "@/store/slice/productsSlice";
import { ProductsType, RegisterProductsProps } from "@/types/productsTypes/productsType";
import { FormProductsType, ProductSchemaZod } from "@/validations/productsValidation/productsSchemaZod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDown, ArrowUp, Barcode, Boxes, Calendar, ClipboardList, Edit3, Factory, FileText, Image, Info, LayoutGrid, ListTree, Loader2, MapPin, Package, PackagePlus, PlusCircle, Ruler, Tag, Warehouse } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Id, toast } from "react-toastify";
import { InputDinamic } from "../DYNAMIC_COMPONENTS/InputDinamic";
import InputImageDinamic from "../DYNAMIC_COMPONENTS/InputImageDinamic";
import SelectSearchAutoCompleteDinamic from "../DYNAMIC_COMPONENTS/SelectSearchAutoCompleteDinamic";
import { useGetUnitOfMeasurementsQuery } from "@/store/slice/unitOfMeasurementSlice";
import { useGetCategoriesQuery } from "@/store/slice/categoriesSlice";
import { useGetWineriesQuery } from "@/store/slice/wineriesSlice";

const RegisterProductsComponent = ({ onClose, product }: RegisterProductsProps) => {
  const referenciaIdtostat = useRef<Id | null>(null);

  const [registerProduct, { isLoading: isLoadingRegister, isSuccess: isSuccessRegister, isError: isErrorRegister, error: errorRegister }] = useRegisterProductMutation();

  const [updateProduct, { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate, isError: isErrorUpdate, error: errorUpdate }] = useUpdateProductMutation();

  const { data: unitResponse } = useGetUnitOfMeasurementsQuery({
    page: 1,
    limit: 10000
  });

  const { data: categoryResponse } = useGetCategoriesQuery({
    page: 1,
    limit: 10000
  });

  const { data: winerieResponse } = useGetWineriesQuery({
    page: 1,
    limit: 10000
  });

  const isLoading = isLoadingRegister || isLoadingUpdate;
  const isSuccess = isSuccessRegister || isSuccessUpdate;
  const isError = isErrorRegister || isErrorUpdate;
  const error = errorRegister || errorUpdate;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<FormProductsType>({
    resolver: zodResolver(ProductSchemaZod),
    defaultValues: {},
  });

  const unitOptions =
    unitResponse?.data.map((items) => ({
      key: `${items.id}`,
      label: items?.nameUnit,
    })) || [];

    console.log('opciones unidad: ',unitOptions)


  const categoryOptions =
    categoryResponse?.data.map((items) => ({
      key: `${items.id}`,
      label: items?.NameCategory,
    })) || [];

  const winerieOptions =
    winerieResponse?.data.map((items) => ({
      key: `${items.id}`,
      label: items?.nameStorage,
    })) || [];


  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);

  useEffect(() => {
    if (isLoading) {
      referenciaIdtostat.current = toast.loading("Procesando...");
    }
    if (isSuccess) {
      toast.dismiss(referenciaIdtostat.current!);
      toast.success(`Producto ${product ? "actualizado" : "registrado"} correctamente.`);
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

  const onSubmit = async (data: FormProductsType) => {
    try {
      if (product?.id) {
        await updateProduct({ ...data, id: product.id }).unwrap();
      } else {
        await registerProduct(data).unwrap();
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    // <>
    //   <div className="flex flex-col h-full">
    //     <div className="flex-1 overflow-y-auto p-4">
    //       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    //         <div className="space-y-4">
    //           <div className="flex items-center gap-3">
    //             <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
    //               <Package className="w-4 h-4 text-cuarto" />
    //             </div>
    //             <div>
    //               <h3 className="text-lg font-semibold text-gray-900">Información del producto</h3>
    //               <p className="text-sm text-gray-600">Datos básicos del producto</p>
    //             </div>
    //           </div>

    //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
    //             <div className="space-y-2">
    //               <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //                 <Package className="w-4 h-4" />
    //                 Nombre del producto
    //               </label>
    //               <InputDinamic
    //                 errors={errors}
    //                 control={control}
    //                 id="nameProduct"
    //                 type="text"
    //                 name="nameProduct"
    //                 placeholder="Ingrese nombre del producto"
    //               />
    //             </div>

    //             <div className="space-y-2">
    //               <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //                 <ClipboardList className="w-4 h-4" />
    //                 Descripcion
    //               </label>
    //               <InputDinamic
    //                 errors={errors}
    //                 control={control}
    //                 id="description"
    //                 type="text"
    //                 name="description"
    //                 placeholder="Ingrese la descripcion del producto"
    //               />
    //             </div>
    //           </div>
    //         </div>

    //         <div className="space-y-4">
    //           <div className="flex items-center gap-3">
    //             <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
    //               {/* <CreditCard className="w-4 h-4 text-cuarto" /> */}
    //             </div>
    //             <div>
    //               <h3 className="text-lg font-semibold text-gray-900">Identificación</h3>
    //               <p className="text-sm text-gray-600">Documento de identidad</p>
    //             </div>
    //           </div>
    //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
    //             <div className="space-y-2">
    //               <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //                 <Barcode className="w-4 h-4" />
    //                 Codigo interno
    //               </label>
    //               <InputDinamic
    //                 errors={errors}
    //                 control={control}
    //                 id="internalCode"
    //                 type="number"
    //                 name="internalCode"
    //                 placeholder="Ingrese el codigo interno"
    //               />
    //             </div>
    //           </div>
    //         </div>

    //         <div className="space-y-4">
    //           <div className="flex items-center gap-3">
    //             <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
    //               {/* <Mail className="w-4 h-4 text-cuarto" /> */}
    //             </div>
    //             <div>
    //               <h3 className="text-lg font-semibold text-gray-900">Información de Contacto</h3>
    //               <p className="text-sm text-gray-600">Datos para comunicación</p>
    //             </div>
    //           </div>

    //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
    //             <div className="space-y-2">
    //               <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //                 <Factory className="w-4 h-4" />
    //                 marca del producto
    //               </label>
    //               <InputDinamic
    //                 errors={errors}
    //                 control={control}
    //                 id="brand"
    //                 type="text"
    //                 name="brand"
    //                 placeholder="Ingrese la marca del producto"
    //               />
    //             </div>

    //             <div className="space-y-2">
    //               <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //                 <Boxes className="w-4 h-4" />
    //                 Cantidad
    //               </label>
    //               <InputDinamic
    //                 errors={errors}
    //                 control={control}
    //                 id="quantity"
    //                 type="number"
    //                 name="quantity"
    //                 placeholder="Ingrese su numero telefonico"
    //               />
    //             </div>

    //             <div className="space-y-2 md:col-span-2">
    //               <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //                 <ArrowUp className="w-4 h-4" />
    //                 Cantidad Maxima
    //               </label>
    //               <InputDinamic
    //                 errors={errors}
    //                 control={control}
    //                 id="stockMax"
    //                 type="number"
    //                 name="stockMax"
    //                 placeholder="Ingrese cantidad maxima del producto"
    //               />
    //             </div>
    //                                 <div className="space-y-2 md:col-span-2">
    //               <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //                 <ArrowUp className="w-4 h-4" />
    //                 Cantidad Minima
    //               </label>
    //               <InputDinamic
    //                 errors={errors}
    //                 control={control}
    //                 id="stockMin"
    //                 type="number"
    //                 name="stockMin"
    //                 placeholder="Ingrese cantidad maxima del producto"
    //               />
    //             </div>
    //                                                     <div className="space-y-2 md:col-span-2">
    //               <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //                 <Image className="w-4 h-4" />
    //                 Imagen del producto
    //               </label>
    //               <InputImageDinamic
    //           name="imagen_1"
    //           register={register}
    //           setValue={setValue}
    //           errors={errors}
    //           width="100%"
    //           height="15rem"
    //           placeholder="Imagen producto"
    //               />
    //             </div>

    //                                                     <div className="space-y-2 md:col-span-2">
    //               <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //                 <FileText className="w-4 h-4" />
    //                 Observaciones
    //               </label>
    //               <InputDinamic
    //                 errors={errors}
    //                 control={control}
    //                 id="observations"
    //                 type="number"
    //                 name="observations"
    //                 placeholder="Ingrese observaciones del producto"
    //               />
    //             </div>
    //             <div className="space-y-2 md:col-span-2">
    //               <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //                 <MapPin className="w-4 h-4" />
    //                 ubicación del producto
    //               </label>
    //               <InputDinamic
    //                 errors={errors}
    //                 control={control}
    //                 id="location"
    //                 type="text"
    //                 name="location"
    //                 placeholder="Ingrese ubicación del producto"
    //               />
    //             </div>
    //                                 <div className="space-y-2 md:col-span-2">
    //               <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //                 <Calendar className="w-4 h-4" />
    //                 fecha de vencimiento
    //               </label>
    //               <InputDinamic
    //                 errors={errors}
    //                 control={control}
    //                 id="expirationDate"
    //                 type="date"
    //                 name="expirationDate"
    //                 placeholder="Ingrese fecha de vencimiento del producto"
    //               />
    //             </div>

    //         <div className="space-y-2">
    //           <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //             <Ruler className="w-4 h-4" />
    //             Unidad de medida
    //           </label>
    //           <SelectSearchAutoCompleteDinamic
    //             data={unitOptions}
    //             label="Seleccione tipo de documento"
    //             name="measureUnitId"
    //             control={control}
    //             placeholder="Escribe para buscar..."
    //             errors={errors}
    //             className="w-full"
    //             radius="md"
    //           />
    //         </div>
    //                         <div className="space-y-2">
    //           <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //             <Ruler className="w-4 h-4" />
    //             Categoria del producto
    //           </label>
    //           <SelectSearchAutoCompleteDinamic
    //             data={categoryOptions}
    //             label="Seleccione tipo de documento"
    //             name="categoryId"
    //             control={control}
    //             placeholder="Escribe para buscar..."
    //             errors={errors}
    //             className="w-full"
    //             radius="md"
    //           />
    //         </div>
    //                         <div className="space-y-2">
    //           <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //             <Ruler className="w-4 h-4" />
    //             Bodega
    //           </label>
    //           <SelectSearchAutoCompleteDinamic
    //             data={winerieOptions}
    //             label="Seleccione tipo de documento"
    //             name="storage"
    //             control={control}
    //             placeholder="Escribe para buscar..."
    //             errors={errors}
    //             className="w-full"
    //             radius="md"
    //           />
    //         </div>

    //           </div>
    //         </div>
    //                     <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
    //                       <button type="button" onClick={onClose} className="flex-1 sm:flex-none px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium focus:ring-2 focus:ring-gray-200 focus:outline-none">
    //                         Cancelar
    //                       </button>

    //                       <button type="submit" disabled={isLoadingRegister || isLoadingUpdate} className="flex-1 sm:flex-none px-6 py-3 bg-accents-500 text-white rounded-lg hover:bg-accents-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:outline-none flex items-center justify-center gap-2">
    //                         {isLoadingRegister || isLoadingUpdate ? (
    //                           <>
    //                             <Loader2 className="w-4 h-4 animate-spin" />
    //                             Procesando...
    //                           </>
    //                         ) : (
    //                           <>
    //                             {product ? (
    //                               <>
    //                                 <Edit3 className="w-4 h-4" />
    //                                 Actualizar Producto
    //                               </>
    //                             ) : (
    //                               <>
    //                                 <PlusCircle className="w-4 h-4" />
    //                                 Registrar Producto
    //                               </>
    //                             )}
    //                           </>
    //                         )}
    //                       </button>
    //                     </div>

    //       </form>
    //     </div>
    //   </div>
    // </>

    <>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-4 h-4 text-cuarto" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Información Básica</h3>
                  <p className="text-sm text-gray-600">Datos principales del producto</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Nombre del producto
                  </label>
                  <InputDinamic errors={errors} control={control} id="nameProduct" type="text" name="nameProduct" placeholder="Ingrese nombre del producto" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <ClipboardList className="w-4 h-4" />
                    Descripción
                  </label>
                  <InputDinamic errors={errors} control={control} id="description" type="text" name="description" placeholder="Ingrese la descripción del producto" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Barcode className="w-4 h-4" />
                    Código interno
                  </label>
                  <InputDinamic 
                  control={control} 
                  id="internalCode" 
                  name="internalCode" 
                  type="text" 
                  // valueType="text"
                  placeholder="Ingrese el código interno" 
                  errors={errors} 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Factory className="w-4 h-4" />
                    Marca del producto
                  </label>
                  <InputDinamic errors={errors} control={control} id="brand" type="text" name="brand" placeholder="Ingrese la marca del producto" />
                </div>
              </div>
            </div>

            {/* Sección 2: Inventario y Stock */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <PackagePlus className="w-4 h-4 text-cuarto" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Gestión de Inventario</h3>
                  <p className="text-sm text-gray-600">Control de existencias</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Boxes className="w-4 h-4" />
                    Cantidad actual
                  </label>
                  <InputDinamic 
                  errors={errors} 
                  control={control} 
                  id="quantity" 
                  type="number" 
                  name="quantity" 
                  valueType="number"
                  placeholder="Ingrese la cantidad disponible" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <ArrowUp className="w-4 h-4" />
                    Stock máximo
                  </label>
                  <InputDinamic errors={errors} control={control} id="stockMax" type="number" name="stockMax" placeholder="Ingrese cantidad máxima" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <ArrowDown className="w-4 h-4" />
                    Stock mínimo
                  </label>
                  <InputDinamic errors={errors} control={control} id="stockMin" type="number" name="stockMin" placeholder="Ingrese cantidad mínima" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Ruler className="w-4 h-4" />
                    Unidad de medida
                  </label>
                  <SelectSearchAutoCompleteDinamic 
                  data={unitOptions} 
                  label="Unidad de medida" 
                  name="measureUnitId" 
                  control={control} 
                  valueType="number"
                  placeholder="Seleccione unidad..." 
                  errors={errors} 
                  className="w-full" 
                  radius="md" />
                </div>
              </div>
            </div>

            {/* Sección 3: Clasificación y Ubicación */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <LayoutGrid className="w-4 h-4 text-cuarto" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Clasificación</h3>
                  <p className="text-sm text-gray-600">Organización del producto</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <ListTree className="w-4 h-4" />
                    Categoría del producto
                  </label>
                  <SelectSearchAutoCompleteDinamic 
                  data={categoryOptions} 
                  label="Categoría" 
                  name="categoryId" 
                  control={control}
                  valueType="number"
                  placeholder="Seleccione categoría..." 
                  errors={errors} 
                  className="w-full" 
                  radius="md" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Warehouse className="w-4 h-4" />
                    Bodega/Almacén
                  </label>
                  <SelectSearchAutoCompleteDinamic 
                  data={winerieOptions} 
                  label="Ubicación" 
                  name="storage" 
                  valueType="number"
                  control={control} 
                  placeholder="Seleccione bodega..." 
                  errors={errors} 
                  className="w-full" 
                  radius="md" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Ubicación específica
                  </label>
                  <InputDinamic errors={errors} control={control} id="location" type="text" name="location" placeholder="Ej: Estante A, Nivel 3" />
                </div>
              </div>
            </div>

            {/* Sección 4: Información Adicional */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Info className="w-4 h-4 text-cuarto" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Información Adicional</h3>
                  <p className="text-sm text-gray-600">Detalles complementarios</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    Imagen del producto
                  </label>
                  <InputImageDinamic name="img" register={register} setValue={setValue} errors={errors} width="100%" height="10rem" placeholder="Subir imagen del producto" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Fecha de vencimiento
                  </label>
                  <InputDinamic errors={errors} control={control} id="expirationDate" type="date" name="expirationDate" placeholder="Seleccione fecha" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Observaciones
                  </label>
                  <InputDinamic errors={errors} control={control} id="observations" type="text" name="observations" placeholder="Ingrese observaciones relevantes" />
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
                    {product ? (
                      <>
                        <Edit3 className="w-4 h-4" />
                        Actualizar Producto
                      </>
                    ) : (
                      <>
                        <PlusCircle className="w-4 h-4" />
                        Registrar Producto
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

export default RegisterProductsComponent;
