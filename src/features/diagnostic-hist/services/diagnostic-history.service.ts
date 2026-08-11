import AsyncStorage from '@react-native-async-storage/async-storage';
import { DiagnosticRecord } from '../types/diagnostic-record';

export const RECORDS_KEY = 'motomedic-diagnostic-records';

export const diagnosticHistoryService = {
  /**
   * Reads the diagnostic logs array from local AsyncStorage
   */
  async getHistory(): Promise<DiagnosticRecord[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(RECORDS_KEY);
      if (!jsonValue) return [];
      
      const records = JSON.parse(jsonValue);
      return Array.isArray(records) ? records : [];
    } catch (error) {
      console.error('Failed to read diagnostic records from AsyncStorage:', error);
      throw new Error('Could not load vehicle diagnostic history.');
    }
  },
};