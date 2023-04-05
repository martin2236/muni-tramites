import React, { useEffect, useState } from 'react'
import { Box, Divider, FlatList, Pressable, ScrollView, Text } from 'native-base'
import * as Animatable from 'react-native-animatable';
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Cuota } from '../interfaces/inmuebles/deuda';
import { RowListaCuotas } from './RowListaCuotas';


interface Props {
    item:Cuota[]
}   

export const RowAnios = ({item}:Props) => {
     const [show, setShow] = useState({
        anio:'',
        mostrar:false
     })
     const [cuota, setCuotas] = useState<Cuota[] | []>([])
     const total = item.reduce((acc,curr)=> acc + curr.totalcuota,0);
     const recargo = item.reduce((acc,curr)=> acc + curr.totalcuota + curr.recargo,0);
     useEffect(() => {
        console.log(cuota)
     }, [cuota]);
  return (
    <>
        <Box mt={2} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
            <Box width={'15%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Pressable onPress={() => setShow({anio:item[0].anio, mostrar:!show.mostrar })} width={'100%'} flexDirection={'row'}>
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
                            <FlatList
                                flex={1}
                                data={item}
                                keyExtractor={(item, index) => item.cunica + index.toString()}
                                renderItem={({item}) => <RowListaCuotas item={item} cuota={cuota} setCuotas={setCuotas}/>}
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
}
