import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {removeItemFromCart} from "../../store/cart/cart.action";
import {useDispatch} from "react-redux";


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

export const Confirm=({id})=> {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
     const dispatch=useDispatch();

    const removeItem = () => {
        dispatch(removeItemFromCart(id));
    }

    return (
        <div>
            <div onClick={handleOpen}>&#10005;</div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                           Do you want to remove this item ?
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                           <Button onClick={removeItem}>Yes</Button>
                            <Button onClick={handleClose}>No</Button>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
