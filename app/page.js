'use client'
import { Box, Button, Stack, Typography, Modal } from "@mui/material"
import { firestore } from '@/firebase'
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [pantry, setPantry] = useState([])

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
    const update = async () => {
      const col = query(collection(firestore, 'pantry'))
      const snapshot = await getDocs(col)
      const pantryItems = []
      snapshot.forEach(doc => {
        pantryItems.push(doc.id)
      })
      console.log(pantryItems)
      setPantry(pantryItems)
    }
    update()
  }, [])
  return (
    <Box width="100vw"  height="100vh" display = {'flex'} justifyContent = {'center'} flexDirection={'column'} alignItems = {'center'} gap={2}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
        </Box>
      </Modal>
      <Button variant="add" onClick={handleOpen}>Add Item</Button>
      <Box border = {'1px solid #333'}>
        <Box width="800px" height="100px" display="flex" justifyContent="center" alignItems="center" bgcolor={'#ADD8E6'}>
          <Typography variant="h3" textAlign={'center'}>
            Pantry Items
          </Typography>
        </Box>
        <Stack width="800px" height='300px' spacing={2} overflow={'scroll'}>
          {pantry.map((pantryItem) => (
            <Box 
              key={pantryItem} 
              width="100%" 
              minHeight="150px" 
              display="flex" 
              justifyContent="center" 
              alignItems="center"
              bgcolor={'#f0f0f0'} 
            >
              <Typography variant="h3" textAlign={'center'} >
              {
                //Capitalize the first letter of each item
                pantryItem.charAt(0).toUpperCase() + pantryItem.slice(1)
              }
              </Typography>
            </Box>
            ))}
        </Stack>
      </Box>
    </Box>
  )
}
