import React from 'react';
import { Button , Box, FormLabel as Label, Input} from '@material-ui/core';
import { useForm } from "react-hook-form";
import LinearProgress from '@material-ui/core/LinearProgress';
import { BookType } from '../contexts/Types';

type Props = {
    defaultValues: any | null;
    onFormSubmit: (data: BookType) => void;
    isLoading: boolean;
}

export const BookForm: React.FC<Props> = ({onFormSubmit, isLoading , defaultValues}) => {

  const { register, handleSubmit } = useForm<BookType>({defaultValues: defaultValues});

  const onSubmit = (data: BookType) => onFormSubmit(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ marginBottom: 3 }}>
        <Label htmlFor="name">Name</Label>
        <Input {...register('name', { required: true })} />
      </Box>
      <Box sx={{ marginBottom: 3 }}>
        <Label htmlFor="author">Author</Label>
        <Input {...register('author', { required: true })}/>
      </Box>
      <Box sx={{ marginBottom: 3 }}>
        <Label htmlFor="ganre">Ganre</Label>
        <Input {...register('ganre', { required: true })}/>
      </Box>
      <Box sx={{ marginBottom: 3 }}>
        <Label htmlFor="image">Image</Label>
        <Input {...register('image', { required: true })} />
      </Box>
      <Box sx={{ marginBottom: 3 }}>
        <Label htmlFor="releaseDate">Release Date</Label>
        <Input type="date" {...register('releaseDate', { required: true })} />
      </Box>      
      <Button type="submit">
        { isLoading ? <LinearProgress /> : "Submit" }
      </Button>
    </form>
  );
};