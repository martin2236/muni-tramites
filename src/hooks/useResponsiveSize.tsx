import { Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { RFValue } from "react-native-responsive-fontsize";

const {height} = Dimensions.get('screen');
const {width} = Dimensions.get('window');
console.log(height, width)
//! en el revisar 800 x 360 el input se rompe por que el resultado es 11 y no es una altura permitida
export const useResponsiveSize = () => {
    // const R10 = RFValue(12,height);
    // const R12 = RFValue(12,height);
    // const R13 = RFValue(13,height);
    // const R14 = RFValue(14,width);
    // const R15 = RFValue(15,height);
    // const R16 = RFValue(16,height);
    // const R18 = RFValue(18,height);
    // const R20 = RFValue(20,height);
    // const R25 = RFValue(25,height);
    // const R32 = RFValue(32,height);

    let R10 ;
    let R12 ;
    let R13 ;
    let R14 ;
    let R15 ;
    let R16 ;
    let R18 ;
    let R20 ;
    let R25 ;
    let R32 ;
   
    if(width <= 320){
         R10 = RFValue(12,width);
         R12 = RFValue(12,width);
         R13 = RFValue(6,width);
         R14 = RFValue(7,width);
         R15 = RFValue(6,width);
         R16 = RFValue(8,width);
         R18 = RFValue(8,width);
         R20 = RFValue(10,width);
         R25 = RFValue(25,width);
         R32 = RFValue(18,width);
    }else if(width <= 360){
         R10 = RFValue(12,width);
         R12 = RFValue(5,width);
         R13 = RFValue(6,width);
         R14 = RFValue(5,width);
         R15 = RFValue(5,width);
         R16 = RFValue(6,width);
         R18 = RFValue(7,width);
         R20 = RFValue(15,width);
         R25 = RFValue(25,width);
         R32 = RFValue(16,width);
    }else{
        R10 = RFValue(12,width);
         R12 = RFValue(4,width);
         R13 = RFValue(10,width);
         R14 = RFValue(10,width);
         R15 = RFValue(6,width);
         R16 = RFValue(10,width);
         R18 = RFValue(10,width);
         R20 = RFValue(15,width);
         R25 = RFValue(25,width);
         R32 = RFValue(25,width);
    }



    const medida =width < 370 ? 5 : 6;
    const total =  width < 370 ? 7 : 8;
    const boton = width < 370 ? 7 : 8;
    const titulo = width < 370 ? 9 : 10;

    

    const loginImageWidth = height <650 ? width * 0.5 : width * 0.4;
    const LoginImageHeight =  height <650 ? width * 0.5 : width * 0.4;
    const carouselImageWidth = height <650 ? width * 0.7 : width * 0.5;
    const carouselImageHeight =  height <650 ? width * 0.7 : width * 0.5;
    const customInputHeight = height < 650 ? 10 :12;
    const textoResponsive = RFValue(medida,width);
    const textoTotal = RFValue(total,width);
    const textoBoton = RFValue(boton,width);
    const textoTitulo = RFValue(titulo,width);
    return{
        R10,
        R12,
        R13,
        R14,
        R15,
        R16,
        R18,
        R20,
        R25,
        R32,
        textoResponsive,
        textoTotal,
        textoBoton,
        textoTitulo,
        customInputHeight,
        loginImageWidth,
        LoginImageHeight,
        carouselImageWidth,
        carouselImageHeight
    }
}