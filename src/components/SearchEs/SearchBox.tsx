import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Icon as IconNB, Center, IconButton, Input, Pressable, VStack } from 'native-base';
import { get } from 'services/ApiBaseService';
import { SellerQueryHits } from 'store/sellers';
import { colors } from 'theme/colors';



const SearchBoxTest = ({ onFocus, onBlur, onFilter, onChange }: any) => {
  const ref = useRef<typeof Input>(null)
  const [focused, setFocused] = useState(false)
  const [filterText, setFilterText] = useState("")
  const onFocusSearch = () => {
    setFocused(true)
    onFocus()
  }
  const onBlurSearch = () => {
    setFilterText('')
    setFocused(false)
    onBlur()
    //@ts-ignore
    ref?.current?.blur()
  }

  const filter = async (text: string) => {
    const result = text != "" ? await get(`search/${text}`) : await get(`search`)
    const hits = result.hits as SellerQueryHits;
    console.log(hits)
    onChange(hits)
  }

  useEffect(() => {
    if (filterText)
      filter(filterText)
  }, [filterText])

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {focused && (
          <IconButton onPress={() => onBlurSearch()} variant={'solid'} style={{ backgroundColor: 'white', flex: 1, borderWidth: 1, borderColor: 'grey' }} _icon={{
            as: Icon,
            color: 'black',
            name: "arrow-back-outline"
          }}
          />
        )}
        <View style={{ flex: 15 }}>
          <Input
            ref={ref}
            backgroundColor={'white'}
            value={filterText}
            onChangeText={(text) => setFilterText(text)}
            height={'50px'}
            onBlur={() => console.log("Blur")}
            onFocus={() => onFocusSearch()}
            //InputLeftElement={<Icon name='search-outline' size={25} color="muted.400" />}
            InputLeftElement={<IconNB as={<Icon name="search-outline" />} size={25} color="muted.400" backgroundColor={"#fff"} marginLeft={2} />}
            InputRightElement={<Pressable onPress={onFilter}><IconNB as={<Icon name="filter-outline" />} size={25} color="muted.400" backgroundColor={"#fff"} marginRight={2} /></Pressable>}
          />
        </View>
      </View>
    </View>
  );
};

export default SearchBoxTest;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: "center",
    width: '100%',
    alignItems: 'center',
  },
});