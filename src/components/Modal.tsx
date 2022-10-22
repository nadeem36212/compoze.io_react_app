import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { ConfirmationModalProps } from "./ConfirmationModal";



export default function ModalForm({
    title, body, actionTitle, isOpen, onConfirm, onClose
}: ConfirmationModalProps) {

    return (
        <>
         <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="flex center modal-title-style">
                            {title}
                        </div>
                        {body}
                    </ModalBody>
                    
                    {actionTitle && (
                        <ModalFooter>
                       
                       <Button variant={'outline'} className="primary" onClick={() => {
                           onConfirm()
                           onClose()
                       }}>{actionTitle}</Button>
                   </ModalFooter>
                    )}
                    
                </ModalContent>
            </Modal>
        </>
    )
}