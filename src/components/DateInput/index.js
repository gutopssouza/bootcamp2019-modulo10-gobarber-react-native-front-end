import React, { useState, useMemo } from 'react';
import { Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, DateButton, DateText, Picker } from './styles';

export default function DateInput({ date, onChange }) {
  const [opened, setOpened] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [date]
  );

  function setDate(event, date2) {
    if (date2 !== undefined) {
      onChange(date2);
    }
    setOpened(!opened);
  }

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name="event" color="#FFF" size={20} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>

      {opened &&
        (Platform.OS === 'ios' ? (
          <Picker>
            <DateTimePicker
              value={date}
              onChange={onChange}
              minimumDate={new Date()}
              minuteInterval={60}
              locale="pt"
              mode="date"
            />
          </Picker>
        ) : (
          <DateTimePicker
            value={date}
            onChange={setDate}
            minimumDate={new Date()}
            minuteInterval={60}
            locale="pt"
            mode="date"
            display="spinner"
          />
        ))}
    </Container>
  );
}
