import { Box, Button, Flex, Image, Text,Menu,MenuButton,MenuList,MenuItem } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import logo from "./bmi-logo.png"
import { useContext } from 'react'
import { UserAuth } from '../ContextAPI/UserProvider'
import { ArrowRightIcon, ChevronRightIcon, RepeatClockIcon } from '@chakra-ui/icons'

export function Navbar() {

    const navigate = useNavigate()
    const {isAuth,user,logout} = useContext(UserAuth);

    let name = user.name?.split(" ").map((ele)=>{return ele[0]}).join("").toUpperCase()
    

    return (
        <Flex w="100%" justifyContent="space-between" alignItems="center"
        bg="#00b7ff" position="fixed" top="0" zIndex="9999"
        p="0px 30px" h="60px" boxShadow="inset 0px 0px 28px 2px #fff">
            <Image onClick={()=> navigate("/")} cursor="pointer" w="100px" src={logo} alt='logo' />

            {isAuth && <Box display="flex" justifyContent={{base:'flex-end',sm:"flex-end",md:"space-between",lg:"space-between",xl:"space-between"}} alignItems="center"
            w="300px" >

                <Menu>
                    <MenuButton bg="#3366CC" color="white" p="9px" 
                    borderRadius="50%" fontWeight="bold">{name}</MenuButton>
                    <MenuList>
                        <MenuItem fontWeight="semibold">Hi, {user.name}</MenuItem>
                        <MenuItem onClick={()=> navigate("/profile")}><ChevronRightIcon boxSize={5}/> Profile</MenuItem>
                        <MenuItem onClick={()=> navigate("/history")}><RepeatClockIcon/> History</MenuItem>
                        {!isAuth && <MenuItem onClick={()=> navigate("/login")}><ChevronRightIcon boxSize={5}/> Login/Signup</MenuItem>}
                        {isAuth && <MenuItem onClick={()=> logout()}><ChevronRightIcon boxSize={5}/> Logout</MenuItem>}
                    </MenuList>
                </Menu>

                {isAuth && <Text display={{base:'none',sm:"none",md:"block",lg:"block",xl:"block"}} onClick={()=> navigate("/history")} cursor="pointer" color='#3366CC' fontWeight="bold"><RepeatClockIcon/> History</Text>}

                {!isAuth? <Button display={{base:'none',sm:"none",md:"block",lg:"block",xl:"block"}} onClick={()=> navigate("/login")} color="#3366CC" p="0px 8px" bg="#fff" border="3px solid #3366CC">Login/SignUp</Button> : 
                <Button display={{base:'none',sm:"none",md:"block",lg:"block",xl:"block"}} onClick={()=> logout()} color="#3366CC" p="0px 8px" bg="#fff" border="3px solid #3366CC">Logout</Button>}

            </Box>}

            {!isAuth && <Button onClick={()=> navigate("/login")} color="#3366CC" p="0px 8px" bg="#fff" border="3px solid #3366CC">Login/SignUp</Button>}
            
        </Flex>
    )
}
