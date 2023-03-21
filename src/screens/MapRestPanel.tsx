import React, {
  useCallback,
  useRef,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { colors } from 'theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from 'native-base';
import { SellerType } from 'store/sellers';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

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

        backdropComponent={renderBackdrop}


      >
        <BottomSheetScrollView
          contentContainerStyle={styles.contentContainer}
          contentInset={{ bottom: 50 }}
          keyboardShouldPersistTaps="always"
          onScroll={handleScroll}
        >
          <Text>Test</Text>
          {seller && (
            <Text>{seller.name}</Text>
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
});

export default App;
