import React, {useState, useEffect} from 'react';
import {DropDown, ActivityIndicator} from '~components';
import {helpers} from '~common';
const {wp, hp} = helpers;
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const App = () => {
  const [gitHubUsersList, setGitHubUsersList] = useState([]);
  const [filteredUser, setFilteredUser] = useState();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const placeholder = loading ? 'Loading Data...' : 'Search for a user';

  useEffect(() => {
    getGitHubUsers();
  }, []);

  const getGitHubUsers = async () => {
    try {
      const response = await fetch('https://api.github.com/users');
      const json = await response.json();
      setGitHubUsersList(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const searchFilterFunction = text => {
    if (text) {
      let searchText = text.trim().toLowerCase();
      let include = ['login'];
      const newData = gitHubUsersList.filter(item => {
        let isMatch = false;
        Object.entries(item).forEach(([key, value]) => {
          if (!isMatch && include.includes(key)) {
            if (Array.isArray(value)) {
              value.forEach(_item => {
                if (_item) {
                  Object.entries(_item).forEach(([, value2]) => {
                    if (value2 != null && value2 != false && value2 != true) {
                      if (value2.toLowerCase().indexOf(searchText) > -1) {
                        isMatch = true;
                      }
                    }
                  });
                }
              });
            } else if (value && value.toLowerCase().indexOf(searchText) > -1) {
              isMatch = true;
            }
          }
        });
        return isMatch;
      });
      setFilteredUser(newData);
      setQuery(text);
    } else {
      setFilteredUser([]);
    }
    setQuery(text);
  };

  return (
    <View>
      <ActivityIndicator loading={loading} text={'Preparing Data'} />
      <View style={styles.titleView}>
        <Text style={styles.title}>GitHub Users</Text>
      </View>

      <View style={styles.autocompleteContainer}>
        <DropDown
          data={filteredUser}
          value={query}
          editable={!loading}
          placeholder={placeholder}
          autoCorrect={false}
          onChangeText={text => searchFilterFunction(text)}
          flatListProps={{
            keyboardShouldPersistTaps: 'always',
            keyExtractor: (item, index) => index.toString(),
            renderItem: ({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => searchFilterFunction(item.login)}
                  style={styles.card(index)}>
                  <View style={styles.userInformation}>
                    <Text style={styles.itemNumber}>{index + 1}</Text>
                    <Image
                      style={styles.imageStyle}
                      source={{
                        uri: item.avatar_url,
                      }}
                    />
                    <View style={styles.detailedView}>
                      <Text style={styles.itemName}>{item.login}</Text>
                      <Text style={styles.itemType}>{item.type}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            },
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleView: {
    alignItems: 'center',
    paddingVertical: hp(3),
  },
  title: {
    fontSize: hp(3.6),
    color: '#686868',
  },
  itemName: {
    fontSize: hp(3),
    color: '#686868',
    fontWeight: '700',
  },
  itemType: {
    fontSize: hp(2.2),
    color: '#888888',
  },
  itemNumber: {
    fontSize: hp(3),
    color: '#686868',
    textAlign: 'center',
    textAlignVertical: 'center',
    width: wp(7),
  },
  detailedView: {
    left: wp(7),
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: hp(10),
    zIndex: 1,
  },
  userInformation: {
    flexDirection: 'row',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
  },
  imageStyle: {
    height: hp(7),
    width: hp(7),
    borderRadius: wp(7),
    left: wp(3),
  },
  card: index => {
    return {
      backgroundColor: index % 2 == 0 ? '#dcdcdc' : '#F0F0F0',
      elevation: 2,
      marginVertical: hp(0.5),
      borderRadius: wp(1.5),
    };
  },
});

export default App;
