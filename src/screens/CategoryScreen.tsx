import React from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import CategoryItem from '../components/category/CategoryItem';
import {CategoryProps} from '../types/route.screen.types';

const CategoryScreen = ({navigation}: CategoryProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <View style={styles.categoryContainer}>
        <CategoryItem
          handler={() =>
            navigation.push('CategoryLevels', {
              categoryType: 'nature',
            })
          }
          text="Nature"
        />
        <CategoryItem
          handler={() =>
            navigation.push('CategoryLevels', {
              categoryType: 'technologies',
            })
          }
          text="Technologies"
        />
        <CategoryItem
          handler={() =>
            navigation.push('CategoryLevels', {
              categoryType: 'music',
            })
          }
          text="Music"
        />
        <CategoryItem
          handler={() =>
            navigation.push('CategoryLevels', {
              categoryType: 'science',
            })
          }
          text="Science"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#9bf28a',
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  category: {
    width: '48%',
    borderWidth: 3,
    borderColor: '#38d950',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
    backgroundColor: '#5eff79',
  },
});

export default CategoryScreen;
