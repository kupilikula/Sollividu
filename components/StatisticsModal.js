import {Pressable, ScrollView, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colorPalette} from '../styles/colorPalette';
import {styleSheet} from '../styles/styleSheet';
import {StackedBarChart} from 'react-native-chart-kit';
import {constants} from '../utils/constants';

export const StatisticsModal = props => {
  // console.log('props.stats', props.stats);
  const data = {
    labels: ['3', '4', '5', '6'],
    legend: ['வெற்றி', 'தோல்வி'],
    data: [
      [
        props.stats.victoriesByWordLength[3],
        props.stats.gamesPlayedByWordLength[3] -
          props.stats.victoriesByWordLength[3],
      ],
      [
        props.stats.victoriesByWordLength[4],
        props.stats.gamesPlayedByWordLength[4] -
          props.stats.victoriesByWordLength[4],
      ],
      [
        props.stats.victoriesByWordLength[5],
        props.stats.gamesPlayedByWordLength[5] -
          props.stats.victoriesByWordLength[5],
      ],
      [
        props.stats.victoriesByWordLength[6],
        props.stats.gamesPlayedByWordLength[6] -
          props.stats.victoriesByWordLength[6],
      ],
    ],
    barColors: [colorPalette.green, colorPalette.red],
  };

  const chartConfig = {
    backgroundColor: colorPalette.white,
    backgroundGradientFrom: colorPalette.white,
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: colorPalette.white,
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => colorPalette.black,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.6,
    useShadowColorFromDataset: false, // optional
    decimalPlaces: 0,
    showValuesOnTopOfBars: false,
    propsForBackgroundLines: {
      strokeDasharray: '1',
      strokeWidth: 0, // If you put 0 in the value no line is displayed
      stroke: 'rgba(0, 0, 0, 0)',
    },
    showBarTops: false,
  };

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
            height: 600,
            backgroundColor: colorPalette.black,
            borderWidth: 5,
            borderColor: colorPalette.white,
            borderRadius: 10,
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'flex-start',
          }}>
          <ScrollView>
            <Text style={styleSheet.helpModalTitle}>மதிப்பீடு</Text>
            <View>
              <Text
                style={[
                  styleSheet.helpModalText,
                  {textDecorationLine: 'underline', marginBottom: 15},
                ]}>
                மொத்தம்
              </Text>
              <Text style={styleSheet.helpModalText}>
                ஆட்டங்கள் : {props.stats.totalGamesPlayed.toString()}
              </Text>
              <Text style={styleSheet.helpModalText}>
                வெற்றிகள் : {props.stats.totalVictories.toString()}
              </Text>
            </View>
            <View style={{marginTop: 15}}>
              <Text
                style={[
                  styleSheet.helpModalText,
                  {textDecorationLine: 'underline', marginBottom: 15},
                ]}>
                எழுத்துகளால் பிரித்து
              </Text>
              <StackedBarChart
                style={{
                  backgroundColor: colorPalette.white,
                  alignSelf: 'center',
                  borderRadius: 5,
                }}
                data={data}
                width={250}
                height={320}
                chartConfig={chartConfig}
                decimalPlaces={0}
                segments={1}
                withHorizontalLabels={false}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
