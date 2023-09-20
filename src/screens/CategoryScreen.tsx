import React, {useContext} from 'react';
import {SafeAreaView, Text, View, StyleSheet, Button} from 'react-native';
import CategoryItem from '../components/category/CategoryItem';
import {CategoryProps} from '../types/route.screen.types';
import {AuthContext} from '../contexts/AuthContext';
import {useQuery} from '@tanstack/react-query';
import {categoriesRequest} from '../services/categories.service';

const CategoryScreen = ({navigation}: CategoryProps) => {
  const authData = useContext(AuthContext);

  const {data} = useQuery([], () => categoriesRequest());

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoutButton}>
        <Button
          title="Logout"
          onPress={async () => {
            await authData?.clearTokens();
          }}
        />
      </View>
      <Text style={styles.title}>Categories</Text>

      <View style={styles.categoryContainer}>
        {data &&
          data.map(({type}) => {
            return (
              <CategoryItem
                key={type}
                handler={() =>
                  navigation.navigate('CategoryLevels', {
                    categoryType: type,
                  })
                }
                text={type}
              />
            );
          })}
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
  logoutButton: {
    alignSelf: 'flex-start',
  },
});

export default CategoryScreen;
