import { Box, Button, Flex, FormLabel, Input, Text, useDisclosure } from '@chakra-ui/react'
import { useContext, useState } from 'react';
import { UserAuth } from '../ContextAPI/UserProvider';
import axios from 'axios';
import Cookies from "js-cookie"
import { CmtoF } from '../Components/CmtoF';
import { Helmet } from 'react-helmet';

export function Home() {

    const {isAuth,user} = useContext(UserAuth);
    const [value,setValue] = useState(0);
    const [status,setStatus] = useState("")
    const [formdata,setFormdata] = useState({weight:"",height:""})
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleCalculate= (e)=>{
        e.preventDefault();

        let heightInMeter = (formdata.height*0.3048)**2;
        let bmi = (formdata.weight/heightInMeter).toFixed(1)
        setValue(bmi);

        bmi<18.5 ? setStatus("UnderWeight") : bmi>= 18.5 && bmi<=24.9 ? setStatus("Healthy") : bmi>=25 && bmi<=29.9 ? setStatus("OverWeight") : setStatus("Obese");
        let sta = bmi<18.5 ? "UnderWeight" : bmi>= 18.5 && bmi<=24.9 ? "Healthy" : bmi>=25 && bmi<=29.9 ? "OverWeight" : "Obese";

        if(isAuth){
            let data = {
                date : new Date().toString(),
                weight: formdata.weight,
                height: formdata.height,
                value : bmi,
                status: `Your BMI is ${bmi} kg/m^2 and Your Weight Status is ${sta} .`
            }
            user.history.unshift(data);
            Cookies.set("bmi_auth_user",JSON.stringify(user),{secure:true});

            axios.patch(`https://bmiapi-xflg.onrender.com/users/${user.id}`,user)
            .then((res)=>{
                console.log(res);
            }).catch((err)=>{
                console.log(err);
            })
        }
    }

    const handleReset= ()=>{
        setFormdata({weight:"",height:""});
        setValue(0);
        setStatus("")
    }

    return (
        <Flex mt="100px" w="100%" justifyContent="space-between" direction={{base:'column',sm:"column",md:"row",lg:"row",xl:"row"}}>
            <Helmet>
                <title>BMI Calculator</title>
            </Helmet>
            <Box w="47%"  backgroundImage="https://img.freepik.com/free-vector/tiny-women-near-obese-chart-scales-isolated-flat-vector-illustration-cartoon-female-characters-diet-using-weight-control-with-bmi-body-mass-index-medical-fitness-exercise-concept_74855-10177.jpg?w=740&t=st=1694879878~exp=1694880478~hmac=9731cc64b7dc0a1507b05d3cb326557d3ca5dd7c4c03636ee319c729af396aa7" bgRepeat="no-repeat">

            </Box>
            <Box w={{base:'95%',sm:"95%",md:"47%",lg:"47%",xl:"47%"}} pt="50px" >
                <form onSubmit={handleCalculate} style={{width:"100%",margin:"auto",padding:"20px 20px",marginBottom:"150px"}}>

                    {!isAuth && <Text fontWeight="bold" mb="10px" color="green" fontSize='17px'>To Save Your Calculation in History, Please Login/Signup.</Text>}

                    <FormLabel>Enter Weight(in KG)</FormLabel>
                    <Input value={formdata.weight} onChange={(e)=> setFormdata({...formdata,weight: +e.target.value})} border="1px solid #7e7e7e" placeholder='43 like this' type='number' required/><br/><br/>

                    <FormLabel>Enter Height(in Feet)</FormLabel>
                    <Input value={formdata.height} onChange={(e)=> setFormdata({...formdata,height: +e.target.value})} border="1px solid #7e7e7e" placeholder='5.3 like this' type='number' required />
                    <Text onClick={()=> onOpen()} cursor="pointer" color="#03a0df">Convert Centimeter to Feet, If you Know Your Height in Centimeter Only.</Text><br/>

                    <Button type='submit' variant="unstyled" color="white" bg="#00B7FF" w="100%">Calculate BMI</Button>

                    {value!==0 && <Button onClick={handleReset} mt="5px" variant="unstyled" color="white" bg="#808080" w="100%">RESET</Button>}

                    {value!==0 && <Text fontSize="20px" mt="5px" textAlign="justify" fontWeight="semibold">Your BMI is 
                    <span style={{color:status==="UnderWeight"?"#dfab00":status==="Healthy"?"green":status==="OverWeight"?"red":"red"}}> {value} kg/m^2 </span> 
                    and Your Weight Status is 
                    <span style={{color:status==="UnderWeight"?"#dfab00":status==="Healthy"?"green":status==="OverWeight"?"red":"red"}}> {status} </span>.</Text>}

                </form>
            </Box>
            <CmtoF isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
        </Flex>
    )
}
