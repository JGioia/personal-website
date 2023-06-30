import React, { useState, useEffect } from "react";
import Card from "../shared/Card";
import TextInput from "../shared/TextInput";
import Text from '../shared/Text';
import Button from "../shared/Button";

export default function ListColumn(props) {
  const selectedIndex = props.selectedIndex;
  const setListSize = props.setListSize;

  const [list, setList] = useState([""]);

  return (
    <Card>
      <div style={{marginBottom: 10}}>
        <Text bold>
          List
        </Text>
      </div>
      <div>
        {list.map((text, index) => (
          <div 
            key={index} 
            style={index === selectedIndex ? 
              {marginBottom: 5, backgroundColor: "yellow"} : 
              {marginBottom: 5}}>
            <TextInput 
              fullWidth
              value={text}
              setValue={(newText) => setList((list) => {
                let newList = [...list];
                newList[index] = newText;
                return newList;
              })} />
          </div>
        ))}
        <Button 
          fullWidth 
          onClick={() => {
            setList(list => [...list, ""]);
            setListSize(list.length);
          }}>
          <Text>
            Add Item
          </Text>
        </Button>
      </div>
    </Card>
  );
}