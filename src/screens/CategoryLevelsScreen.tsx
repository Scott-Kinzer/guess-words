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

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const CategoryLevelsScreen = ({route}: CategoryLevelsProps) => {
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
          data={array}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          renderItem={() => (
            <View
              style={{
                padding: 10,
                width: Dimensions.get('window').width / 4 - 10,
              }}>
              <CategoryLevelsItem />
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
