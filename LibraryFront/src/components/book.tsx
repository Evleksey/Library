import React from "react";
//import { isError, Mutation, MutationKey, useMutation, useQuery } from 'react-query';
import { useMutation } from 'react-query';
import Button from '@material-ui/core/Button';

//Types
import { BookType } from "../contexts/Types";

//Styles
import { Wrapper } from "./book.styles";
import Grid from '@material-ui/core/Grid';


type Props = {
    book: BookType;
    removeBook: (id: number) => Promise<boolean>;
    handleEditing: (clickedBook: BookType) => void;
}

const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  }

const Book: React.FC<Props> = ({book, removeBook, handleEditing}) => {


    const { mutateAsync } = useMutation(removeBook);

    const handleDeleteBook = async (clickedBook: BookType) => {    
    await mutateAsync(clickedBook.id)
    //queryClient.invalidateQueries('books')
    }
    console.log(book.releaseDate);
    return(
    <Wrapper onDoubleClick={() => handleEditing(book)}> 
        <img src = {book.image} alt = {book.name}></img>
            <Grid container>
                <Grid item xs>
                    <h3>{book.name}</h3>
                    <h3>{book.author}</h3>
                    <p>{book.ganre}</p>
                    <p>{book.releaseDate.toLocaleString('ru-RU')}</p>
                </Grid>
            </Grid>       
            <Button onClick = {() => handleDeleteBook(book)}>Delete from library</Button>
    </Wrapper>
    );
}

export default Book;