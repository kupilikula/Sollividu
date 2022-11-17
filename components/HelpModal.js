import {Linking, Pressable, ScrollView, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {colorPalette} from '../styles/colorPalette';
import {styleSheet} from '../styles/styleSheet';
import {constants} from '../utils/constants';

export const HelpModal = props => {
  return (
    <Modal
      isVisible={props.visible}
      backdropColor={'black'}
      backdropOpacity={0.5}
      statusBarTranslucent={true}
      deviceHeight={constants.screenHeight}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 50,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '95%',
          }}>
          <Pressable
            onPress={() => {
              // console.log('onPress of close help modal');
              props.setHelpModalVisible(false);
            }}>
            <View
              style={{
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                width: 35,
                height: 35,
              }}>
              <MaterialCommunityIcon
                name="close-box"
                size={30}
                color={colorPalette.white}
              />
            </View>
          </Pressable>
        </View>
        <View
          style={{
            width: '95%',
            backgroundColor: colorPalette.black,
            borderWidth: 5,
            borderColor: colorPalette.white,
            borderRadius: 10,
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'flex-start',
          }}>
          <ScrollView>
            <Text style={styleSheet.helpModalTitle}>விளையாட்டு முறை</Text>
            <Text style={styleSheet.helpModalText}>
              மறைந்துள்ள சொல்லை 8 முயற்சிகளில் கண்டுப்பிடிக்கவும். ஒரு சொல்லை
              ஊகித்தால் அதை சரி பார்த்து எழுத்துகளுக்கு குறிப்புகள்
              காட்டப்படும்.
            </Text>

            <View
              style={{
                marginTop: 12,
                marginLeft: 12,
                marginRight: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  width: 0.8 * constants.letterTileSize,
                  height: 0.8 * constants.letterTileSize,
                  backgroundColor: colorPalette.green,
                  marginRight: 10,
                }}
              />
              <Text style={styleSheet.helpModalText}>
                சரியான எழுத்து சரியான இடத்தில் இருக்கு
              </Text>
            </View>
            <View
              style={{
                marginTop: 12,
                marginLeft: 12,
                marginRight: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  width: 0.8 * constants.letterTileSize,
                  height: 0.8 * constants.letterTileSize,
                  backgroundColor: colorPalette.yellow,
                  marginRight: 10,
                }}
              />
              <Text style={styleSheet.helpModalText}>
                சரியான எழுத்து தவறான இடத்தில் இருக்கு
              </Text>
            </View>
            <View
              style={{
                marginTop: 12,
                marginLeft: 12,
                marginRight: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  width: 0.8 * constants.letterTileSize,
                  height: 0.8 * constants.letterTileSize,
                  backgroundColor: colorPalette.gray,
                  marginRight: 10,
                }}
              />
              <Text style={styleSheet.helpModalText}>
                எழுத்து சொல்லில் இடம்பெறவில்லை
              </Text>
            </View>
            <View
              style={{
                marginTop: 12,
                marginLeft: 12,
                marginRight: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <FeatherIcon name="star" size={25} color={colorPalette.white} />
              <Text style={styleSheet.helpModalText}>
                இவ்விடத்தில் ஊகித்த எழுத்தின் மெய் எழுத்து பகுதி சரி, ஆனால்
                உயிர் எழுத்து பகுதி தவறு
              </Text>
            </View>
            <View
              style={{
                marginTop: 12,
                marginLeft: 12,
                marginRight: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <FeatherIcon
                name="volume-1"
                size={30}
                color={colorPalette.white}
              />
              <Text style={styleSheet.helpModalText}>
                இவ்விடத்தில் ஊகித்த எழுத்தின் உயிர் எழுத்து பகுதி சரி, ஆனால்
                மெய் எழுத்து பகுதி தவறு
              </Text>
            </View>
            <Text style={styleSheet.helpModalSmallText}>
              இந்த விளையாட்டில் பயன்படுகிற சொல் பட்டியலிற்க்கு
              <Text
                style={{color: colorPalette.blue}}
                onPress={() =>
                  Linking.openURL(
                    'https://dsal.uchicago.edu/dictionaries/tamil-lex/'
                  )
                }>
                {' '}
                Tamil Lexicon (University of Madras){' '}
              </Text>
              என்ற நூலை இலக்கமாக்கிய University of Chicago-வின் Digital
              Dictionaries of South Asia உபாயத்திற்க்கு நன்றி.
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
