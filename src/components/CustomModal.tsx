import React, { useContext, useEffect, useState } from 'react'
import {  Button, Modal, ScrollView, Text, Center, VStack, Input } from 'native-base';
import { UserContext } from '../context/usuario/Usercontext';
import { CustomInput } from './CustomInput';


export const CustomModal = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {inmuebleId, setInmuebleId} = useContext(UserContext);

  useEffect(() => {
    console.log('customModal',inmuebleId)
    if(inmuebleId){
      setModalVisible(!modalVisible);
      setInmuebleId(null);
    }
  }, [inmuebleId])
  
    return (<>
      <Modal isOpen={modalVisible} onClose={setModalVisible} >
        <Modal.Content maxH="212">
          <Modal.CloseButton />
          <Modal.Header>Modificar Referencia</Modal.Header>
          <Modal.Body>
            <Input/>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setModalVisible(false);
            }}>
                Cancelar
              </Button>
              <Button onPress={() => {
              setModalVisible(false);
            }}>
                Guardar
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}
