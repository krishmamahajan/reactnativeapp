import React, { Component, useState } from 'react';
import { Container, Header, Content, DatePicker, Text } from 'native-base';
export default function DatePickerExample() {
  
  const [chosenDate, setDate] = useState(new Date());
 
    return (
      <Container>
        <Header />
        <Content>
          <DatePicker
          
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select date"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={setDate}
            disabled={false}
            />
            <Text>
              Date: {chosenDate.toString().substr(4, 12)}
            </Text>
        </Content>
      </Container>
    );

}