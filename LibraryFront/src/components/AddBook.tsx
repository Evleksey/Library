import React from 'react';
import { useMutation } from "react-query"
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useNavigate } from 'react-router-dom';

import { BookType } from '../contexts/Types';
import { Wrapper } from './book.styles';
import { BookForm } from './BookForm';
import authHeader from '../Auth/authHeader';


const addBookApi = async (book: BookType):Promise<boolean> => {
    return await(await fetch(
        `${process.env.REACT_APP_API_ADDRESS}/book/add`,
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authHeader()
          },
          body: JSON.stringify(book),     
        }
    )).ok;
}



const AddBook = () => {   

  const { mutateAsync, isLoading } = useMutation(addBookApi);
  const navigate = useNavigate();

  const onFormSubmit = async (data: BookType) => {
    await mutateAsync({...data})
    navigate("/");
  }

  return (
    <Wrapper>
    <Box sx={{py: 3}}>
        <Typography variant="h6"  component="div">Create New Book</Typography>
        <BookForm onFormSubmit={(data: BookType) => onFormSubmit(data)} isLoading={isLoading} defaultValues ={undefined}/>
    </Box>
    </Wrapper>
  );
}  

export default AddBook;
          
         