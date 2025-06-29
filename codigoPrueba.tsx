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