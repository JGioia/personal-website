import React, { useState } from "react";
import Card from "../shared/Card";
import TextInput from "../shared/TextInput";
import Text from '../shared/Text';
import Button from "../shared/Button";

export default function ListColumn(props) {
  const selectedIndex = props.selectedIndex;
  const setListSize = props.setListSize;
  const index = props.index;

  const [list, setList] = useState([""]);

  return (
    <Card>
      <div style={{marginBottom: 15}}>
        <Text bold>
          List {index + 1}
        </Text>
      </div>
      <div>
        {list.map((text, index) => (
          <div 
            key={index} 
            style={index === selectedIndex ? 
              {marginBottom: 10, backgroundColor: "yellow"} : 
              {marginBottom: 10}}>
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
            setListSize(list.length + 1);
            setList(list => [...list, ""]);
          }}>
          <Text>
            Add Item
          </Text>
        </Button>
      </div>
    </Card>
  );
}