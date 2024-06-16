import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS, FONTS } from '../../constants';
import DatePicker from 'react-native-date-picker';
import { Icons } from '../../constants';
import { responsiveHeight, responsiveWidth } from '../../utils/responsive';

interface Props {
  labelText?: string;
  placeholder: string;
  mode?: 'date' | 'time' | 'datetime';
  onDateChange?: (formattedDate: string) => void;
  initialValue?: string; // New prop for initial value
}

const DateInputWithLabel: React.FC<Props> = ({ labelText, placeholder, mode = 'datetime', onDateChange, initialValue }) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue || '');

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
      setDate(new Date(initialValue));
    }
  }, [initialValue]);

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  };

  const handleDateChange = (selectedDate: Date) => {
    const formattedDate = formatDate(selectedDate);
    setDate(selectedDate);
    setValue(formattedDate);
    if (onDateChange) {
      onDateChange(formattedDate);
    }
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{labelText}</Text>
      <Pressable
        onPress={() => {
          setOpen(true);
        }}
        style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.grayHalfOpacity}
          value={value}
          editable={false}
        />
        <View style={styles.arrowContainer}>
          <Image
            style={{
              width: responsiveWidth(10),
              height: responsiveHeight(10),
            }}
            resizeMode="contain"
            source={Icons.arrowDown}
          />
        </View>
      </Pressable>
      <DatePicker
        modal
        open={open}
        date={date}
        mode={mode}
        onConfirm={handleDateChange}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {
    color: COLORS.darkGray,
    ...FONTS.body3,
    fontSize: 12,
    fontWeight: '400',
    paddingLeft: 3,
    transform: [{ translateY: 5 }],
  },
  input: {
    ...FONTS.body3,
    fontSize: 13,
    fontWeight: '400',
    color: COLORS.black,
    paddingVertical: 0,
    width: '90%',
    paddingLeft: 3,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: COLORS.superLightGray,
    flexDirection: 'row',
  },
  arrowContainer: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DateInputWithLabel;
