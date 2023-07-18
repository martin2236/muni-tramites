import React, { useContext, useEffect, useState,memo,useCallback} from 'react'
import { Box, Divider, Pressable, ScrollView, Text } from 'native-base'
import * as Animatable from 'react-native-animatable';
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Cuota } from '../interfaces/inmuebles/deuda';
import { TouchableOpacity } from 'react-native';
import { DatosContext } from '../context/datos/DatosContext';

interface Props {
    item:Cuota[],
    selected:any,
    setSelected:React.Dispatch<React.SetStateAction<boolean>>
    setTotalSelected:React.Dispatch<React.SetStateAction<number>>
}   

const isSelected = (cuota: Cuota, selectedCuotas: Cuota[]) => {

    return selectedCuotas.some((selectedCuota) => selectedCuota.cuota === cuota.cuota);
  };
  
const arePropsEqual =(prevProps: Props, nextProps: Props) => {
    // Comparar solo las propiedades relevantes
    return (
        prevProps.item.length === nextProps.item.length &&
        prevProps.item.every((prevItem, index) => {
          const nextItem = nextProps.item[index];
          return isSelected(prevItem, prevProps.selected) === isSelected(nextItem, nextProps.selected)
        })
      );
  };

export const RowAnios = memo( ({item, selected, setSelected, setTotalSelected}:Props) => {
    const{cuotasSeleccionadas,setCuotasSeleccionadas} = useContext(DatosContext)
     const [show, setShow] = useState({
        anio:'',
        mostrar:false,
     });

console.log('se monto rowAnios')

     const total = item.reduce((acc,curr)=> acc + curr.totalcuota,0);
     const recargo = item.reduce((acc,curr)=> acc + curr.totalcuota + curr.recargo,0);
        useEffect(() => {
            if(selected.length){
            setCuotasSeleccionadas(selected);
            }
        }, [selected]);

        const toggleCuota = (cuota:Cuota) => {
            let index = cuotasSeleccionadas.findIndex((item:Cuota) => item.cuota == cuota.cuota);
            const arraySelected = [...cuotasSeleccionadas!];
            if(index !== -1){
                arraySelected.splice(index,1);
            }else{
                arraySelected.push(cuota as never);
            }
            const total = arraySelected.reduce((acc,curr)=> acc + curr['totalcuota'] ,0);
            setCuotasSeleccionadas(arraySelected);
            setTotalSelected(total);
        }

        const ordenarFecha = (fecha:string) => {
            if(fecha){
                const fechaArray = fecha.split('-');
            const dia = fechaArray[2].split('T')[0];
            return `${dia}/${fechaArray[1]}/${fechaArray[0]}`
            }
            return 'Sin fecha';   
        }

     //checks if show changed and modifies item.checked
     const handleShow = async () =>{
        setShow({
        anio:item[0].anio,
        mostrar:!show.mostrar 
        });
     }
      
  return (
    <>
        <Box mt={2} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
            <Box width={'15%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Pressable onPress={() => handleShow()} width={'100%'} flexDirection={'row'}>
                    <Icon name={'chevron-right'} size={15} color={'cyan'}/>
                    <Text textAlign={'center'} fontSize={'sm'}>
                        {item[0].anio}
                    </Text>
                </Pressable>
            </Box>
            <Box width={'29%'}  display={'flex'}  alignItems={'center'}>
                <Text textAlign={'center'} fontSize={'sm'} >
                $ {total.toFixed(2)}
                </Text>
            </Box>
            <Box width={'29%'} display={'flex'} alignItems={'center'} >
                <Text textAlign={'center'} fontSize={'sm'} fontWeight={'bold'}>
                $ {recargo.toFixed(2) }
                </Text>
            </Box>
            <Box width={'27%'} display={'flex'}  alignItems={'center'}>
                <Text textAlign={'center'} allowFontScaling={true} fontSize={'sm'} >
               $ {total.toFixed(2)}
                </Text>
            </Box>
        </Box>
        <Divider mt={1}/>
        { show.anio === item[0].anio && show.mostrar ?
                <Animatable.View animation='fadeInDown' style={{backgroundColor:'white'}}>
                        <Box  mt={2} alignSelf={'center'} width={'95%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                <Text width={'35%'}fontSize={'sm'} color={'#2596be'} textAlign={'center'} fontWeight={'bold'}>
                    CUOTA
                </Text>
                <Text width={'35%'} fontSize={'sm'} color={'#2596be'} textAlign={'center'} fontWeight={'bold'} lineHeight={'sm'}>
                    VENCIMIENTO
                </Text>
                
                <Text width={'24%'} fontSize={'sm'} color={'#2596be'} textAlign={'center'} fontWeight={'bold'} lineHeight={'sm'}>
                    TOTAL
                </Text>
                </Box>
              
                    <ScrollView 
                    scrollEnabled={true}
                    nestedScrollEnabled={true}
                    keyboardShouldPersistTaps='always'
                    height={'40'}
                    >
                        <Box>
                            {item.map((cuota:Cuota, index) => (
                                <Box key={index} alignSelf={'center'} width={'95%'} mt={2} display={'flex'} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'}>
                                        <Box width={'35%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                                            <TouchableOpacity
                                                onPress={() => toggleCuota(cuota)}
                                                style={{height:16, width:16,backgroundColor:'#2596be', alignItems:'center', justifyContent:'center'}}>
                                                    {
                                                        cuotasSeleccionadas.findIndex((item:Cuota) => item.cuota == cuota.cuota) !== -1 ?
                                                        <Icon name={'check'} size={15} color={'white'}/> : null
                                                    }
                                            </TouchableOpacity>
                                            <Text textAlign={'center'} fontSize={'sm'} >
                                                {cuota.cuota}
                                            </Text>
                                        </Box>

                                        <Box width={'35%'} display={'flex'} alignItems={'center'} >
                                            <Text textAlign={'center'} fontSize={'sm'} >
                                                {ordenarFecha(cuota.fecha_ven1)}
                                            </Text>
                                        </Box>

                                        <Box  width={'24%'} display={'flex'}  alignItems={'center'}>
                                            <Text textAlign={'center'} fontSize={'sm'} >
                                                ${cuota.totalcuota.toFixed(2)}
                                            </Text>
                                        </Box>
                                </Box>
                            )
                        )}
                        </Box>
                    </ScrollView>
</Animatable.View>
        : null}
    </>
    
  )
},arePropsEqual)
