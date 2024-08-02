'use client'
import { Box, Button, Stack, Typography, Modal, TextField } from "@mui/material"
import { firestore } from '/firebase'
import { collection, query, getDoc, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore";
import { React, useEffect, useState } from "react"
import { Cross, Minus, Add } from './YourComponents';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  p: 4,
};

export default function Home() {
  const [pantry, setPantry] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [itemName, setItemName] = useState('')

  const addItem = async (item) => {
    const docRef = doc(firestore, 'pantry', item)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()) {
      await setDoc(docRef, {count: docSnap.data().count + 1})  
    } else {
      await setDoc(docRef, {count: 1})
    }
    await update()
  }

  const update = async () => {
    const col = query(collection(firestore, 'pantry'))
    const snapshot = await getDocs(col)
    const pantryItems = []
    snapshot.forEach(doc => {
      pantryItems.push({"name": doc.id, ...doc.data()})
    })
    setPantry(pantryItems)
  }
  

  const removeItem = async (item) => {
    const docRef = doc(firestore, 'pantry', item)
    const docSnap = await getDoc(docRef)
    if(docSnap.data().count > 0) {
      await setDoc(docRef, {count: docSnap.data().count - 1})
    }
    await update()
  }

  const deleteItem = async (item) => {
    const docRef = doc(firestore, 'pantry', item)
    await deleteDoc(docRef)
    await update()
  }
  useEffect(() => {
    update()
  }, [])
  
  return (
    <Box width="100vw"  height="100vh" display = {'flex'} justifyContent = {'center'} flexDirection={'column'} alignItems = {'center'} gap={2}>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" spacing={2}>
            Add Item
          </Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField id="filled-basic" label="Item Name" variant="filled" value={itemName} fullWidth onChange={(e) => setItemName(e.target.value)}/>
            <Button variant="outlined"
            onClick={() => {
              addItem(itemName)
              setItemName('')
              handleClose()
            }}>Add</Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="outlined" onClick={handleOpen}>Add Item</Button>
      <Box border = {'1px solid #333'}>
        <Box width="800px" height="100px" display="flex" justifyContent="center" alignItems="center" bgcolor={'#ADD8E6'}>
          <Typography variant="h3" textAlign={'center'}>
            Pantry Items
          </Typography>
        </Box>
        <Stack width="800px" height='300px' spacing={2} overflow={'scroll'}>
          {pantry.map((item) => (
              <Box
                key={item.name} 
                width="100%" 
                minHeight="150px" 
                display="flex" 
                justifyContent="space-between" 
                alignItems="center"
                bgcolor={'#f0f0f0'}
                padding={5} 
              >
                <Typography variant="h3" textAlign={'center'} >
                {
                  item.name.charAt(0).toUpperCase() + item.name.slice(1)
                }
                </Typography>

                
              <Minus item={item} func={removeItem} />
              <Typography variant="h3" textAlign={'center'} >
                  {item.count}
                </Typography>
              <Add item={item} func={addItem} />
              <Cross item={item} func={deleteItem} />
            </Box>
            ))}
        </Stack>
      </Box>
    </Box>
  )
}
