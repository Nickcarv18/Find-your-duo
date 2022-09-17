import { Image, FlatList } from 'react-native';
import { styles } from './styles';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Header } from '../../components/Header';
import { GameCardProps, GameCard} from '../../components/GameCard';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://192.168.0.59:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data);
      });
  }, []);

  function handleOpenGame({ id, title, bannerUrl}: GameCardProps){
    navigation.navigate('game', { id, title, bannerUrl});
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image 
            source={logoImg}
            style={styles.logo}
        />

        <Header title="Encontre seu duo!" subtitle="Selecione o game que deseja jogar..."/>

        <FlatList
          contentContainerStyle={styles.contentList} 
          data={games}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            < GameCard 
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </SafeAreaView>
    </Background>
  );
}