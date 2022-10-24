import {Pressable, ScrollView, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colorPalette} from '../styles/colorPalette';
import {styleSheet} from '../styles/styleSheet';

export const StatisticsModal = props => {
  return (
    <Modal
      isVisible={props.visible}
      backdropColor={'black'}
      backdropOpacity={0.7}>
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
              console.log('onPress of close help modal');
              props.setStatisticsModalVisible(false);
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
            <Text style={styleSheet.helpModalTitle}>விளையாட்டு மதிப்பீடு</Text>
            <Text style={styleSheet.helpModalText}>
              ஆட்டங்கள் : {props.stats.totalGamesPlayed.toString()}
            </Text>
            <Text style={styleSheet.helpModalText}>
              வெற்றிகள் : {props.stats.totalVictories.toString()}
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
