import { Box,Accordion ,AccordionItem,AccordionIcon,AccordionButton,AccordionPanel, Heading, Text, Image} from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { UserAuth } from '../ContextAPI/UserProvider';
import { CheckCircleIcon, DragHandleIcon } from '@chakra-ui/icons'
import axios from 'axios';
import { Helmet } from 'react-helmet';

export function History() {

    const {user} = useContext(UserAuth);
    const [data,setData]=  useState([]);

    useEffect(()=>{
        if(user && user.id){
            axios.get(`https://bmiapi-xflg.onrender.com/users/${user.id}`)
            .then((res)=>{
                setData(res.data);
            }).catch((err)=>{
                console.log(err);
            })
        }
    },[])

    return (
        <Box w="100%" mt="100px">
            <Helmet>
                <title>History | BMI</title>
            </Helmet>
            <Heading fontSize="25px" textAlign='center' mb="30px">Your Previous History of Calculation</Heading>
            {data.history?.length!==0 ? <Accordion w={{base:'95%',sm:"95%",md:"550px",lg:"550px",xl:"550px"}} m="auto" allowToggle>
                {
                    data.history?.map((ele)=>(
                        <AccordionItem key={ele.date} mb="5px" border="2px solid #F5F5F5" borderRadius="5px">
                            <h2>
                            <AccordionButton bg="#d6d6d6" _hover={{bg:"#d6d6d6"}}>
                                <Box as="span" flex='1' textAlign='left' fontWeight="bold">
                                <CheckCircleIcon /> {ele.date}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>

                            <Text fontWeight='semibold'><DragHandleIcon/> Weight:- <span style={{color:"blue"}}>{ele.weight}KG</span></Text>
                            <Text fontWeight='semibold'><DragHandleIcon/> Height:- <span style={{color:"blue"}}>{ele.height}Feet</span></Text>
                            <Text fontWeight='semibold'><DragHandleIcon/> BMI:- <span style={{color:"blue"}}>{ele.value}kg/m^2</span></Text>
                            <Text fontWeight='semibold'><DragHandleIcon/> Status:- <span style={{color:"blue"}}>{ele.status}</span></Text>

                            </AccordionPanel>
                        </AccordionItem>
                    ))
                }
            </Accordion> : 
            <>
            <Image display="block" m="auto" w="260px" src='https://img.freepik.com/premium-vector/photographer-concept-with-icon-design-vector-illustration_939485-303.jpg?w=360' alt='nothing' />
            <Text textAlign="center" fontWeight="semibold" color="red" mt="15px">You have not done any calculation, please do calculations.</Text>
            </>}
        </Box>
    )
}
