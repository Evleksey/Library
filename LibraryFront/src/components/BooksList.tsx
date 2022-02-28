import React from 'react';
//import { useState } from 'react';
import {useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

//Components
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Book from './book';
//Styles
//import {wraper} from './App.styles';

//Types
import { BookType } from '../contexts/Types';
import authHeader from '../Auth/authHeader';

const getBooks = async (): Promise<BookType[]> => {
    return await(await fetch(`${process.env.REACT_APP_API_ADDRESS as string}/books`)).json();
}


const BooksList = () => {
    const navigate = useNavigate();

    const handleEditing = (clickedBook: BookType) => {
        navigate(`/editbook/${clickedBook.id}`);
    };
    const {data, isLoading, error} = useQuery<BookType[]>('books', getBooks);

    const queryClient = useQueryClient();

    const removeBook = async (id: number):Promise<boolean> => {
        let ok: boolean = await(await fetch(
            `${process.env.REACT_APP_API_ADDRESS}/book/remove/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": authHeader()
                }   
            }
        )).ok;
        queryClient.invalidateQueries('books')
        return ok;
    }

    if(isLoading) return <LinearProgress />;
    if(error) return (
        <div>Something went wrong ...</div>
    );

    return (
        <Grid container spacing={1}>
            {data?.map(book => (
                <Grid item key={book.id} xs={12} sm={4}>
                    <Book book={book} removeBook={removeBook} handleEditing={handleEditing}/>
                </Grid>
            ))}
        </Grid>  
    ); 
}  

export default BooksList;
          
         