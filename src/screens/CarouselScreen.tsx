import React, { useState } from 'react'
import { Box, Image, Text, Center, Button, Pressable } from 'native-base';
import { Dimensions, ImageSourcePropType } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigation';

const {height : screenHeight, width : screenWidth } = Dimensions.get('window')

interface Slide {
  title:string,
  desc:string,
  lista:string[]
  img:ImageSourcePropType
}

interface Props extends StackScreenProps<RootStackParams>{}

export const CarouselScreen = ({navigation}:Props) => {
  const [posicion, setPosicion] = useState(0)
  const [defaultIndex, setDefaultIndex] = useState(0)
  const items: Slide[] = [
    {
      title:"DE UNA FORMA MÁS FÁCIL",
      desc:"Vas a poder:",
      lista:['- Crearte un usuario', '- consultar tus deudas' , '- realizar pagos', '- y más'],
      img:require("../assets/accepted.png")
    },
    {
      title:"Pagos en el acto",
      desc:"Realizá tus pagos de una forma simple y sencilla desde tu celular",
      lista:[],
      img:require("../assets/online-payment.png")
    },
    {
      title:"Imprimí tus recibos fácilmente",
      desc:"obtené el recibo desde la comodidad de tu casa",
      lista:[],
      img:require("../assets/printer.png")
    },
  ]
  const nextSlide: ()=>void = ():void => {
    setPosicion(posicion => posicion + 1)
    setDefaultIndex( defaultIndex => defaultIndex + 1) 
  }

  const selectSlide = (position:number):void => {
    setPosicion(position)
    setDefaultIndex(position)
  }

  const renderItem = ( item : Slide) => {
  return (
    <Center flex={1} >
      
      <Box justifyContent={'space-around'} alignItems={'center'}> 
        <Image mb={5} width={200} height={200} source={item.img} alt={'una imagen'}/>
        <Text mb={5} fontSize={'22'} color={'#2596be'} fontWeight={'bold'}>
          {item.title}
        </Text>
        <Text mb={2} fontSize={16} fontWeight={'semibold'} color={'#2596be'} textAlign={'center'}>
          {item.desc}
        </Text>
          {item.lista.length ? 
            item.lista.map((item, index) => {
              return(
                <Text mb={1} fontSize={16} fontWeight={'semibold'} color={'#2596be'} key={index}>{item}</Text>
                )
            })
            :
            null
          }
      </Box>
      
    </Center>
   )
  }

  

  return (
    <Box flex={1} width={'full'}>
      <Carousel
        loop={false}
        data={items}
        defaultIndex={defaultIndex}
        onSnapToItem={setPosicion}
        renderItem={({item}:any) => (renderItem(item))}
        width={screenWidth}
        height={screenHeight - 50}
      />
      <Box width={'full'} height={'12'} bg={'white'} alignItems={'center'} flexDirection={'row'} justifyContent={'flex-end'}>
        <Box width={'30%' }>
          <Button onPress={() => navigation.replace('Login')} bg={'white'}>
            <Text fontSize={18} fontWeight={'bold'}>
              Omitir
            </Text>
          </Button>
        </Box>
        <Box bg={'white'} display={'flex'} flexDir={'row'} alignSelf={'center'} justifyContent={'space-around'} width={'40%'}>
          <Pressable onPress={() => selectSlide(0)} height={3} borderRadius={'full'} width={3} bg={posicion == 0 ? '#2596be' : 'primary.200'}/>
          <Pressable onPress={() => selectSlide(1)} height={3} borderRadius={'full'} width={3} bg={posicion == 1 ? '#2596be' : 'primary.200'}/>
          <Pressable onPress={() => selectSlide(2)} height={3} borderRadius={'full'} width={3} bg={posicion == 2 ? '#2596be' : 'primary.200'}/>
        </Box>
        <Box width={'30%'} bg={'red.100'}>
          {posicion === 2 ? 
          <Button onPress={() => navigation.replace('Login')} p={0} bg={'white'} >
            <Text fontSize={18} fontWeight={'bold'}>Empezar</Text>
          </Button>
          :
          <Button onPress={() => nextSlide()} bg={'white'} >
            <Text fontSize={18} fontWeight={'bold'}>Entiendo</Text>
          </Button>
          }
        </Box>
      </Box>
    </Box>  
  )
}
