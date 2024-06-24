import styled from '@emotion/styled';
import { Avatar, Box, Button } from '@mui/material';

const StyledComponents = {
  StyledBox: styled(Box)({
    marginTop: '64px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }),
  StyledAvatar: styled(Avatar)({
    margin: '8px',
    backgroundColor: '#1976d2'
  }),
  StyledButton: styled(Button)({
    margin: '24px 0 16px 0'
  })
};

export default StyledComponents;
