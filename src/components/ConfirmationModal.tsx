import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"

export interface ConfirmationModalProps {
    title: string;
    body: any;
    actionTitle: string;
    isOpen: boolean;
    onConfirm: () => void;
    onClose: () => void;

}
export default function ConfirmationModal({
    title, body, actionTitle, isOpen, onConfirm, onClose
}: ConfirmationModalProps) {
    return (
        <>

            <Modal isOpen={isOpen} onClose={onClose} size={'2xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {body}
                    </ModalBody>

                    <ModalFooter>
                        <Button h={30} w={90} colorScheme='orange' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button h={30} w={90} variant={'outline'} colorScheme={'orange.500'} onClick={() => {
                            onConfirm()
                            onClose()
                        }}>{actionTitle}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}