import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import React, { useEffect } from "react";
import { useHotkeys } from 'react-hotkeys-hook';

interface props<T> {
    titleButon: string | React.ReactNode;
    children: (onClose: () => void) => React.ReactNode;
    className: string;
    titleModal: string;
    isDisabledButton?: boolean;
    sizeModal: '2xl' | 'xl' | 'xs' | 'sm' | 'md' | 'lg' | 'full' | '3xl' | '4xl' | '5xl';
    backdrop?: "opaque" | "blur" | "transparent";
    atajoOpen?: string;
    accion?: boolean;
    dataToEdit?: T;
}

export const ModalDinamic = <T,>({
    titleButon,
    children,
    className,
    titleModal,
    sizeModal,
    isDisabledButton = false,
    backdrop = "opaque",
    atajoOpen,
    accion = false,
    dataToEdit
}: props<T>) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    useHotkeys(atajoOpen ?? "", () => {
        handleOpen();
    });

    const handleOpen = () => {
        if (accion && !dataToEdit) {
            return;
        }
        onOpen();
    };


    useEffect(() => {
        if (accion && isOpen && !dataToEdit) {
            onClose();
        }
    }, [dataToEdit, accion, isOpen]);

    return (
        <>
            {accion ? (
                <button
                onClick={handleOpen}
                className={`inline-flex items-center text-tercero hover:text-secuendario font-medium hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 rounded px-2 py-1 ${className}`}
                type="button"
            >
                {<ArrowRight size={16} /> }
                {titleButon}
            </button>
            ) : (
                <Button
                    className={className}
                    onPress={handleOpen}
                    isDisabled={isDisabledButton}
                >
                    {titleButon}
                </Button>
            )}

            <Modal
                scrollBehavior="inside"
                backdrop={backdrop}
                size={sizeModal}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex font-inter flex-col w-full justify-center items-center gap-1">
                                {titleModal}
                            </ModalHeader>
                            <ModalBody>
                                {children(onClose)}
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};



// import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@heroui/react";
// import { ArrowRight } from "lucide-react";
// import React, { useEffect } from "react";
// import { useHotkeys } from 'react-hotkeys-hook';

// interface props<T> {
//     titleButon: string | React.ReactNode;
//     children: (onClose: () => void) => React.ReactNode;
//     className: string;
//     titleModal: string;
//     isDisabledButton?: boolean;
//     sizeModal: '2xl' | 'xl' | 'xs' | 'sm' | 'md' | 'lg' | 'full' | '3xl' | '4xl' | '5xl';
//     backdrop?: "opaque" | "blur" | "transparent";
//     atajoOpen?: string;
//     accion?: boolean;
//     dataToEdit?: T;
//         isOpen?: boolean;
//     onOpenChange?: (isOpen: boolean) => void;
//     onClick?: () => void;
// }

// export const ModalDinamic = <T,>({
//     titleButon,
//     children,
//     className,
//     titleModal,
//     sizeModal,
//     isDisabledButton = false,
//     backdrop = "opaque",
//     atajoOpen,
//     accion = false,
//     dataToEdit,
//         isOpen: externalIsOpen,
//     onOpenChange: externalOnOpenChange,
//     onClick,
// }: props<T>) => {
//     const {  isOpen: internalIsOpen, onOpen, onOpenChange: internalOnOpenChange, onClose } = useDisclosure();

//         const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
//     const onOpenChange = externalOnOpenChange || internalOnOpenChange;

//     useHotkeys(atajoOpen ?? "", () => {
//         handleOpen();
//     });


//     const handleOpen = () => {
//         if (accion && !dataToEdit) {
//             return;
//         }
//         onClick?.();
//         onOpen();
//     };


//     useEffect(() => {
//         if (accion && isOpen && !dataToEdit) {
//             onClose();
//         }
//     }, [dataToEdit, accion, isOpen]);

//     return (
//         <>
//             {accion ? (
//                 <button
//                 onClick={handleOpen}
//                 className={`inline-flex items-center text-tercero hover:text-secuendario font-medium hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 rounded px-2 py-1 ${className}`}
//                 type="button"
//             >
//                 {<ArrowRight size={16} /> }
//                 {titleButon}
//             </button>
//             ) : (
//                 <Button
//                     className={className}
//                     onPress={handleOpen}
//                     isDisabled={isDisabledButton}
//                 >
//                     {titleButon}
//                 </Button>
//             )}

//             <Modal
//                 scrollBehavior="inside"
//                 backdrop={backdrop}
//                 size={sizeModal}
//                 isOpen={isOpen}
//                 onOpenChange={onOpenChange}
//             >
//                 <ModalContent>
//                     {(onClose) => (
//                         <>
//                             <ModalHeader className="flex font-inter flex-col w-full justify-center items-center gap-1">
//                                 {titleModal}
//                             </ModalHeader>
//                             <ModalBody>
//                                 {children(onClose)}
//                             </ModalBody>

//                         </>
//                     )}
//                 </ModalContent>
//             </Modal>
//         </>
//     );
// };