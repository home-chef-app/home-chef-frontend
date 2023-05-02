import { Column, Icon, Image, Row, View } from "native-base"
import React from "react"
import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback } from "react-native"
// import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import Swiper from "react-native-swiper"
import Entypo from "react-native-vector-icons/Entypo"
import Feather from "react-native-vector-icons/Feather"
import { navigate } from "services/NavigationService"
import { SellerType } from "store/sellers"
import { colors } from 'theme/colors';

type SellerPanelProps = {
  seller: SellerType;
}

const SellerPanel = ({ seller }: SellerPanelProps) => {
  const dishes = ['Spagetti', 'Butter Chicken', 'Avocado Toast'];

  return (

    <Swiper showsPagination={false} showsButtons style={{
      height: 220,
      borderRadius: 20,
      position: "relative",
      overflow: "hidden",
    }}>
      {dishes.map((dish) => (
        <TouchableWithoutFeedback key={dish}
          onPress={() => navigate('SellerProfile', { seller })}

        >
          <View style={{ flex: 1, marginBottom: 20 }}>
            <Image source={require('../assets/images/spagetti.jpg')} alt="seller-cover" style={{
              width: "100%",
              height: "70%",
              position: "absolute"
            }} />
            <Row
              alignItems="flex-end"
              justifyContent="space-between"
              style={{
                bottom: 0,
                height: "30%",
                width: "100%",
                backgroundColor: "#262323",
                position: "absolute",
              }}>
              <View style={{
                width: Dimensions.get('window').width * 0.25,
                height: Dimensions.get('window').width * 0.25,
                marginLeft: 10,
                marginBottom: 10,
                position: "relative",
              }}>
                <Image
                  source={require('../assets/images/chef.jpg')}
                  alt="seller-profile"
                  style={{
                    borderRadius: 10,
                    width: Dimensions.get('window').width * 0.25,
                    height: Dimensions.get('window').width * 0.25,
                    position: "absolute"
                  }}
                />
                <View style={{
                  position: "absolute",
                  borderRadius: 100,
                  padding: 5,
                  backgroundColor: "#262323",
                  bottom: 0,
                  left: 0
                }}>
                  <Icon as={Feather} name="heart" size={6} color="white" />
                </View>

              </View>
              <Column style={{
                paddingBottom: 10
              }}>
                <Text style={[styles.text, styles.headlineText]}>{seller.name}</Text>
                <View style={{ height: 2 }} />
                <Row>
                  <Text style={styles.text}>{seller.description}</Text>
                  <View style={{ width: 10 }} />
                  <Icon as={Entypo} name="star" size={5} color="rgb(0,128,0)" />
                  <Text style={[{ marginLeft: 4 }, styles.text]}>9.9</Text>
                </Row>
              </Column>
              <View style={{
                backgroundColor: 'black',
                height: "100%",
                paddingHorizontal: 10,
                paddingBottom: 20,
                justifyContent: "flex-end",
              }}>
                <Text style={styles.text}>1.5 km</Text>
              </View>
            </Row>
            <View
              style={{
                position: 'absolute',
                top: 0,
                height: 43,
                width: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                justifyContent: 'center',
                paddingLeft: 10
              }}
            >
              <Text style={[styles.headlineText, { color: 'white' }]}>{dish}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </Swiper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  contentContainer: {
    backgroundColor: colors.dark["900"],
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
    paddingHorizontal: 10
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
  closeLineContainer: {
    alignSelf: 'center',
  },
  closeLine: {
    width: 40,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.dark["900"],
    marginTop: 5,
    marginBottom: 5,
  },
  bg: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: colors.dark["900"],
  },
  text: {
    color: "white",
    fontSize: 12
  },
  headlineText: {
    fontSize: 18
  }
});

export default SellerPanel;