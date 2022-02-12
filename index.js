/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {AppRoutes} from './src/routes';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppRoutes);
