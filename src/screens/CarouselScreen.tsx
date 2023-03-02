import React, { useState } from 'react'
import { Box, Image, Text, Center } from 'native-base';
import { Dimensions, ImageSourcePropType } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const {height : screenHeight, width : screenWidth } = Dimensions.get('window')

interface Slide {
  title:string,
  desc:string,
  img:ImageSourcePropType
}

export const CarouselScreen = () => {
  const [posicion, setPosicion] = useState(0)
  const items: Slide[] = [
    {
      title:"Consultas más rápidas",
      desc:"ahora vas a poder chequear el estado de tus inmuebles de una forma más fácil... etc",
      img:require("../assets/accepted.png")
    },
    {
      title:"Pagos en el acto",
      desc:"Realizá tus pagos de una forma simple y sencilla desde tu celular",
      img:require("../assets/online-payment.png")
    },
    {
      title:"Imprimí tus recibos fácilmente",
      desc:"obtené el recibo desde la comodidad de tu casa",
      img:require("../assets/printer.png")
    },
  ]

  const renderItem = ( item : Slide) => {
  return (
    <Box flex={1} justifyContent={'space-around'} alignItems={'center'}>
      <Text>
        {item.title}
      </Text>
      <Image width={200} height={200} source={item.img} alt={'una imagen'}/>
      <Text textAlign={'center'}>
        {item.desc}
      </Text>
      <Text>{posicion}</Text>
    </Box>
   )
  }

  

  return (
    <Box flex={1} width={'full'}>
      <Carousel
        loop={false}
        data={items}
        onSnapToItem={setPosicion}
        renderItem={({item}:any) => (renderItem(item))}
        width={screenWidth}
        height={screenHeight}
      />
    </Box>  
  )
}
