
class AuthService {

    async login(email: string, password: string): Promise<void>  {        
        let resp = await fetch(
            `${process.env.REACT_APP_API_ADDRESS}/login`,
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),     
            }
        );
        let data = await resp.json();
        if(data.sucess) {
            localStorage.setItem('token',data.token);
        }
    
    }
    logout():void{
        localStorage.removeItem("token");
    }   
    
};
  export default new AuthService();