import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView, FlatList, RefreshControl } from 'react-native';
import NewsCard from '../components/NewsCard';
import { Block, theme, Button } from 'galio-framework';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width } = Dimensions.get('screen');
const CHUNK_SIZE = 5; // Number of news items per chunk

const NewsScreen = ({navigation}) => {
  const [news, setNews] = useState([]);
  const [message, setMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [currentChunk, setCurrentChunk] = useState(0);

  const fetchNews = async () => {
    const token = await AsyncStorage.getItem('UserToken');
    console.log(token)

    if (!token) {
      console.log("token not available");
      return;
    }

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };

    fetch('http://192.168.43.236:8000/api/user/getnews', requestOptions)
      .then((response) => {
        if (!response.ok) {
          setMessage('PLEASE RETRY');
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data)
        const chunkedNews = [];
        for (let i = 0; i < data.length; i += CHUNK_SIZE) {
          chunkedNews.push(data.slice(i, i + CHUNK_SIZE));
        }
        setNews(chunkedNews);
        setCurrentChunk(0);
        setRefreshing(false);
      })
      .catch((error) => {
        console.log(error.message);
        setMessage('Connect to your server');
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchNews();
  };

  const handleNext = () => {
    setCurrentChunk(currentChunk + 1);
  };

  const handlePrev = () => {
    if (currentChunk > 0) {
      setCurrentChunk(currentChunk - 1);
    }
  };

  const currentNewsChunk = news[currentChunk] || [];

  return (
    <Block flex center style={styles.home}>
      <FlatList
        data={currentNewsChunk}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <NewsCard item={item} navigation={navigation}/>}
        style={styles.articles}
        refreshControl={<RefreshControl refreshing={refreshing}  onRefresh={onRefresh} />}
      />
      <Block row space="between" style={{ marginTop: theme.SIZES.BASE }}>
        <Button
          onPress={handlePrev}
          disabled={currentChunk === 0}
        >
          Previous
        </Button>
        <Button
          onPress={handleNext}
          disabled={currentChunk === news.length - 1}
        >
          Next
        </Button>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default NewsScreen;
