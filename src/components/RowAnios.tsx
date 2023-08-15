import React, {  useState,memo} from 'react'
import { Box, Divider, Pressable, ScrollView, Text } from 'native-base'
import * as Animatable from 'react-native-animatable';
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Cuota } from '../interfaces/inmuebles/deuda';
import { TouchableOpacity } from 'react-native';

interface Props {
    item:Cuota[],
    selected:any,
    anios:any[],
    setSelected:React.Dispatch<React.SetStateAction<Cuota[]>>,
    setTotalSelected:React.Dispatch<React.SetStateAction<number>>,
    setAnios: React.Dispatch<React.SetStateAction<string[]>>
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

export const RowAnios = memo(({item, selected,anios, setSelected,setAnios ,setTotalSelected}:Props) => {
     const [show, setShow] = useState({
        anio:'',
        mostrar:false,
     });

     const total = item.reduce((acc,curr)=> acc + curr.totalcuota,0);
     const recargo = item.reduce((acc,curr)=> acc + curr.totalcuota + curr.recargo,0);

        const toggleCuota = (cuota:Cuota) => {
            let index = selected.findIndex((item:Cuota) => item.cunica == cuota.cunica);
            const arraySelected = [...selected];
            if(index !== -1){
                arraySelected.splice(index,1);
            }else{
                arraySelected.push(cuota as never);
            }
            const total = arraySelected.reduce((acc,curr)=> acc + curr['totalcuota'] ,0);
            setSelected(arraySelected);
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
            <Box width={'15%'} display={'flex'} p={0} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Pressable  p={1} onPress={() => handleShow()} width={'100%'} flexDirection={'row'} alignItems={'center'}>
                    <Icon name={'chevron-right'} size={16} color={'cyan'}/>
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
                        <Box width={'32%'} display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'}>
                            <TouchableOpacity
                                onPress={() => setAnios([...anios,item[0].anio])}
                                style={{height:18, width:18,borderColor:'#2596be',backgroundColor:anios.findIndex((cuota:Cuota) => item[0].anio == cuota.anio) !== -1 ?'#2596be':'#fff' ,borderWidth:selected.findIndex((cuotas:Cuota) => item[0].anio == cuotas.anio) !== -1 ? 0:2, alignItems:'center', justifyContent:'center', marginLeft:2}}>
                                    {
                                        anios.findIndex((cuota:Cuota) => cuota.anio == item[0].anio) !== -1 ?
                                        <Icon name={'check'} size={15} color={'white'}/> : null
                                    }
                            </TouchableOpacity>
                            <Text fontSize={'sm'} ml={5} color={'#2596be'} textAlign={'center'} fontWeight={'bold'}>
                                CUOTAS
                            </Text>
                        </Box>
                        
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
                        <Box>
                            {item.map((cuota:Cuota, index) => (
                                <Box key={index} alignSelf={'center'} width={'95%'} mt={2} display={'flex'} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'}>
                                        <Box width={'32%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'flex-start'}>
                                            <TouchableOpacity
                                                onPress={() => toggleCuota(cuota)}
                                                style={{height:16, width:16,borderColor:'#2596be',backgroundColor:selected.findIndex((item:Cuota) => item.cunica == cuota.cunica) !== -1 ?'#2596be':'#fff' ,borderWidth:selected.findIndex((item:Cuota) => item.cunica == cuota.cunica) !== -1 ? 0:1, alignItems:'center', justifyContent:'center', marginLeft:2}}>
                                                    {
                                                        selected.findIndex((item:Cuota) => item.cunica == cuota.cunica) !== -1 ?
                                                        <Icon name={'check'} size={15} color={'white'}/> : null
                                                    }
                                            </TouchableOpacity>
                                            <Text textAlign={'center'} marginLeft={5} fontSize={'sm'} >
                                                {cuota.cuota}
                                            </Text>
                                        </Box>

                                        <Box width={'32%'} display={'flex'} alignItems={'center'} >
                                            <Text textAlign={'center'} fontSize={'sm'} >
                                                {ordenarFecha(cuota.fecha_ven1)}
                                            </Text>
                                        </Box>

                                        <Box  width={'24%'} display={'flex'}  alignItems={'center'}>
                                            <Text textAlign={'center'} fontSize={'sm'} >
                                                {cuota.totalcuota.toFixed(2)}
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
})