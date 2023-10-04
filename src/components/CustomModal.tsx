import React, {  useEffect, useState } from 'react'
import { Modal,Box, Text, Divider,Image } from 'native-base';
import { background } from '../../App';
//@ts-ignore
import icono from '../assets/info-icon.png'
import { useResponsiveSize } from '../hooks/useResponsiveSize';
import { InfoInmueble } from '../screens/inmuebleScreeens/InmuebleScreen';
import { InfoCementerio } from '../screens/cementerioScreens/CementerioScreen';
import { InfoComercio } from '../screens/comercioScreens/ComercioScreen';
import { InfoVehiculo } from '../screens/vehiculosScreen/VehiculoScreen';

interface Props{
  setInfo: React.Dispatch<React.SetStateAction<InfoCementerio | InfoComercio| InfoVehiculo| InfoInmueble | null>>;
  info:any
}

export const CustomModal = ({info,setInfo}:Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {R20,R18, R16} = useResponsiveSize();
  useEffect(() =>{
    setModalVisible(info.modal)
  },[info])
    const cambiarModal = () => {
      setModalVisible(false);
      setInfo(null);
    }
    return (<>
      <Modal isOpen={modalVisible} minW={330} closeOnOverlayClick={false} onClose={cambiarModal} >
        <Modal.Content minH='300' borderColor={background} borderWidth={2}>
          <Box flexDir={'row'} alignItems={'center'} justifyContent={'space-around'} >
            <Image size={7} mt={3} source={icono} alt='icono'/>
            <Text fontSize={R20} mt={3} width={'80%'} fontWeight={'bold'}  color={background}>INFORMACION DEL INMUEBLE</Text>
            <Modal.CloseButton onPress={() => setModalVisible(false)}/>
          </Box>
          <Divider mt={2} alignSelf={'center'} width={'94%'} height={'0.5'} bg={background}/>
          {/* MODAL PARA LOS INMUEBLES */}

          <Box mt={1} flexDirection={'row'} alignItems={'center'}>
              <Text ml={4} mt={2} fontSize={R18} fontWeight={'bold'} color={background}>REFERENCIA :</Text>
              <Text ml={2} mt={2} fontSize={R16}>{(info as InfoInmueble).referencia}</Text>
            </Box>
            <Divider mt={3} alignSelf={'center'} width={'94%'} height={'0.5'} bg={background}/>
            {
              info.tipoModal == 'inmueble' ? 
              <Modal.Body>
              <Box  flexDirection={'column'}>
                          <Text ml={2} fontSize={R18} fontWeight={'bold'}>Cuenta municipal :</Text>
                          <Text ml={2} fontSize={R16}>{(info as InfoInmueble).cuentaMunicipal}</Text>
                      </Box>
                      <Box mt={1} flexDirection={'column'}>
                      <Text ml={2} fontSize={R18} fontWeight={'bold'}>Partida provincial :</Text>
                          <Text ml={2} fontSize={R16}>{(info as InfoInmueble).partidaPovincial}</Text>
                      </Box>
                      <Box mt={1} flexDirection={'column'}>
                      <Text ml={2} fontSize={R18} fontWeight={'bold'}>Categoria :</Text>
                          <Text ml={2} fontSize={R16}>{(info as InfoInmueble).categoria}</Text>
                      </Box>
                      <Box mt={1} flexDirection={'column'}>
                      <Text ml={2} fontSize={R18} fontWeight={'bold'}>Código de servicio :</Text>
                          <Text ml={2} fontSize={R16}>{(info as InfoInmueble).codigoServicio}</Text>
                      </Box>
                      <Box mt={1} flexDirection={'column'}>
                      <Text ml={2} fontSize={R18} fontWeight={'bold'}>Base imponible :</Text>
                          <Text ml={2} fontSize={R16}>{(info as InfoInmueble).baseImponible}</Text>
                      </Box>
                      <Box mt={1} mb={3} flexDirection={'column'}>
                      <Text ml={2} fontSize={R18} fontWeight={'bold'}>N/ catastral :</Text>
                      <Text ml={2} fontSize={R16}>{(info as InfoInmueble).nomenclatura}</Text>
                </Box>
              </Modal.Body>  
              :
              <></>
            }
                {/* MODAL PARA LOS VEHICULOS */}
            {
              info.tipoModal == 'vehiculo' ? 
              <Modal.Body>
              <Box  flexDirection={'column'}>
                          <Text ml={2} fontSize={R18} fontWeight={'bold'}>Dominio actual :</Text>
                          <Text ml={2} fontSize={R16}>{(info as InfoVehiculo).dominioActual}</Text>
                      </Box>
                      <Box mt={1} flexDirection={'column'}>
                      <Text ml={2} fontSize={R18} fontWeight={'bold'}>Dominio original :</Text>
                          <Text ml={2} fontSize={R16}>{(info as InfoVehiculo).dominioOriginal}</Text>
                      </Box>
                      <Box mt={1} flexDirection={'column'}>
                      <Text ml={2} fontSize={R18} fontWeight={'bold'}>Modelo :</Text>
                          <Text ml={2} fontSize={R16}>{(info as InfoVehiculo).modelo}</Text>
                      </Box>
                      <Box mt={1} flexDirection={'column'}>
                      <Text ml={2} fontSize={R18} fontWeight={'bold'}>Marca :</Text>
                          <Text ml={2} fontSize={R16}>{(info as InfoVehiculo).marca}</Text>
                      </Box>
                      <Box mt={1} flexDirection={'column'}>
                      <Text ml={2} fontSize={R18} fontWeight={'bold'}>Año :</Text>
                          <Text ml={2} fontSize={R16}>{(info as InfoVehiculo).año}</Text>
                      </Box>
                      <Box mt={1} mb={3} flexDirection={'column'}>
                      <Text ml={2} fontSize={R18} fontWeight={'bold'}>Tipo :</Text>
                      <Text ml={2} fontSize={R16}>{(info as InfoVehiculo).tipo}</Text>
                </Box>
              </Modal.Body>  
              :
              <></>
            }  
                {/* MODAL PARA LOS COMERCIOS */}
            {
              info.tipoModal == 'comercio' ? 
              <Modal.Body>
              <Box  flexDirection={'column'}>
                          <Text ml={2} fontSize={R18} fontWeight={'bold'}>Número Padrón :</Text>
                          <Text ml={2} fontSize={R16}>{(info as InfoComercio).numeroPadron}</Text>
                      </Box>
                      <Box mt={1} flexDirection={'column'}>
                      <Text ml={2} fontSize={R18} fontWeight={'bold'}>Razón social :</Text>
                          <Text ml={2} fontSize={R16}>{(info as InfoComercio).razonSocial}</Text>
                      </Box>
                      <Box mt={1} flexDirection={'column'}>
                      <Text ml={2} fontSize={R18} fontWeight={'bold'}>Domicilio :</Text>
                          <Text ml={2} fontSize={R16}>{(info as InfoComercio).domicilio}</Text>
                      </Box>
                      <Box mt={1} flexDirection={'column'}>
                      <Text ml={2} fontSize={R18} fontWeight={'bold'}>Condición :</Text>
                          <Text ml={2} fontSize={R16}>{(info as InfoComercio).condicion}</Text>
                      </Box>
                      <Box mt={1} flexDirection={'column'}>
                      <Text ml={2} fontSize={R18} fontWeight={'bold'}>Fecha Habilitación :</Text>
                          <Text ml={2} fontSize={R16}>{(info as InfoComercio).habilitacion}</Text>
                      </Box>
              </Modal.Body>  
              :
              <></>
            }
                {/* MODAL PARA LOS CEMENTERIOS */}
            {
              info.tipoModal == 'cementerio' ? 
              <Modal.Body>
              <Box  flexDirection={'column'}>
                          <Text ml={2} fontSize={R18} fontWeight={'bold'}>Número orden :</Text>
                          <Text ml={2} fontSize={R16}>{(info as InfoCementerio).numOrden}</Text>
                      </Box>
                      <Box mt={1} flexDirection={'column'}>
                      <Text ml={2} fontSize={R18} fontWeight={'bold'}>Nombre :</Text>
                          <Text ml={2} fontSize={R16}>{(info as InfoCementerio).nombre}</Text>
                      </Box>
                      <Box mt={1} flexDirection={'column'}>
                      <Text ml={2} fontSize={R18} fontWeight={'bold'}>Fecha Ingreso :</Text>
                          <Text ml={2} fontSize={R16}>{(info as InfoCementerio).fechaIngresp.split('T')[0]}</Text>
                      </Box>
                      <Box mt={1} flexDirection={'column'}>
                      <Text ml={2} fontSize={R18} fontWeight={'bold'}>Fecha fallecido :</Text>
                          <Text ml={2} fontSize={R16}>{(info as InfoCementerio).fechaFallecido.split('T')[0]}</Text>
                      </Box>
                      <Box mt={1} flexDirection={'column'}>
                      <Text ml={2} fontSize={R18} fontWeight={'bold'}>Código pago :</Text>
                          <Text ml={2} fontSize={R16}>{(info as InfoCementerio).referencia}</Text>
                      </Box>

                      <Box flexDir={'row'} mt={3} flexWrap={'wrap'} justifyContent={'space-around'}>
                        <Box mt={1} mb={3} flexDirection={'column'}>
                          <Text ml={2} fontSize={R18} fontWeight={'bold'}>Galeria :</Text>
                          <Text ml={2} fontSize={R16}>{(info as InfoCementerio).galeria}</Text>
                        </Box>
                        <Box mt={1} mb={3} flexDirection={'column'}>
                          <Text ml={2} fontSize={R18} fontWeight={'bold'}>Sector :</Text>
                          <Text ml={2} fontSize={R16}>{(info as InfoCementerio).sector}</Text>
                        </Box>
                        <Box mt={1} mb={3} flexDirection={'column'}>
                          <Text ml={2} fontSize={R18} fontWeight={'bold'}>Manzana :</Text>
                          <Text ml={2} fontSize={R16}>{(info as InfoCementerio).manzana}</Text>
                        </Box>
                        <Box mt={1} mb={3} flexDirection={'column'}>
                          <Text ml={2} fontSize={R18} fontWeight={'bold'}>Fila :</Text>
                          <Text ml={2} fontSize={R16}>{(info as InfoCementerio).fila}</Text>
                        </Box>
                        <Box mt={1} mb={3} flexDirection={'column'}>
                          <Text ml={2} fontSize={R18} fontWeight={'bold'}>Nicho :</Text>
                          <Text ml={2} fontSize={R16}>{(info as InfoCementerio).nicho}</Text>
                        </Box>
                        <Box mt={1} mb={3} flexDirection={'column'}>
                          <Text ml={2} fontSize={R18} fontWeight={'bold'}>Sepultura :</Text>
                          <Text ml={2} fontSize={R16}>{(info as InfoCementerio).sepultura}</Text>
                        </Box>
                      </Box>
                      
              </Modal.Body>  
              :
              <></>
            }
          
        </Modal.Content>
      </Modal>
    </>
  )
}
