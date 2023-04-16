import React, { useContext, useEffect, useState, useCallback, memo} from 'react'
import { Box, Divider, Pressable, ScrollView, Text } from 'native-base'
import { FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Cuota } from '../interfaces/inmuebles/deuda';
import { RowListaCuotas } from './RowListaCuotas';
import { DatosContext } from '../context/datos/DatosContext';


interface Props {
    item:Cuota[]
}   

const MemorizedFlatList = React.memo(FlatList);
// prevent this component from re-rendering
export const RowAnios = memo(({item}:Props) => {
     const [show, setShow] = useState({
        anio:'',
        mostrar:false
     })
     const {setNumeroCuota} = useContext(DatosContext)
     const [cuota, setCuotas] = useState<Cuota[] | []>([])
     const total = item.reduce((acc,curr)=> acc + curr.totalcuota,0);
     const recargo = item.reduce((acc,curr)=> acc + curr.totalcuota + curr.recargo,0);
     console.log('SE REGARGO ANIOS')
     useEffect(() => {
        console.log('ROW ANIOS',cuota)
        //setNumeroCuota(cuota);
     }, [cuota]);

     const handleShow = async () =>{
       if(cuota.length){
       await updateList(item, cuota);
       
        setShow({
        anio:item[0].anio,
        mostrar:!show.mostrar 
        });
       }
        setShow({
            anio:item[0].anio,
            mostrar:!show.mostrar 
        })
     }

     const updateList = (list:any, accountNumbers:any) => {
        console.log('UPDATE LIST')
        return new Promise(resolve => {
          const updatedList = list.map((item : any) => {
            if (accountNumbers.includes(item.cuota)) {
              return item.checked = true
            } else {
              return item.checked = false;
            }
          });
          resolve(updatedList);
        });
      };
      
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
                {total.toFixed(2)}
                </Text>
            </Box>
            <Box width={'29%'} display={'flex'} alignItems={'center'} >
                <Text textAlign={'center'} fontSize={'sm'} fontWeight={'bold'}>
                {recargo.toFixed(2) }
                </Text>
            </Box>
            <Box width={'27%'} display={'flex'}  alignItems={'center'}>
                <Text textAlign={'center'} fontSize={'sm'} >
                {total.toFixed(2)}
                </Text>
            </Box>
        </Box>
        <Divider mt={1}/>
        { show.anio === item[0].anio && show.mostrar ?
                    <Animatable.View animation='fadeInDown' style={{backgroundColor:'white'}}>
                         <Box  mt={2} alignSelf={'center'} width={'95%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                    <Text width={'32%'}fontSize={'sm'} color={'#2596be'} textAlign={'center'} fontWeight={'bold'}>
                        CUOTA
                    </Text>
                    <Text width={'32%'} fontSize={'sm'} color={'#2596be'} textAlign={'center'} fontWeight={'bold'} lineHeight={'sm'}>
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
                            <MemorizedFlatList
                                data={item}
                                keyExtractor={(item: any, index:any) => item.cunica + index.toString()}
                                renderItem={({item}) => <RowListaCuotas item={item} cuotas={cuota} setCuotas={setCuotas}/>}
                                nestedScrollEnabled={true}
                            />
                       </ScrollView>
            
                        <Box mt={2} bg={'gray.300'} flexDirection={'row'} justifyContent={'flex-end'}>
                            <Text  fontSize={'sm'} fontWeight={'bold'}>
                                TOTAL A PAGAR
                            </Text>
                            <Text width={"27%"} textAlign={'center'}  fontSize={'sm'} fontWeight={'bold'}>
                                $10.000
                            </Text>
                        </Box>

                    
                    </Animatable.View>
        : null}
    </>
    
  )
})
