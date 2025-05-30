import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './src/navigation/navigation';
import linking from './src/navigation/linking';
import AppInitializer from './src/components/providers/AppInitializer';

const App: React.FC = () => {
  return (
    <>
      <AppInitializer />
      <NavigationContainer linking={linking} fallback={<></>}>
        <AuthNavigator />
      </NavigationContainer>
    </>
  );
};

export default App;
