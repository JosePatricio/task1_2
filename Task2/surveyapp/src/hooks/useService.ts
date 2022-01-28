import AsyncStorage from '@react-native-community/async-storage';
import {useMemo} from 'react';
import {SurveyData, SurveyValue} from '../entities/interfaces';

export function useService() {
  const service = useMemo(
    () => ({
      saveSurvey: async (rateValue: SurveyValue) => {
        const storagedSurveys = await AsyncStorage.getItem('surveys');
        let surveys: SurveyData[] = [];

        const currentDate = new Date().getTime();
        if (!storagedSurveys) {
          surveys = [
            {id: surveys.length, survey: rateValue, date: currentDate},
          ];
        } else {
          surveys = JSON.parse(storagedSurveys);
          surveys.push({
            id: surveys.length,
            survey: rateValue,
            date: currentDate,
          });
        }

        await AsyncStorage.setItem('surveys', JSON.stringify(surveys));
      },
    }),

    [],
  );

  return {service};
}
