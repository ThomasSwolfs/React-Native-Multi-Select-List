import React, {useState, useEffect} from 'react';

import {
  List,
  ListItem,
  Text,
  Body,
  Container,
  Root,
  Content,
} from 'native-base';
import {StyleSheet} from 'react-native';
import SelectionListHeader from './SelectionListHeader';

const mockItems = [
  {
    id: '1',
    name: 'Once upon a Time in Hollywood',
  },
  {
    id: '2',
    name: 'The Joker',
  },
  {
    id: '3',
    name: 'The Gentlemen',
  },
  {
    id: '4',
    name: 'Mulan',
  },
  {
    id: '5',
    name: 'Onward',
  },
  {
    id: '6',
    name: 'Fantasy Island',
  },
  {
    id: '7',
    name: 'Birds of Prey',
  },
  {
    id: '8',
    name: 'Bad Boys For Life',
  },
  {
    id: '9',
    name: 'The call of the wild',
  },
  {
    id: '10',
    name: 'James Bond',
  },
  {
    id: '11',
    name: 'Downhill',
  },
  {
    id: '12',
    name: 'Once Upon a Time in Hollywood',
  },
  {
    id: '13',
    name: 'Once Upon a Time in Hollywood',
  },
];

function useSelectionChange(items) {
  const [selectionMode, setSelectionMode] = useState(null);
  useEffect(() => {
    if (items.filter(i => i.selected).length > 0) {
      setSelectionMode(true);
    } else {
      setSelectionMode(false);
    }
  });
  return selectionMode;
}

function Main() {
  const [items, setItems] = useState(mockItems);
  const selectionMode = useSelectionChange(items);

  const toggleSelect = item => {
    setItems(
      items.map(i => {
        if (item === i) {
          i.selected = !i.selected;
        }
        return i;
      }),
    );
  };

  const clearSelection = () => {
    setItems(
      items.map(i => {
      i.selected = false;
      return i;
      }),
    );
  };

  const onPress = item => {
    if (selectionMode) {
      toggleSelect(item);
    } else {
      pressItem(item);
    }
  };

  const onLongPress = item => {
    if (selectionMode === false) {
      toggleSelect(item);
    }
  };

  const pressItem = item => {
    console.log(JSON.stringify(item) + " pressed");
  };

  const renderItem = item => {
    return (
      <ListItem
        onPress={() => onPress(item)}
        onLongPress={() => onLongPress(item)}
        key={item.id}
        style={[item.selected ? styles.selected : styles.normal]}>
        <Body>
          <Text>{item.name}</Text>
        </Body>
      </ListItem>
    );
  };

  return (
    <>
      <Root>
        <Container>
          <SelectionListHeader
            selectionMode={selectionMode}
            title="Movies"
            selectedItemsCount={items.filter(i => i.selected).length}
            clearSelection={clearSelection}
            selectActions={[
              {
                name: 'Delete',
                method: function() {
                  clearSelection();
                },
              },
              {
                name: 'Cancel',
              },
            ]}
          />
          <Content>
            <List>
              {items.map(item => {
                return renderItem(item);
              })}
            </List>
          </Content>
        </Container>
      </Root>
    </>
  );
}

export default Main;

const styles = StyleSheet.create({
  selected: {
    backgroundColor: 'lightgray',
    marginLeft: 0,
    paddingLeft: 18,
  },
  normal: {},
});
