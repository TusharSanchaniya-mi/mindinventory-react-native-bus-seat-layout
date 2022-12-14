import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import { mainContainerStyle } from './styles';
import SeatContainer from './component/SeatContainer';

/*
This are props that require to pass in order to get seat layout
*/

const SeatsLayout = _ref => {
  let {
    blockedSeatImage = undefined,
    driverImage = undefined,
    driverPosition = 'right',
    getBookedSeats,
    isSleeperLayout = false,
    layout = {
      columnOne: 2,
      columnTwo: 2
    },
    maxSeatToSelect = 7,
    numberTextStyle,
    row = 10,
    seatImage = undefined,
    selectedSeats = []
  } = _ref;
  const [bookingSeat, setBookingSeat] = useState([]);
  const [userSelectedSeats, setUserSelectedSeat] = useState([]);
  const isEntryDoorAtFront = true;
  useEffect(() => {
    let allArray = [];
    let i = 0;
    let seatNumber = 1;
    while (i < row) {
      let j = 0;
      let seatArray = [];
      let seatLayout = {
        id: '-1',
        type: 'blocked'
      };
      if (i === 0 && j === 0) {
        // Add Bus layout has at front door
        // if (isEntryDoorAtFront) {
        seatLayout = {
          id: `${i},${j}`,
          type: driverPosition === 'left' ? 'driver' : 'emptySpace'
          // type: driverPosition == 'left' ? 'driver' : 'emptySpace',
        };

        seatArray.push(seatLayout);
        // }

        //Render empty space to show driver seat at last row and
        while (j < layout.columnOne + layout.columnTwo) {
          let iTotalColumn = layout.columnOne + layout.columnTwo;
          seatLayout = {
            id: '-1',
            type: 'blocked'
          };
          if (j === iTotalColumn - 1) {
            seatLayout = {
              id: `${i},${j}`,
              type: driverPosition === 'left' ? 'emptySpace' : 'driver'
              // type: driverPosition == 'left' ? 'emptySpace' : 'driver',
            };

            seatArray.push(seatLayout);
          } else {
            seatLayout = {
              id: `${i},${j}`,
              type: 'emptySpace'
            };
            seatArray.push(seatLayout);
          }
          if (!isEntryDoorAtFront && j === layout.columnOne - 1) {
            seatLayout = {
              id: `${i},${j}`,
              type: 'emptySpace'
            };
            seatArray.push(seatLayout);
          }
          j += 1;
        }
      } else {
        //Set Index value in id to all seat type for to make them selectable.
        let bSpaceAdded = false;
        let revCounter = i * (layout.columnOne + layout.columnTwo);
        while (j < layout.columnOne + layout.columnTwo) {
          let preSelectedSeatItem = selectedSeats.filter(item => {
            return item.seatNumber === (i % 2 === 0 ? revCounter : seatNumber);
          });
          seatLayout = {
            id: `${i},${bSpaceAdded ? j + 1 : j}`,
            type: preSelectedSeatItem.length > 0 ? preSelectedSeatItem[0].seatType : 'available',
            seatNo: i % 2 === 0 ? revCounter : seatNumber,
            isSeatSeleced: preSelectedSeatItem.length > 0
          };
          seatArray.push(seatLayout);
          if (j === layout.columnOne - 1) {
            seatLayout = {
              id: `${i},${j + 1}`,
              type: i === row - 1 ? preSelectedSeatItem.length > 0 ? preSelectedSeatItem[0].seatType : 'available' : 'emptySpace',
              seatNo: i % 2 === 0 || i !== row - 1 ? revCounter : seatNumber,
              isSeatSeleced: i === row - 1 ? preSelectedSeatItem.length > 0 : false
            };
            seatArray.push(seatLayout);
            bSpaceAdded = true;
          }
          j += 1;
          revCounter -= 1;
          seatNumber += 1;
        }
      }
      allArray.push(seatArray);
      i += 1;
    }
    setBookingSeat(allArray);
  }, []);
  useEffect(() => {
    getBookedSeats && getBookedSeats(userSelectedSeats);
  }, [userSelectedSeats]);
  const onSeatSelected = useCallback(seat => {
    let allChangedItem = bookingSeat;
    const {
      id
    } = seat;
    const arrindexs = id.split(',').map(item => Number(item));
    let changeItem = seat;
    changeItem.type = changeItem.type == 'available' ? 'booked' : 'available';
    changeItem.isStatusChange = true;
    allChangedItem[arrindexs[0]][arrindexs[1]] = changeItem;
    setBookingSeat([...allChangedItem]);
    getSelectedSeats([...allChangedItem]);
  }, [bookingSeat]);
  const getSelectedSeats = bookingSeatArg => {
    let filterSelectedSeats = bookingSeatArg.flatMap(rowSeatArr => {
      return rowSeatArr.filter(rowSeat => {
        return rowSeat.type === 'booked' && rowSeat.isStatusChange;
      });
    });
    setUserSelectedSeat(filterSelectedSeats);
  };
  const renderSeatlayout = (item, index) => {
    return /*#__PURE__*/React.createElement(SeatContainer, {
      item: item,
      index: index,
      isSleeperLayout: isSleeperLayout,
      seatImage: seatImage,
      driverImage: driverImage,
      blockedSeatImage: blockedSeatImage,
      numberTextStyle: numberTextStyle,
      disableSeat: userSelectedSeats.length === maxSeatToSelect,
      onSeatSelected: seat => {
        onSeatSelected(seat);
      }
    });
  };
  return /*#__PURE__*/React.createElement(SafeAreaView, null, /*#__PURE__*/React.createElement(View, {
    style: mainContainerStyle
  }, /*#__PURE__*/React.createElement(FlatList, {
    showsVerticalScrollIndicator: false,
    bounces: false,
    data: [...bookingSeat],
    renderItem: _ref2 => {
      let {
        item,
        index
      } = _ref2;
      return renderSeatlayout(item, index);
    },
    keyExtractor: () => Math.random().toString()
  })));
};
export default /*#__PURE__*/React.memo(SeatsLayout);
//# sourceMappingURL=index.js.map