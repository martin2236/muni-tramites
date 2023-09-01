import { Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { RFValue } from "react-native-responsive-fontsize";

const {height} = Dimensions.get('screen');
const {width} = Dimensions.get('window');


export const useResponsiveSize = () => {
    const R10 = RFValue(12,height);
    const R12 = RFValue(12,height);
    const R13 = RFValue(13,height);
    const R14 = RFValue(14,height);
    const R15 = RFValue(15,height);
    const R16 = RFValue(16,height);
    const R18 = RFValue(18,height);
    const R20 = RFValue(20,height);
    const R25 = RFValue(25,height);
    const R32 = RFValue(32,height);

    const medida =height < 650 ? 10 : 14;
    const total =  height < 650 ? 16 : 18;
    const boton = height < 650 ? 14 : 18;
    const custominput = height < 650 ? 11 :13;

    const loginImageWidth = height <650 ? width * 0.5 : width * 0.4;
    const LoginImageHeight =  height <650 ? width * 0.5 : width * 0.4;
    const carouselImageWidth = height <650 ? width * 0.7 : width * 0.5;
    const carouselImageHeight =  height <650 ? width * 0.7 : width * 0.5;
    const customInputHeight = RFValue(custominput,height);
    const textoResponsive = RFValue(medida,height);
    const textoTotal = RFValue(total,height);
    const textoBoton = RFValue(boton,height);
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
        customInputHeight,
        loginImageWidth,
        LoginImageHeight,
        carouselImageWidth,
        carouselImageHeight
    }
}