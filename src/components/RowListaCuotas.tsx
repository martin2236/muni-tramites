import { Box, Checkbox, Text,  } from 'native-base'
import React,{useContext, useEffect, useState, memo} from 'react'
//@ts-ignore
import { Cuota } from '../../interfaces/inmuebles/deuda';

interface Props {
    item: any,
    cuotas: Cuota[] | [],
    setCuotas: React.Dispatch<React.SetStateAction<[] | Cuota[]>>
}

export const RowListaCuotas = ({item,cuotas,setCuotas}:Props) => {

    const handleChange = () => {

       let index = cuotas.findIndex((cuota:Cuota) => cuota === item.cuota);
       const arraySelected = [...cuotas];
       if(index !== -1){
           arraySelected.splice(index,1);
    }else{
        arraySelected.push(item.cuota);
    }
    setCuotas(arraySelected);
}

    const ordenarFecha = (fecha:string) => {
        if(fecha){
            const fechaArray = fecha.split('-');
        const dia = fechaArray[2].split('T')[0];
        return `${dia}/${fechaArray[1]}/${fechaArray[0]}`
        }
        return 'Sin fecha';   
    }
    //checkbox onChange si es true setCuotas agrega el item a una lista que contendra a todos los items cuyo checkbox sea true si es false eliminar solamente el item cuyo checbox sea false

  return (
    <Box alignSelf={'center'} width={'95%'} mt={2} display={'flex'} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'}>

            <Text>lista coutas</Text>
        </Box>
  )
}
