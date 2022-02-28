import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import authentication from '../Auth/authentication';
import { useState } from 'react';


const StyledLink = styled(Link)`
  color: White;
  text-decoration: none;
  margin: 1rem;
  position: relative;
`;

const StyledBox = styled(Box)`
  padding: 0 0 10px 0;
`;


// type Props = {
//   logged: boolean;
//   setState : (state: boolean) => void;
// }

// const onLogout = (setState: (state: boolean)=> void):void => {
//   setState(false);
//   authentication.logout();
// }
//: React.FC<Props> {logged, setState}
const ButtonAppBar = () => {  

  return (
    <StyledBox sx={{ flexGrow: 1 }}  >
      <AppBar position="static">
        <Toolbar>                   
          <Typography variant="h6"  component="div" >
            <StyledLink to="/">          
              Library             
            </StyledLink>  
          </Typography> 
          <Box mx="auto"/>                
          <Button>
            <StyledLink to="/addbook">+ Add</StyledLink>
          </Button>
          <Button>
            <Typography onClick={authentication.logout}>Logout</Typography>
          </Button>
          <Button>
            <StyledLink to="/login">Login</StyledLink>
          </Button>          
        </Toolbar>
      </AppBar>
    </StyledBox>
  );
}

export default ButtonAppBar;