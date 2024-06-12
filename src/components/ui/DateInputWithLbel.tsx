import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, SIZES} from '../../constants';
import DatePicker from 'react-native-date-picker';
import {Icons} from '../../constants';
import {responsiveHeight, responsiveWidth} from '../../utils/responsive';

interface Props {
  labelText?: string;
  placeholder: string;
  mode?:"date"|"time"|"datetime"
  onDateChange?: (formattedDate: string) => void; // Updated prop for formatted date string

}

const DateInputWithLabel: React.FC<Props> = ({labelText, placeholder,mode='datetime',onDateChange}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const formatDate = (date: Date) => {
    // Format the date as needed, for example:
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  };

  const handleDateChange = (selectedDate: Date) => {
    const formattedDate = formatDate(selectedDate);
    setDate(selectedDate);
    setValue(formattedDate);
    if (onDateChange) {
      onDateChange(formattedDate);
    }
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
          onFocus={() => setOpen(true)}
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
        onDateChange={handleDateChange}
        // onDateChange={selectedDate => {
        //   setDate(selectedDate);
        //   setValue(formatDate(selectedDate));

        // }}
        onCancel={() => {
          setOpen(false);
        }}
        onConfirm={handleDateChange}

        // onConfirm={selectedDate => {
        //   setOpen(false);
        //   setDate(selectedDate);
        //   setValue(formatDate(selectedDate));
        //   if (onDateChange) {
        //     onDateChange(selectedDate);
        //   }
        // }}
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
    transform: [{translateY: 5}],
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
