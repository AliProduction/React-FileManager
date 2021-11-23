/* React Imports */
import * as React from "react";
import { useToast, Button } from "@chakra-ui/react";


export default function NotifyButton(props) {
   /* ["success", "error", "warning", "info"] */
   const toast = useToast();
   return (
     <Button 
       colorScheme={props.color}
       onClick={() =>
         toast({
           title: props.title,
           description: props.message,
           status: props.status,
           duration: 9000,
           isClosable: true,
         })
       }
     >
       {props.buttontext}
     </Button>
   );
 }