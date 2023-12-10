import { Box, Button, FormControl, FormLabel, Input, InputGroup, Text, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { UserAuth } from '../ContextAPI/UserProvider';
import { Helmet } from 'react-helmet';

export function Login() {

    const {isAuth,authSuccess,getUser} = useContext(UserAuth);
    const navigate = useNavigate();
    const [data,setData]= useState([])
    const [formdata,setFormData] = useState({email:"",password:""})
    const toast = useToast()
    const [loading,setLoading] = useState(false);
    const location = useLocation()

    useEffect(()=>{
        axios.get("https://bmiapi-xflg.onrender.com/users")
        .then((res)=>{
            setData(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    if(isAuth){
        return <Navigate to='/' />
    }

    const handleLogin= (e)=>{
        e.preventDefault();
        setLoading(true)
        let userData = data.find((ele)=> ele.email===formdata.email && ele.password===formdata.password);
        
        setTimeout(() => {
            if(userData){
                authSuccess();
                getUser(userData)
                toast({
                    position:"bottom",
                    status:"success",
                    duration: 2000,
                    title:"Login Successfully!!"
                })
                setLoading(false)
                setFormData({email:"",password:""})
                if(location.state===null){
                    navigate("/")
                }else{
                    navigate(location.state, {replace:true})
                }
            }else{
                toast({
                    position:"bottom",
                    status:"error",
                    duration: 2000,
                    title:"Wrong Credentials!!"
                })
                setLoading(false)
            }
        }, 2000);
    }
    

    return (
        <Box w={{base:'100%',sm:"100%",md:"400px",lg:"400px",xl:"400px"}} m="auto" mt="120px" p="20px" borderRadius="20px">
            <Helmet>
                <title>Login | BMI</title>
            </Helmet>
            <h1 style={{textAlign:"center",fontWeight:"bold",
            fontSize:"25px",color:"#00B7FF",
            textShadow:"1px 1px #000"}}>LOGIN</h1><br/>

            <form onSubmit={handleLogin}>
                <FormControl isRequired>

                    <FormLabel>Enter Email</FormLabel>
                    <InputGroup>
                        <Input value={formdata.email} onChange={(e)=> setFormData({...formdata,email:e.target.value})} border="1px solid #dbdbdb" placeholder="user@user.com" type='email' required />
                    </InputGroup><br/>

                    <FormLabel>Enter Password</FormLabel>
                    <InputGroup>
                        <Input value={formdata.password} onChange={(e)=> setFormData({...formdata,password:e.target.value})} border="1px solid #dbdbdb" placeholder="user@123" type='password' required />
                    </InputGroup><br/>

                    {loading? <Button isLoading _hover={{bg:"#00B7FF"}} color='white' bg="#00B7FF" w="100%">Wait...</Button> : 
                    <Button type='submit' variant="unstyled" bg="#00B7FF" color='white' w="100%">LOGIN</Button>}
                    
                </FormControl>
            </form>

            <Text mt="10px" textAlign="center" fontWeight="semibold">New User? <span style={{color:"#00B7FF",cursor:"pointer"}} onClick={()=> navigate("/signup")}>Create Account</span></Text>
        </Box>
    )
}
