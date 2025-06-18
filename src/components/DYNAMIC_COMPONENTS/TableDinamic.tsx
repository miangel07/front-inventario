import {
    Table as TableNext,
    TableBody,
    TableCell,
    TableHeader,
    TableColumn,
    TableRow,
    Button,
    Pagination as Paginacion,
    Spinner,
    Card,
    CardBody,
    Input
} from "@heroui/react";
import { useRef } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface ColumnData {
    key: string;
    label: string;
}

interface TableData {
    [key: string]: string | number | boolean | null | JSX.Element | undefined;
}

// Tipos para Nest.js - Metadata de paginación
interface NestPaginationMeta {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
}

interface Pros<T extends TableData> {
    columns: ColumnData[];
    data: T[];
    emptyContent?: React.ReactNode;
    contenidoBarra?: React.ReactNode;
    barraBusqueda?: (searchText: string) => void;
    pagination?: NestPaginationMeta;
    searchPlaceholder?: string;
    onPageChange?: (page: number) => void;
    isLoading?: boolean;
}

type SetCurrentPage = (page: number) => void;

interface ProsPaginacion {
    limit?: number;
    currentPage?: number;
    setCurrentPage: SetCurrentPage;
    total?: number;
}

export const SearchBar = ({
    onSearch,
    placeholder,
    isLoading
}: {
    onSearch: (text: string) => void,
    placeholder: string,
    isLoading: boolean
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = () => {
        if (inputRef.current) {
            onSearch(inputRef.current.value);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '') {
            onSearch('');
        }
    };

    return (
        <div className="relative w-full max-w-sm">
            <Input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                startContent={
                    <Search className="text-default-400 font-roboto pointer-events-none flex-shrink-0" size={16} />
                }
                endContent={
                    isLoading && (
                        <Spinner size="sm" color="default" />
                    )
                }
                variant="bordered"
                radius="lg"
                className="w-full"
                classNames={{
                    input: [
                        "bg-transparent",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                        "shadow-sm",
                        "bg-default-200/50",
                        "dark:bg-default/60",
                        "backdrop-blur-xl",
                        "backdrop-saturate-200",
                        "hover:bg-default-200/70",
                        "dark:hover:bg-default/70",
                        "group-data-[focus=true]:bg-default-200/50",
                        "dark:group-data-[focus=true]:bg-default/60",
                        "!cursor-text",
                    ],
                }}
            />
        </div>
    );
};

export const TableDinamic = <T extends TableData>({
    columns,
    data,
    emptyContent = (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="text-6xl text-default-300 mb-4">📋</div>
            <p className="text-primarys-500 text-lg font-medium">No hay datos disponibles</p>
            <p className="text-primarys-500 text-sm">Intenta ajustar los filtros de búsqueda</p>
        </div>
    ),
    pagination,
    barraBusqueda,
    contenidoBarra,
    searchPlaceholder = "Buscar...",
    onPageChange,
    isLoading = false,
}: Pros<T>) => {

    const handleSearch = (text: string) => {
        if (barraBusqueda) {
            barraBusqueda(text);
        }
    };

    const handlePageChange = (page: number) => {
        onPageChange?.(page);
    };

    return (
        <div className="w-full space-y-6">
            {/* Header con búsqueda y contenido adicional */}
            <Card className="border-none shadow-sm">
                <CardBody className="px-6 py-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        <SearchBar
                            onSearch={handleSearch}
                            placeholder={searchPlaceholder}
                            isLoading={isLoading}
                        />
                        {contenidoBarra && (
                            <div className="flex-shrink-0">
                                {contenidoBarra}
                            </div>
                        )}
                    </div>
                </CardBody>
            </Card>

            {/* Tabla principal */}
            <Card className="border-none shadow-sm">
                <CardBody className="p-0 overflow-hidden">
                    <div className="relative">
                        {isLoading && (
                            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-20">
                                <div className="flex flex-col items-center gap-3">
                                    <Spinner size="lg" color="primary" />
                                    <p className="text-primarys-500 text-sm">Cargando datos...</p>
                                </div>
                            </div>
                        )}

                        <TableNext
                            aria-label="Tabla de datos moderna"
                            removeWrapper
                            classNames={{
                                base: "overflow-auto",
                                table: "min-w-full",
                                thead: "[&>tr]:first:shadow-sm",
                                tbody: "divide-y divide-default-100",
                                th: [
                                    "bg-default-50",
                                    "text-default-800",
                                    "border-b",
                                    "border-divider",
                                    "font-semibold",
                                    "text-sm"
                                ],
                                td: [
                                    "group-data-[first=true]:first:before:rounded-none",
                                    "group-data-[first=true]:last:before:rounded-none",
                                    "group-data-[middle=true]:before:rounded-none",
                                    "group-data-[last=true]:first:before:rounded-none",
                                    "group-data-[last=true]:last:before:rounded-none",
                                    "py-4",
                                    "px-6"
                                ],
                                tr: [
                                    "hover:bg-default-50/50",
                                    "transition-colors",
                                    "duration-200"
                                ]
                            }}
                        >
                            <TableHeader>
                                {columns?.map((column, index) => (
                                    <TableColumn
                                        key={index}
                                        className="text-center py-4 px-6"
                                    >
                                        <span className="text-sm font-roboto uppercase tracking-wider text-primarys-600">
                                            {column.label}
                                        </span>
                                    </TableColumn>
                                ))}
                            </TableHeader>
                            {data?.length > 0 ? (
                                <TableBody>
                                    {data.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            className="border-b border-default-100 last:border-b-0"
                                        >
                                            {columns.map((column, cellIndex) => (
                                                <TableCell
                                                    key={cellIndex}
                                                    className="text-center"
                                                >
                                                    <div className="flex items-center justify-center">
                                                        <span className="text-sm text-default-700 max-w-[250px] truncate">
                                                            {row[column.key] ?? (
                                                                <span className="text-default-400 italic">N/A</span>
                                                            )}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            ) : (
                                <TableBody emptyContent={emptyContent}>{[]}</TableBody>
                            )}
                        </TableNext>
                    </div>
                </CardBody>
            </Card>

            {/* Paginación */}
            {pagination && (
                <Card className="border-none shadow-sm">
                    <CardBody className="px-6 py-4">
                        <Pagination
                            currentPage={pagination.page}
                            setCurrentPage={handlePageChange}
                            total={pagination.total}
                            limit={pagination.limit}
                        />
                    </CardBody>
                </Card>
            )}
        </div>
    );
};

export const Pagination = ({
    limit = 10,
    currentPage = 1,
    setCurrentPage,
    total = 0,
}: ProsPaginacion) => {
    const pageNumbers = Math.ceil(total / limit);
    const startItem = ((currentPage - 1) * limit) + 1;
    const endItem = Math.min(currentPage * limit, total);

    const previosPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const onNextPage = () => {
        if (currentPage < pageNumbers) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Información de registros */}
            <div className="flex items-center gap-2 text-sm text-default-600 order-2 lg:order-1">
                <span>
                    Mostrando <span className="font-semibold text-default-800">{startItem}</span> a{' '}
                    <span className="font-semibold text-default-800">{endItem}</span> de{' '}
                    <span className="font-semibold text-default-800">{total}</span> registros
                </span>
            </div>
            
            {/* Controles de paginación */}
            <div className="flex items-center gap-3 order-1 lg:order-2">
                <Button
                    size="sm"
                    variant="bordered"
                    isDisabled={currentPage === 1}
                    onPress={previosPage}
                    startContent={<ChevronLeft size={16} />}
                    className="min-w-[100px] border-default-200 text-default-700 hover:bg-default-100"
                >
                    Anterior
                </Button>
                
                <Paginacion
                    total={pageNumbers}
                    page={currentPage}
                    radius="md"
                    color="primary"
                    variant="bordered"
                    onChange={(page) => setCurrentPage(page)}
                    className="hidden sm:flex"
                    classNames={{
                        wrapper: "gap-1",
                        item: "bg-transparent border-default-200 text-default-700 hover:bg-default-100",
                        cursor: "bg-primary text-white shadow-md"
                    }}
                />
                
                {/* Paginación compacta para móvil */}
                <div className="flex sm:hidden items-center gap-2 px-3 py-1 bg-default-100 rounded-lg">
                    <span className="text-sm text-default-600">
                        {currentPage} / {pageNumbers}
                    </span>
                </div>
                
                <Button
                    size="sm"
                    variant="bordered"
                    onPress={onNextPage}
                    isDisabled={currentPage >= pageNumbers}
                    endContent={<ChevronRight size={16} />}
                    className="min-w-[100px] border-default-200 text-default-700 hover:bg-default-100"
                >
                    Siguiente
                </Button>
            </div>
        </div>
    );
};