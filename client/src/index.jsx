/* React Imports */
import ReactDOM from "react-dom";
import * as React from "react";

/* API  Import  (Backend) */
import Axios from 'axios';

/*  Components Imports */
import Stats from './components/stats';
import NotifyButton from './components/notify';


/*  Icon Imports */
import { FaTrashAlt } from 'react-icons/fa';

/* UI Imports */
import {
  ChakraProvider,
  Button,
  useToast,
  Input,
  Divider,
  ContainerTable,
  Container,
  Table,
  Thead,
  Tbody,
  Tr, Th, Td,
  TableCaption,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

const styles = {
  ui: {
    marginTop: "200px",
  },

  stats: {
    marginLeft: "600px",
  },

  addfilebtn: {
    marginLeft: "90px"
  },

  refreshbtn: {
    marginTop: "-40px"
  }
}

const App = (props) => {
  const [files, setFiles] = React.useState([]);
  const [stats, setStats] = React.useState({});
  const [fileinput, setInput] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  React.useEffect(() => {

    Axios.get(`http://localhost:3333/api/getFolders`)
      .then(res => {
        const apidata = res.data;
        setFiles(apidata);
      });

    Axios.get(`http://localhost:3333/api/getStats`)
      .then(res => {
        console.log(res.data);
        setStats(res.data);
      });

  }, [])

  const refreshPage = () => {
    window.location.reload();
  }

  const addFile = () => {
    console.log(fileinput);
    if (fileinput) {
      Axios.post(`http://localhost:3333/api/addfile`, { file: fileinput }).then(function (response) { })
        .catch(function (error) {
          console.log(error);
        });
      window.location.reload();
    }
  }

  const deleteFile = (filename) => {
    Axios.post(`http://localhost:3333/api/deletefile`, { filename: filename }).then(function (response) { })
      .catch(function (error) {
        console.log(error);
      });
    window.location.reload();
  }

  return (
    <div style={styles.ui}>

      <ChakraProvider>
        { /* Header with Stats */}
        <div style={styles.stats}>
          <Stats size={stats.size} count={stats.filecount} />
        </div>

        <Container>
          <Table variant="simple">
            <TableCaption>Coded by ! Alii#0084</TableCaption>
            <Thead>
              <Tr>
                <Th>Filename</Th>
                <Th>Size</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {files.map((file, i) => {
                return (<Tr key={i}><Td>{file.filename}</Td><Td>{file.size}</Td><Td><Button colorScheme="red" onClick={() => deleteFile(file.filename)}> <FaTrashAlt /> </Button></Td></Tr>)
              })}
            </Tbody>
          </Table>


          <Button style={styles.addfilebtn} colorScheme="green" onClick={() => setIsOpen(true)}>
            Add File
          </Button>

          <div style={styles.refreshbtn} onClick={refreshPage}>
            <NotifyButton
              buttontext="Refresh"
              title="Successfully"
              message="The Page was successfully refreshed👍"
              status="warning"
              color="blue"
            />
          </div>

        </Container>

        <br /> <Divider /> {/* Abstand mit Linie */}


        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Add File
              </AlertDialogHeader>

              <AlertDialogBody>
                Don't forget the ending !
                <br /> <Divider />
                <Input placeholder="Filename" onChange={(e) => setInput(e.target.value)} />
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="green" onClick={onClose, addFile} ml={3}>
                  Submit
                </Button>

              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </ChakraProvider>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
