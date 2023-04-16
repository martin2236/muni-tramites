import { Box, Checkbox, Text,  } from 'native-base'
import React,{useContext, useEffect, useState, memo} from 'react'
//@ts-ignore
import { Cuota } from '../../interfaces/inmuebles/deuda';
import { DatosContext } from '../context/datos/DatosContext';

interface Props {
    item: any,
    cuotas: Cuota[] | [],
    setCuotas: React.Dispatch<React.SetStateAction<[] | Cuota[]>>
}

export const RowListaCuotas = memo(({item,cuotas ,setCuotas}:Props) => {
    const {numeroCuota} = useContext(DatosContext);
    const [cuotasActuales, setCuotasActuales] = useState<Cuota[] | []>([])
    useEffect(() => {
        console.log('cambiaron las cuotas',cuotas)
        setCuotasActuales([...cuotas])
    }, [cuotas]); 

    const ordenarFecha = (fecha:string) => {
        if(fecha){
            const fechaArray = fecha.split('-');
        const dia = fechaArray[2].split('T')[0];
        return `${dia}/${fechaArray[1]}/${fechaArray[0]}`
        }
        return 'Sin fecha';   
    }
    //checkbox onChange si es true setCuotas agrega el item a una lista que contendra a todos los items cuyo checkbox sea true si es false eliminar solamente el item cuyo checbox sea false
     const handleCheck = (value:boolean) => {
      if(value){
        const cuotaExistente = cuotasActuales.find((cuota:Cuota) => cuota === item.cuota)
        if(cuotaExistente) return;
        cuotasActuales.push(item.cuota as never)
          setCuotas([...cuotasActuales])
       }else{
        console.log('CUOTAS ANTES DEL FILTRO',cuotas)
            const newCuotas = cuotasActuales.filter((cuota:Cuota) => {
                return cuota !== item.cuota
            })
           setCuotas([...newCuotas])
    }
}

  return (
    <Box alignSelf={'center'} width={'95%'} mt={2} display={'flex'} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'}>
        <Box width={'32%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                    <Checkbox value='nuevo' defaultIsChecked={item.checked} onChange={ handleCheck } accessibilityLabel='algo'/>
                    <Text textAlign={'center'} fontSize={'sm'}>
                        {ordenarFecha(item.fecha_pago)}
                    </Text>
            </Box>
            <Box width={'28%'} display={'flex'} alignItems={'center'}>
                <Text textAlign={'center'} fontSize={'sm'} >
                    {ordenarFecha(item.fecha_ven1)}
                </Text>
            </Box>
            
            <Box  width={'24%'} display={'flex'}  alignItems={'center'}>
                <Text textAlign={'center'} fontSize={'sm'} >
                    {item.totalcuota.toFixed(2)}
                </Text>
            </Box>
        </Box>
  )
})
