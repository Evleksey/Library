import React from 'react';
//import { useState } from 'react';

//Components
import { Wrapper } from './App.styles';
//import {Modal, useModal} from './components/modal';
import { Route, Routes } from "react-router-dom";
import ButtonAppBar from './components/navbar';
import BooksList from './components/BooksList';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import Login from './components/Login'; 


//logged={logged} setState={setLogged}
const App = () => {  
    
  return (    
    <Wrapper> 
      <ButtonAppBar/>
      <Routes>
        <Route path="/" element = {<BooksList/>}/>  
        <Route path="/addbook" element = {<AddBook/>}/>        
        <Route path="/editbook/:id" element = {<EditBook/>}/>           
        <Route path="/login" element = {<Login/>}/>            
      </Routes>
    </Wrapper>
  );
}


export default App;
