/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { useService } from './src/hooks/useService';

const App = () => {
  const [rateValue, setRateValue] = useState<SurveyValue>({
    survey1: 0,
    survey2: 0,
  });
  const surveyRange = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  const {service} = useService();

  const onSubmitSurvey = async() => {
      await service.saveSurvey(rateValue);
      setRateValue({survey1: 0, survey2: 0});
      alert('Complete!'); 
  };

  const onClearSurvey = async() => {
    setRateValue({survey1: 0, survey2: 0});
  };

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Mobile Survey App</Text>

      <View style={styles.reviewSection}>
        <Text style={styles.surveyText}>
          How was your sleep last night
        </Text>
         <AirbnbRating
          starContainerStyle={{flexWrap: 'wrap', padding: 5}}
          count={10}
          onFinishRating={(e)=>{
            setRateValue({...rateValue, survey1: e});
          }}
          reviews={surveyRange}
          defaultRating={rateValue.survey1}
          size={40}
          showRating={false}
        /> 
      </View>

      <View style={styles.reviewSection}>
        <Text style={styles.surveyText}>How good is your skin condition  </Text>
         <AirbnbRating
          starContainerStyle={{flexWrap: 'wrap', padding: 5}}
          count={10}
          reviews={surveyRange}
          onFinishRating={(e)=>{
            setRateValue({...rateValue, survey2: e});
          }}
          defaultRating={rateValue.survey2}
          size={40}
          showRating={false}
        /> 
      </View>
      <View style={styles.btnSection}>
          <View style={styles.btn}>
            <Button onPress={onClearSurvey} title="Clear"  />
          </View>
          <View style={styles.btn}>
            <Button onPress={onSubmitSurvey} title="Submit"  />
          </View>
       </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  reviewSection: {
    alignItems: 'center',
    paddingVertical: 30
  },
  btn: {
    paddingHorizontal:20
  },
  btnSection: {
    flexDirection:'row',justifyContent:'space-around'
  },
  
  title: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  surveyText: {
    fontSize: 18,
  },
});

export default App;
