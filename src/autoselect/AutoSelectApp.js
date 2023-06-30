import React, {useState} from 'react';
import Card from '../shared/Card';
import Button from '../shared/Button';
import SettingsColumn from './SettingsColumn';
import ListColumn from './ListColumn';

export default function AutoSelectApp(props) {
  const [listSizes, setListSizes] = useState([1]);
  const [selectedIndexs, setSelectedIndexs] = useState([-1]);

  const selectRandomIndexs = () => {
    setSelectedIndexs(listSizes.map(listSize => Math.floor(Math.random() * listSize)));
  }

  return (
    <div style={{margin:15}}>
      <div style={{display: "grid", height: "90vh", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", columnGap: 10, marginBottom: 10}}>
        <SettingsColumn />
        {selectedIndexs.map((selectedIndex, index) => (
          <div key={index}>
            <ListColumn 
              selectedIndex={selectedIndex}
              setListSize={(size) => 
                setListSizes((listSizes) => 
                  listSizes.map((innerSize, innerIndex) => 
                    innerIndex === index ? size : innerSize))} />
          </div>
        ))}
      </div>
      <div style={{display: "flex", height: "10vh", justifyContent: "center"}}>
        <Card>
          <Button onClick={selectRandomIndexs}>
            Start
          </Button>
        </Card>
      </div>
    </div>
  );
}