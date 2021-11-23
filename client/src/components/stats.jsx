/* React Imports */
import ReactDOM from "react-dom";
import * as React from "react";
import {
   Stat,
   StatLabel,
   StatNumber,
   StatGroup,
} from "@chakra-ui/react";


export default function Stats(props) {
   return (
   <StatGroup>

      <Stat>
         <StatLabel>Files</StatLabel>
         <StatNumber>{props.count}</StatNumber>
      </Stat>
      
      <Stat>
         <StatLabel>File Sizes</StatLabel>
         <StatNumber>{props.size} byte</StatNumber>
      </Stat>

   </StatGroup>
   );
 }