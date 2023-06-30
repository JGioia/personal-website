import React, {useState} from 'react';
import Card from '../shared/Card';
import Button from '../shared/Button';
import Text from '../shared/Text';
import ListColumn from './ListColumn';

export default function AutoSelectApp(props) {
  const [listSizes, setListSizes] = useState([1]);
  const [selectedIndexs, setSelectedIndexs] = useState([-1]);

  const outerMargin = 15;
  const marginBetweenComponents = 20;
  const listHeight = "calc(90vh - " + (outerMargin + marginBetweenComponents) + "px)";

  // TODO:
  // Features: Select 1 vs all, Select repeatedly, disable interaction during animation, add remove buttons, import/export
  // Aesthetics: Choose new font, redo highlight effect, fix buttons, add confetti?, add clicking noises?

  const selectRandomIndexs = (listSizes) => {
    const maxListSize = listSizes.reduce((maxListSize, currentListSize) => currentListSize > maxListSize ? currentListSize : maxListSize);
    const finalSelectedIndexs = listSizes.map(listSize => Math.floor(Math.random() * listSize));

    const endPoint = Math.floor(Math.random() * 10) + 10 + 2 * maxListSize;
    const delay = (i) => {
      let milliseconds = 0;
      const minDelay = 120;
      const maxDelay = 600;
      const diffDelay = maxDelay + minDelay;
      for (let j = 0; j < i; j ++) {
        milliseconds += minDelay + diffDelay * ((j / endPoint) ** 3);
      }
      return milliseconds;
    };

    for (let i = 0; i < endPoint; i++) {
      setTimeout(() => {
        setSelectedIndexs(listSizes.map((listSize, listIndex) => {
          const finalSelectedIndex = finalSelectedIndexs[listIndex];
          let selectedIndex = i % listSize;
          if (i > Math.floor(endPoint / listSize) * listSize && selectedIndex >= finalSelectedIndex) {
            selectedIndex = finalSelectedIndex;
          }
          return selectedIndex;
        }));
      }, delay(i))
    }

    setTimeout(() => setSelectedIndexs(finalSelectedIndexs), delay(endPoint));
  };

  const setListSize = (size, listIndex) => 
    setListSizes((listSizes) => 
      listSizes.map((innerSize, innerIndex) => 
        innerIndex === listIndex ? size : innerSize));

  const addList = () => {
    setListSizes(listSizes => [...listSizes, 1]);
    setSelectedIndexs(selectedIndexs => [...selectedIndexs, -1]);
  };

  const clearSelections = () => {
    setSelectedIndexs(selectedIndexs => selectedIndexs.map(_ => -1));
  };

  return (
    <div style={{margin: outerMargin}}>
      <div style={{
          display: "grid", 
          height: listHeight, 
          gridTemplateColumns: "1fr 1fr 1fr 1fr", 
          columnGap: marginBetweenComponents, 
          marginBottom: marginBetweenComponents}}>
        {selectedIndexs.map((selectedIndex, index) => (
          <div key={index}>
            <ListColumn 
              index={index}
              selectedIndex={selectedIndex}
              setListSize={(size) => setListSize(size, index)} />
          </div>
        ))}
        {listSizes.length < 4 && 
          <Button onClick={addList}>
            <Text>
              Add List
            </Text>
          </Button>
        }
      </div>
      <div style={{justifyContent: "center"}}>
        <Card>
          <div style={{display: "flex", flexDirection: "row", justifyContent: "center", gap: marginBetweenComponents}}>
            <Button onClick={() => selectRandomIndexs(listSizes)}>
              <Text bold>
                Select Once
              </Text>
            </Button>
            <Button onClick={clearSelections}>
              <Text bold>
                Clear Selections
              </Text>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}