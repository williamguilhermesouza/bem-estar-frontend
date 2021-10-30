import React, {useEffect, useState} from 'react';
import { ReactAgenda , ReactAgendaCtrl,  Modal } from 'react-agenda';
import { createStyles, makeStyles } from '@material-ui/styles';
import { getAgenda, createAgenda, updateAgenda, deleteAgenda } from '../../services/API';
require('moment/locale/pt-br.js'); // this is important for traduction purpose

const now = new Date();

const useStyles = makeStyles(theme => createStyles({
  root: {},
}));

export default function Agenda() {
  let classes = useStyles();
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const cellHeight = 30;
  const [showModal, setShowModal] = useState(false);
  const locale = 'pt-br';
  const rowsPerHour = 2;
  const numberOfDays = 4;
  const [startDate, setStartDate] = useState(new Date());

  async function fetchData() {
    let data = await getAgenda();
    data = data.data;
    data.forEach(element => {
      element.startDateTime = new Date(element.startDateTime);
      element.endDateTime = new Date(element.endDateTime);
    });
    setItems(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

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

  async function addNewEvent (_items , newItems){
    setShowModal(false); 
    setSelected([]);
    setItems(_items);
    await createAgenda(newItems);
  }
  
  async function editEvent (_items , item){
    setShowModal(false); 
    setSelected([]);
    setItems(_items);
    await updateAgenda(item);
  }

  async function handleItemRemove(_items, item) {
    console.log(item);
    const newItems = items.filter(agenda => {
      return agenda.id !== item.id;
    });
    setItems(newItems);
    await deleteAgenda(item.id);
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
        onItemRemove={handleItemRemove}
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