import React, { useState, useRef } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Box, IconButton, TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { styled } from '@mui/system';

const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end', // Initially place at the right-hand side
  transition: 'width 0.3s ease-in-out',
  overflow: 'hidden',
  width: ({ isOpen }) => (isOpen ? '300px' : '40px'),
  // backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  // boxShadow: theme.shadows[1],
  padding: '0 10px',
}));

const AnimatedSearchField = ({ searchTerm, onSearchChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SearchContainer isopen={isOpen}>
      {isOpen && (
        <TextField
          id="search-bar"
          label="Search Items"
          variant="filled"
          value={searchTerm}
          onChange={onSearchChange}
          autoFocus
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearchClick}>
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
      {!isOpen && (
        <IconButton onClick={handleSearchClick}>
          <SearchIcon />
        </IconButton>
      )}
    </SearchContainer>
  );
};

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

export {Cross, Minus, Add, AnimatedSearchField};