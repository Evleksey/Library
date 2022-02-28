import React from 'react';
import { Button , Box, FormLabel as Label, Input} from '@material-ui/core';
import { useForm } from "react-hook-form";
import { Wrapper } from './book.styles';
import { useNavigate } from 'react-router-dom';
import AuthService from '../Auth/authentication';

type LoginType ={
    email: string;
    password: string;
}
// type Props= {
//     setLogged: (state: boolean) => void
// }
//:React.FC<Props>{setLogged}
const Login = () => {   

    const navigate = useNavigate();
  
    const onFormSubmit = async (data: LoginType) => {
        AuthService.login(data.email, data.password);
        navigate("/");
    }

    const { register, handleSubmit } = useForm<LoginType>();
    
    const onSubmit = (data: LoginType) => {
        //setLogged(false);
        onFormSubmit(data);
    }


    return (
        <Wrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ marginBottom: 3 }}>
                <Label htmlFor="email">E-Mail</Label>
                <Input {...register('email', { required: true })} />
                </Box>
                <Box sx={{ marginBottom: 3 }}>
                <Label htmlFor="password">Password</Label>
                <Input {...register('password', { required: true })}/>
                </Box>        
                <Button type="submit">Login</Button>
            </form>
        </Wrapper>
    );
}  
  
  export default Login;