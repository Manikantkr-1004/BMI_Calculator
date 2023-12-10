import React, { useContext, useState } from 'react'
import { UserAuth } from '../ContextAPI/UserProvider';
import { Box, Button, Input, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export function Profile() {

    const {user,getUser} = useContext(UserAuth);

    const [check,setCheck] = useState(false)
    const [formdata,setFormdata] = useState({name:user.name,email:user.email,password:user.password});
    let name = user.name?.split(" ").map((ele)=>{return ele[0]}).join("").toUpperCase()
    const toast = useToast()

    const handleUpdate = (e)=>{
        e.preventDefault();

        axios.patch(`https://bmiapi-xflg.onrender.com/users/${user.id}`,formdata)
        .then((res)=>{
            setCheck(!check);
            toast({
                title:"Updated Successfully!!",
                duration:2000,
                position:'bottom',
                isClosable:true,
                status:'success'
            })
            getUser({...formdata,id:user.id,history:user.history});

        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
        <Box mt="120px" w="100%" mb="20px">
            <Helmet>
                <title>Profile | BMI</title>
            </Helmet>
            <Box w={{base:'96%',sm:"350px",md:"350px",lg:"350px",xl:"350px"}} p="30px" borderRadius="20px" border="2px solid #3366CC" bg="#f4f8ff" m="auto">
                <Button display="flex" border="5px solid #3366CC" color="#3366CC"
                 p="60px 20px" borderRadius="50%" m="auto" bg='#fff'
                 fontSize="60px" variant="unstyled">{name}</Button><br/>

                {!check? 
                <>
                <Text textAlign="center" fontWeight="bold" mb="4px">Name:- {user.name}</Text>
                <Text textAlign="center" fontWeight="bold" mb="4px">Email:- {user.email}</Text>
                <Text textAlign="center" fontWeight="bold" mb="10px">Password:- {user.password}</Text></> :

                <form onSubmit={handleUpdate}>
                <Text>Name </Text><Input onChange={(e)=> setFormdata({...formdata,name:e.target.value})} value={formdata.name} type='text' placeholder="name" required/><br/><br/>
                <Text>Email </Text><Input onChange={(e)=> setFormdata({...formdata,email:e.target.value})} value={formdata.email} type='email' placeholder="email" required/><br/><br/>
                <Text>Password </Text><Input onChange={(e)=> setFormdata({...formdata,password:e.target.value})} value={formdata.password} type='password' placeholder="password" required/><br/><br/>
                <Button type='submit' variant="unstyled" display="block" bg="#3366CC" color="white" w="100%" m="auto">Update</Button>
                </form>}

                {!check && <Button onClick={()=> setCheck(!check)} variant="unstyled" display="block" bg="#3366CC" color="white" w="100%" m="auto">Edit Your Profile</Button>}
            </Box>
        </Box>
    )
}
