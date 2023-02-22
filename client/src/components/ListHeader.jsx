import { AppBar } from '@mui/material';
import { Container } from '@mui/material';
import { Box } from '@mui/material';
import MainButton from './MainButton';

const ListHeader = ({ listName, showModal, logout }) => {
  return (
    <AppBar
      position='relative'
      sx={{ width: '100vw', height: { sm: 100, xs: 150 } }}
    >
      <Container
        sx={{
          flexDirection: { xl: 'row', md: 'row', sm: 'row', xs: 'column' },
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <h1>{listName}</h1>
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
          <MainButton
            color='secondary'
            variant='contained'
            handleClick={showModal}
            text='Добавить новое дело'
          />
          <MainButton
            color='info'
            variant='contained'
            handleClick={logout}
            text='Выход'
          />
        </Box>
      </Container>
    </AppBar>
  );
};

export default ListHeader;
