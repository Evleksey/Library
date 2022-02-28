import React from 'react';
//import { useState } from 'react';
import {useQuery, } from 'react-query';
import { useMutation } from "react-query"
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom"

//Components
import LinearProgress from '@material-ui/core/LinearProgress';

//Types
import { BookType } from '../contexts/Types';
import { Wrapper } from './book.styles';
import { BookForm } from './BookForm';
import authHeader from '../Auth/authHeader';


const editBookApi = async (book: BookType):Promise<boolean> => {
    return await(await fetch(
        `${process.env.REACT_APP_API_ADDRESS}/book/update/${book.id}`,
        {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authHeader()
          },
          body: JSON.stringify(book),     
        }
    )).ok;
}

type Params = {
    //queryKey: [string, { id: string | undefined }];
};

const getBook = async (id: string | undefined): Promise<BookType> => {
    //const [, { id }] = params.queryKey;
    return await(await fetch(`${process.env.REACT_APP_API_ADDRESS as string}/book/${id}`)).json();
}



const EditBook = () => {   
    const { id } = useParams();

    const { mutateAsync, isLoading} = useMutation(editBookApi);
    const navigate = useNavigate();

    //const {data, error, isFetching} = useQuery<BookType, Error>("book", getBook); 
    const {data, error, isFetching} = useQuery("book", () => getBook(id)); 


    if(isFetching) return <LinearProgress />;

    if(error) return (
        <div>Something went wrong ...</div>
    );
    

    

    const onFormSubmit = async (data: BookType) => {
        //console.log("submit" );
        await mutateAsync({...data})
        navigate("/");
    }

    return (
        <Wrapper>
        <Box sx={{py: 3}}>
            <Typography variant="h6"  component="div">Edit Book</Typography>
            <BookForm onFormSubmit={(data: BookType) => onFormSubmit(data)} isLoading={isLoading} defaultValues ={data}/>
        </Box>
        </Wrapper>
    );
}  

export default EditBook;
          
         