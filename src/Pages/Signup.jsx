import { Box, Button, FormControl, FormLabel, Input, InputGroup, Text, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { UserAuth } from '../ContextAPI/UserProvider';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export function Signup() {

    const {isAuth} = useContext(UserAuth);
    const navigate = useNavigate();
    const [formdata,setFormdata] = useState({name:"",email:"",password:"",history:[]});
    const toast = useToast()
    const [data,setData]= useState([])
    const [loading,setLoading] = useState(false);

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

    const handleSubmit = (e)=>{
        e.preventDefault();

        let emailFind = data.find((ele)=> ele.email===formdata.email);
        if(emailFind){
            toast({
                position:"bottom",
                status:"error",
                duration: 2000,
                title:"Email Already Exists!!"
            })
            setFormdata({...formdata,email:""})
            return;
        }

        setLoading(true)

        axios.post("https://bmiapi-xflg.onrender.com/users",formdata)
        .then((data)=>{
            toast({
                position:"bottom",
                status:"success",
                duration: 2000,
                title:"Account Created Successfully!!"
            })
            setLoading(false)
            setFormdata({name:"",email:"",password:"",history:[]});
            navigate("/login");

        }).catch((err)=>{
            toast({
                position:"bottom",
                status:"error",
                duration: 2000,
                title:"Something Went Wrong!!"
            })
            setLoading(false)
        })
    }

    return (
        <Box w={{base:'100%',sm:"100%",md:"400px",lg:"400px",xl:"400px"}} m="auto" mt="120px" p="20px" borderRadius="20px">
            <Helmet>
                <title>SignUp | BMI</title>
            </Helmet>
            <h1 style={{textAlign:"center",fontWeight:"bold",
            fontSize:"25px",color:"#00B7FF",
            textShadow:"1px 1px #000"}}>Create Account</h1><br/>

            <form onSubmit={handleSubmit}>
                <FormControl isRequired>

                    <FormLabel>Enter Name</FormLabel>
                    <InputGroup>
                        <Input value={formdata.name} onChange={(e)=> setFormdata({...formdata,name:e.target.value})} border="1px solid #dbdbdb" placeholder="User Kumar" type='text' required />
                    </InputGroup><br/>

                    <FormLabel>Enter Email</FormLabel>
                    <InputGroup>
                        <Input value={formdata.email} onChange={(e)=> setFormdata({...formdata,email:e.target.value})} border="1px solid #dbdbdb" placeholder="user@user.com" type='email' required />
                    </InputGroup><br/>

                    <FormLabel>Enter Password</FormLabel>
                    <InputGroup>
                        <Input value={formdata.password} onChange={(e)=> setFormdata({...formdata,password:e.target.value})} border="1px solid #dbdbdb" placeholder="user@123" type='password' required />
                    </InputGroup><br/>

                    {loading? <Button isLoading _hover={{bg:"#00B7FF"}} color='white' bg="#00B7FF" w="100%">Wait...</Button> : 
                    <Button type='submit' variant="unstyled" bg="#00B7FF" color='white' w="100%">Create...</Button>}
                    
                </FormControl>
            </form>

            <Text mt="10px" textAlign="center" fontWeight="semibold">Existing User? <span style={{color:"#00B7FF",cursor:"pointer"}} onClick={()=> navigate("/login")}>Login</span></Text>
        </Box>
    )
}
