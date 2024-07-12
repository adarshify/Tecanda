import React, { useEffect, useMemo, useState } from 'react';
import {io} from "socket.io-client";
import { Button , Container, TextField, Typography } from "@mui/material";

const App = () => {

  const socket = useMemo(()=> io("http://localhost:3000"),[]);

  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");


  const handleSubmit = (e) =>{
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  useEffect(()=>{
    socket.on("connect", ()=>{
      console.log("connected", socket.id);
      
    });



      socket.on("receive-message", (data)=>{
              console.log(data);
      });

     socket.on("Welcome", (s)=>{
      console.log(s);
     });

     return () =>{
      socket.disconnect();  
     }

  }, []);




  return  <Container maxWidth= "sm">
    <Typography varient="h1" component="div" gutterBottom>
      
      Welcome to Tecanda!
      </Typography> 
      <form onSubmit={handleSubmit}> 
        <TextField value={message}
        onChange={(e)=>setMessage(e.target.value)} 
        id='outlined-basic'
         label="Wisper"
          variant='outlined'
          />


        <TextField value={message}
        onChange={(e)=>setMessage(e.target.value)} 
        id='outlined-basic'
         label="Shout"
          variant='outlined'
          />
        <Button type='submit' variant='contained' color='primary'>Send</Button>
      </form>
  </Container>
}

export default App