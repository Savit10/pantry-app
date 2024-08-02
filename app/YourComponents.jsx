import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

const AnimatedIconButton = styled(IconButton)(({ theme }) => ({
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.2)',
  },
}));

const HoverAnimatedCloseIcon = ({ onClick }) => (
  <AnimatedIconButton onClick={onClick}>
    <CloseIcon />
  </AnimatedIconButton>
);

const HoverAnimatedMinusIcon = ({ onClick }) => (
  <AnimatedIconButton onClick={onClick}>
    <RemoveIcon />
  </AnimatedIconButton>
);

const HoverAnimatedAddIcon = ({ onClick }) => (
  <AnimatedIconButton onClick={onClick}>
    <AddIcon />
  </AnimatedIconButton>
);

const Cross = ({ item, func }) => (
    <div>
      <HoverAnimatedCloseIcon onClick={() => func(item.name)} />
    </div>
);

const Minus = ({ item, func }) => (
    <div>
      <HoverAnimatedMinusIcon onClick={() => func(item.name)} />
    </div>
);

const Add = ({ item, func }) => (
    <div>
      <HoverAnimatedAddIcon onClick={() => func(item.name)} />
    </div>
);

export {Cross, Minus, Add};