import React,{useEffect, useState} from 'react'
import { CarouselStatus, User, UserContext } from './Usercontext';
import { Inmuebles } from './Usercontext';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props{
    children: JSX.Element | JSX.Element[]
}

export const UserProvider = ({children}:Props) => {
    
    const [user, setUser] = useState<User | null >(null);
    const [carouselVerification, setCarouselVerification] = useState(false);
    const [carouselStatus, setCarouselStatus] = useState<CarouselStatus>({estado:null})

    useEffect(()=>{
        console.log('cambio carousel verification', carouselVerification)
        getCarouselStatus();
    },[carouselVerification]);

    const getCarouselStatus = async () => {
        try {
          const value = await AsyncStorage.getItem('@carousel');
          console.log('datos guardados',value)
          if (value === null) {
            setCarouselStatus({estado:null});
          }else{
            setCarouselStatus(JSON.parse(value));
          }
        } catch (e) {
            console.log('no se pudo traer el value del storage')
          // error reading value
        }
      };
    
  return (
   <UserContext.Provider
    value={{
        user,
        carouselStatus,
        carouselVerification,
        setUser,
        setCarouselVerification
    }}
   >
    {children}
   </UserContext.Provider>
  )
}
