import React, {
  useCallback,
  useRef,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { colors } from 'theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import { Column, Icon, Row, Text } from 'native-base';
import { SellerType } from 'store/sellers';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  seller: SellerType;
  onClose: () => any
};

const App = ({ seller, onClose }: Props) => {
  const [loading, setLoading] = useState(true);
  const [panelIndex, setPanelIndex] = useState(1);

  const sheetRef = useRef<BottomSheet>(null);
  const dispatch = useDispatch();

  const tabBarHeight = useBottomTabBarHeight();
  const [showHeader, setShowHeader] = useState(false);

  const snapPoints = useMemo(
    () => [150, 500],
    []
  );


  const handleScroll = (e: any) => {
    let paddingToBottom = 30;
    paddingToBottom += e.nativeEvent.layoutMeasurement.height;
    if (
      e.nativeEvent.contentOffset.y >=
      e.nativeEvent.contentSize.height - paddingToBottom
    ) {
      // Posts Hidden
      //setFetchingMore(true);
      //fetchMore();
    }
    if (!showHeader && e.nativeEvent.contentOffset.y > 50) {
      setShowHeader(true);
    } else if (showHeader && e.nativeEvent.contentOffset.y < 50) {
      setShowHeader(false);
    }
  };

  console.log(seller)
  // renders
  const renderBackdrop = React.useCallback(
    (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior='close'
      />
    ),
    []
  );

  // callbacks
  const handleSheetChange = useCallback((index: number) => {
    console.log(index)
    if (index == -1) {
      console.log('Bottom')
      onClose();
    }
  }, []);

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={sheetRef}
        index={panelIndex}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        backgroundComponent={() => <View style={styles.bg} />}
        //handleComponent={() => <View />}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}


      >
        <BottomSheetScrollView
          contentContainerStyle={styles.contentContainer}
          contentInset={{ bottom: 50 }}
          keyboardShouldPersistTaps="always"
          onScroll={handleScroll}
        >
          {seller && (
            <View style={{
              width: "100%",
              height: 200,
              backgroundColor: "blue",
              borderRadius: 20,
              position: "relative",
              overflow: "hidden"
            }}>
              <Image source={require('../assets/images/spagetti.jpg')} style={{
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
                    style={{
                      borderRadius: 14,
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
                  <Text style={[styles.text, styles.headlineText]}>Cook's name</Text>
                  <View style={{ height: 2 }} />
                  <Row>
                    <Text style={styles.text}>Primary cuisine</Text>
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
            </View>
          )}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

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

export default App;
