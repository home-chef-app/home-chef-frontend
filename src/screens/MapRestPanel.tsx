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
import SellerPanel from 'components/SellerPanel';

type Props = {
  sellers: SellerType[];
  selectedSellerId: string;
  onClose: () => any
};

const MapRestPanel = ({ sellers, selectedSellerId, onClose }: Props) => {
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

  console.log(selectedSellerId);
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
      //backdropComponent={renderBackdrop}
      >
        <BottomSheetScrollView
          contentContainerStyle={styles.contentContainer}
          contentInset={{ bottom: 50 }}
          keyboardShouldPersistTaps="always"
          onScroll={handleScroll}
        >
          <Column>
            {sellers.map((seller) => <SellerPanel key={seller.id} seller={seller} />)}
          </Column>
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

export default MapRestPanel;

