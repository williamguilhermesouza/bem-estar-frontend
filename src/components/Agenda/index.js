import React, {useState} from 'react';
import { ReactAgenda , ReactAgendaCtrl , guid ,  Modal } from 'react-agenda';
import { createStyles, makeStyles } from '@material-ui/styles';
require('moment/locale/pt-br.js'); // this is important for traduction purpose
 
const now = new Date();
 
var books = [
  {
   _id            :guid(),
    name          : 'Meeting , dev staff!',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
    classes       : 'color-1'
  },
  {
   _id            :guid(),
    name          : 'Working lunch , Holly',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 11, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 13, 0),
    classes       : 'color-2 color-3'
  },
  {
    _id            :guid(),
     name          : 'william e bala juquinha',
     startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+2, 11, 0),
     endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+2, 13, 0),
     classes       : 'color-1 color-3'
   },
 
];
 

const useStyles = makeStyles(theme => createStyles({
  root: {},
}));


export default function Agenda() {
  let classes = useStyles();
  const [items, setItems] = useState(books);
  const [selected, setSelected] = useState([]);
  const cellHeight = 30;
  const [showModal, setShowModal] = useState(false);
  const locale = 'pt-br';
  const rowsPerHour = 2;
  const numberOfDays = 4;
  const [startDate, setStartDate] = useState(new Date());

  const colors= {
    'color-1':"rgba(102, 195, 131 , 1)" ,
    "color-2":"rgba(242, 177, 52, 1)" ,
    "color-3":"rgba(235, 85, 59, 1)"
  }

  function handleItemEdit(item, openModal) {
    if(item && openModal === true){
      setSelected([item]);
      return setShowModal(true);
    }
  }

  function handleCellSelection(item, openModal) {
    if(selected && selected[0] === item){
      return  setShowModal(true);
    }
       setSelected([item]);

  }
  
  function handleRangeSelection(item){
    setSelected(item);
    setShowModal(true);
  }

  function addNewEvent (_items , newItems){
    setShowModal(false); 
    setSelected([]);
    setItems(_items);
    setShowModal(false);
  }
  
  function editEvent (_items , item){
    setShowModal(false); 
    setSelected([]);
    setItems(_items);
  }

  return (
    <div className={classes.root}>
      <ReactAgenda
        minDate={now}
        maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
        disablePrevButton={false}
        startDate={startDate}
        cellHeight={cellHeight}
        locale={locale}
        items={items}
        numberOfDays={numberOfDays}
        rowsPerHour={rowsPerHour}
        itemColors={colors}
        autoScale={false}
        fixedHeader={true}
        onRangeSelection={handleRangeSelection}
        onChangeEvent={setItems}
        onChangeDuration={setItems}
        onItemEdit={handleItemEdit}
        onCellSelect={handleCellSelection}
        onItemRemove={setItems}
        onDateRangeChange={setStartDate}/>

      {
          showModal? <Modal clickOutside={() => {setShowModal(false)}} >
            <div className="modal-content">
              <ReactAgendaCtrl items={items} itemColors={colors} selectedCells={selected} Addnew={addNewEvent} edit={editEvent}  />

            </div>
        </Modal>:''
      }
    </div>
  );
}