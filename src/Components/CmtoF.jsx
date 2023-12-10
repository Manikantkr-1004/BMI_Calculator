import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

export function CmtoF({ isOpen, onOpen, onClose }) {

    const [height,setHeight] = useState(0);
    const [value,setValue] = useState(0);

    const handleCalculate = (e)=>{
        e.preventDefault();
        let feet = ((height/100)*3.28084).toFixed(2);
        setValue(feet);
    }
    

    return (
        <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size="xs"
      >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Convert cm to feet</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <form onSubmit={handleCalculate}>
                    <FormLabel>Enter Height(CM)</FormLabel>
                    <Input value={height} onChange={(e)=> setHeight(e.target.value)} placeholder='165 like this' type='number' required/><br/><br/>

                    {value!==0 && <Text fontWeight="bold" color="blue" mb="10px">{value} Feet</Text>}

                    <Button type='submit' colorScheme='blue' mr={3}>
                    Convert
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                    </form>

                    
                </ModalBody>

            </ModalContent>
        </Modal>
    )
}
