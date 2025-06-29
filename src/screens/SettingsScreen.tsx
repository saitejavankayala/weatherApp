import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleUnit } from '../features/settings/settingsSlice';
import { RootState } from '../store';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const unit = useSelector((state: RootState) => state.settings.unit);

  return (
    <View style={styles.container}>
      <Text>Temperature Unit: {unit === 'metric' ? 'Celsius' : 'Fahrenheit'}</Text>
      <Switch
        value={unit === 'imperial'}
        onValueChange={() => dispatch(toggleUnit())}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default SettingsScreen;