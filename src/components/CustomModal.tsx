import React, {  useEffect, useState } from 'react'
import { Modal,Box, Text, Divider,Image } from 'native-base';
import { background } from '../../App';
//@ts-ignore
import icono from '../assets/info-icon.png'
import { useFontSize } from '../hooks/useFontsize';

interface Props{
  cuenta:string;
  categoria:string;
  partida:number;
  servicio:string;
  base:number;
  nomenclatura:string;
  modalOpen:boolean;
  setInfo: React.Dispatch<React.SetStateAction<any | null>>;
  info:any
}

export const CustomModal = ({info,setInfo,modalOpen, cuenta, categoria, partida,servicio, base, nomenclatura}:Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {titulo,subtitulo, texto16} = useFontSize();
  
  useEffect(() =>{
    setModalVisible(modalOpen)
  },[info])
    const cambiarModal = () => {
      setModalVisible(false);
      setInfo(null);
    }
    return (<>
      <Modal isOpen={modalVisible} minW={330} closeOnOverlayClick={false} onClose={cambiarModal} >
        <Modal.Content minH='300' borderColor={background} borderWidth={2}>
          <Box flexDir={'row'} alignItems={'flex-start'} >
            <Image size={7} mt={3} source={icono} alt='icono'/>
            <Text fontSize={titulo} mt={3} fontWeight={'bold'}  color={background}>INFORMACION DEL INMUEBLE</Text>
            <Modal.CloseButton onPress={() => setModalVisible(false)}/>
          </Box>
          <Divider mt={2} alignSelf={'center'} width={'94%'} height={'0.5'} bg={background}/>
          <Box mt={1} flexDirection={'row'}>
            <Text ml={4} mt={2} fontSize={subtitulo} fontWeight={'bold'} color={background}>REFERENCIA :</Text>
                <Text ml={2} mt={2} fontSize={texto16}>referencia</Text>
            </Box>
            <Divider mt={3} alignSelf={'center'} width={'94%'} height={'0.5'} bg={background}/>
          <Modal.Body>
          <Box  flexDirection={'column'}>
                          <Text ml={2} fontSize={subtitulo} fontWeight={'bold'}>Cuenta municipal :</Text>
                          <Text ml={2} fontSize={texto16}>{cuenta}</Text>
                      </Box>
                      <Box mt={1} flexDirection={'column'}>
                      <Text ml={2} fontSize={subtitulo} fontWeight={'bold'}>Partida provincial :</Text>
                          <Text ml={2} fontSize={texto16}>{partida}</Text>
                      </Box>
                      <Box mt={1} flexDirection={'column'}>
                      <Text ml={2} fontSize={subtitulo} fontWeight={'bold'}>Categoria :</Text>
                          <Text ml={2} fontSize={texto16}>{categoria}</Text>
                      </Box>
                      <Box mt={1} flexDirection={'column'}>
                      <Text ml={2} fontSize={subtitulo} fontWeight={'bold'}>Código de servicio :</Text>
                          <Text ml={2} fontSize={texto16}>{servicio}</Text>
                      </Box>
                      <Box mt={1} flexDirection={'column'}>
                      <Text ml={2} fontSize={subtitulo} fontWeight={'bold'}>Base imponible :</Text>
                          <Text ml={2} fontSize={texto16}>{base}</Text>
                      </Box>
                      <Box mt={1} mb={3} flexDirection={'column'}>
                      <Text ml={2} fontSize={subtitulo} fontWeight={'bold'}>N/ catastral :</Text>
                      <Text ml={2} fontSize={texto16}>{nomenclatura}</Text>
                      </Box>
          </Modal.Body>
          
        </Modal.Content>
      </Modal>
    </>
  )
}
