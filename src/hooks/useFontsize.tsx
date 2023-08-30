import { Dimensions } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";

const {height} = Dimensions.get('screen');


export const useFontSize = () => {
    const medida =height < 650 ? 10 : 14;
    const titulo = RFValue(20,height);
    const subtitulo = RFValue(18,height);
    const texto16 = RFValue(16,height);
    const texto14 = RFValue(14,height);
    const texto13 = RFValue(13,height);
    const texto12 = RFValue(12,height);
    const textoResponsive = RFValue(medida,height);
    return{
        titulo,
        subtitulo,
        texto16,
        texto14,
        texto13,
        texto12,
        textoResponsive
    }
}