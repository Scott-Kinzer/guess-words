import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  View,
  Dimensions,
} from 'react-native';
import {CategoryLevelsProps} from '../types/route.screen.types';
import CategoryLevelsItem from '../components/category-levels/CategoryLevelsItem';
import {categoryRequest} from '../services/categories.service';
import {useQuery} from '@tanstack/react-query';

const CategoryLevelsScreen = ({route, navigation}: CategoryLevelsProps) => {
  const {data} = useQuery(['categoryWords'], () =>
    categoryRequest({type: route.params.categoryType}),
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {route.params.categoryType.toUpperCase()}
      </Text>
      <Text style={styles.title}>Levels</Text>
      <View
        style={{
          width: '100%',
        }}>
        <FlatList
          contentContainerStyle={styles.categoryContainer}
          data={data}
          columnWrapperStyle={{justifyContent: 'flex-start'}}
          renderItem={wordData => (
            <View
              style={{
                padding: 10,
                width: Dimensions.get('window').width / 4 - 10,
              }}>
              <CategoryLevelsItem
                key={wordData.item.word_id}
                clickHandler={(wordId: string) =>
                  navigation.push('Game', {
                    wordId: wordId,
                  })
                }
                wordData={wordData.item}
              />
            </View>
          )}
          keyExtractor={item => item.toString()}
          numColumns={4}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#c19bfa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 20,
  },
  categoryContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
});

export default CategoryLevelsScreen;
