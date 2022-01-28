/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {useService} from '../src/hooks/useService';


jest.mock("@react-native-community/async-storage", () =>
  require("@react-native-community/async-storage/jest/async-storage-mock"),
);


