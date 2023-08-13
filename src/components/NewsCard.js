import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';
import { argonTheme } from '../constants';


const NewsCard = ({ item, navigation }) => {
  const cardContainer = [styles.card, styles.shadow];
  const navigateToDetail = () => {
    navigation.navigate('detail', { item });
  };

  return (
    <Block card flex style={cardContainer}>
      <TouchableOpacity onPress={navigateToDetail}>
        <Block flex>
          <Block flex center style={styles.titleContainer}>
            <Text size={24} style={styles.cardTitle}>{item.title}</Text>
          </Block>
          <Block style={styles.sourceContainer}>
            <Text size={12} muted>Source:</Text>
            <Text size={16} style={styles.sourceText}>{item.source}</Text>
          </Block>
        </Block>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToDetail}>
        <Block flex style={styles.cardDescription}>
          <Text size={14} style={styles.sentimentText}>{item.sentiment}</Text>
          {renderSentimentButton(item.sentiment)}
          <Text size={12} color={argonTheme.COLORS.ACTIVE} bold style={styles.reviewText}>Give your review</Text>
        </Block>
      </TouchableOpacity>
    </Block>
  );
};

const renderSentimentButton = (sentiment) => {
  const buttonStyle = [styles.sentimentButton];
  switch (sentiment) {
    case 'Positive':
      buttonStyle.push({ backgroundColor: argonTheme.COLORS.SUCCESS });
      break;
    case 'Negative':
      buttonStyle.push({ backgroundColor: argonTheme.COLORS.DANGER });
      break;
    case 'Neutral':
      buttonStyle.push({ backgroundColor: argonTheme.COLORS.PRIMARY });
      break;
  }

  return (
    <Button color="transparent" style={buttonStyle}>
      <Text>{sentiment.toUpperCase()} SENTIMENT</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16,
  },
  titleContainer: {
    paddingBottom: theme.SIZES.BASE / 2,
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.SIZES.BASE / 2,
  },
  sourceText: {
    marginLeft: 6,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  sentimentText: {
    paddingBottom: theme.SIZES.BASE / 2,
  },
  sentimentButton: {
    width: '100%',
    marginBottom: theme.SIZES.BASE,
    borderRadius: theme.SIZES.BASE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewText: {
    textAlign: 'center',
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default NewsCard;
