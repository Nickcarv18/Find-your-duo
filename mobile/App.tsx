import { useRef, useEffect } from 'react';
import { Background } from './src/components/Background';
import { StatusBar } from 'react-native';
import { 
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter';
import { Loading } from './src/components/Loading'
import { Routes } from './src/routes';

import './src/service/notificationConfig';
import { getPushNotificationsToken } from './src/service/getPushNotificationToken';
import { Subscription } from "expo-modules-core";
import * as Notifications from 'expo-notifications';

export default function App() {
  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();
  
  useEffect(() => {
    getPushNotificationsToken();
  });

  useEffect(() => {
    getNotificationListener.current = Notifications
        .addNotificationReceivedListener(notification => {
          console.log(notification);
        });

    responseNotificationListener.current = Notifications
        .addNotificationResponseReceivedListener(notification => {
          console.log(notification);
        })

    return () => {
      if(getNotificationListener.current && responseNotificationListener.current){
        Notifications.removeNotificationSubscription(responseNotificationListener.current);
        Notifications.removeNotificationSubscription(getNotificationListener.current);
      }
    };
  }, []);

  const [fontsLoad] = useFonts ({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  return (
    <Background>
      < StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
       />

       {fontsLoad ? <Routes /> : <Loading />}
    </Background>
  );
}

