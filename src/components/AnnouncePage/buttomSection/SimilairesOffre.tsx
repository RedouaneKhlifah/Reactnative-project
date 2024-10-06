import {ImageBackground, Pressable, View} from 'react-native';
import React, {FC} from 'react';
import {COLORS, Images} from '../../../constants';
import {responsiveHeight, responsiveWidth} from '../../../utils/responsive';
import OffreInfo from '../../Home/BottomSection/OffreInfo';
import {IoffreData} from '../../Home/BottomSection/OffreCard';
import {useNavigationRef} from '../../../store/NavigationContext';

const SimilairesOffre: FC<{data: IoffreData | null}> = ({data}) => {
  if (!data) {
    return null;
  }

  const navigationRef = useNavigationRef();

  const handlePress = () => {
    navigationRef.current?.navigate('AnnouncePage', {id: data.id});
  };

  console.log("//////////// similar offre //////////////////");
  console.log(data.name);


  return (
    <Pressable
      onPress={handlePress}
      style={({pressed}) => [
        {opacity: pressed ? 0.8 : 1},
        {
          borderWidth: 1,
          borderBlockColor: COLORS.purple,
          borderRadius: 18,
          padding: 8,
          width: responsiveWidth(163),
          height: responsiveHeight(230),
          overflow: 'hidden',
        },
      ]}>
      <ImageBackground
        source={{uri: data.gallery_images_filenames[0]}}
        style={{
          width: responsiveWidth(147),
          height: responsiveHeight(165),
          borderRadius: 12,
          overflow: 'hidden',
        }}
      />
      <View
        style={{
          flex: 1,
          width: '90%',
          alignSelf: 'center',
          justifyContent: 'center',
          marginTop: responsiveHeight(10),
        }}>
        <OffreInfo
          title={data.name}
          location={data.address}
          titleStyle={{
            fontSize: responsiveWidth(11),
          }}
          locationStyle={{
            fontSize: responsiveWidth(10),
            transform: [{translateY: -2}],
          }}
          iconSize={responsiveWidth(13)}
        />
      </View>
    </Pressable>
  );
};

export default SimilairesOffre;
