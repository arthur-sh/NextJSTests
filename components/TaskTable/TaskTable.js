import { Button, Checkbox, makeStyles, TextField } from "@material-ui/core"
import { useEffect, useState } from "react"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TaskClient from "../../client/TaskClient";
/*
const rows = [{
    "id": "609ef0213c1bf9548358a374",
    "name": "myTask",
    "description": "Simple Task",
    "done": true
},
{
    "id": "609ef7cd8b54dc27cf3e9eaa",
    "name": "myTask2",
    "description": "Hard Task",
    "done": false
}]*/

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'description', label: 'Description', minWidth: 170, align: 'right', format: (value) => value.toLocaleString('en-US') },
  { id: 'done', label: 'Done', minWidth: 170, align: 'right' }]

const columnsDelete = [{ id: 'name', label: 'Name', minWidth: 170 }, { id: 'delete', label: 'Delete', minWidth: 170 }]

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 440
  }
});

export default function TaskTable() {

  const classes = useStyles()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [rows, setRows] = useState([])
  const [refresh, setRefresh] = useState(0)
  const [edittingState, setEdittingState] = useState(0)

  useEffect(() => {
    TaskClient.getAllTasks().then((res => {
      setRows(res.data)
    }))
  }, [refresh])



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const changeTaskStatus = (taskName) => {
    if (taskName != undefined) {
      TaskClient.changeTaskStatus(taskName)
      setRefresh(refresh + 1)
    }
  }

  const deleteTask = (taskName) => {
    if (taskName != undefined) {
      TaskClient.deleteTask(taskName)
      setRefresh(refresh + 1)
    }
  }

  const createTask = () => {
    const taskName = document.getElementById("taskNameInput").value
    const taskDesc = document.getElementById("taskDescInput").value

    if (taskName && taskDesc) {
      TaskClient.createTask(taskName, taskDesc)
      .then((res => {
        setEdittingState(0)
        setRefresh(refresh + 1)
      }))
        .catch(err => {
          alert('This task name is already in use')
        })

    } else alert(`Tou can't leave any field in blank`)
  }

  return (
    <>
      { edittingState === 2 ?
        <div>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columnsDelete.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columnsDelete.map((column) => {
                        if (column.id === 'name') {
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {row.name}
                            </TableCell>
                          )
                        } else return (
                          <TableCell>
                            <Button variant="contained" color="secondary" onClick={() => deleteTask(row.name)}> Delete </Button>
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" onClick={() => setEdittingState(0)}> Cancel </Button>
        </div> : null
      }

      {
        edittingState === 1 ?
          <div className="container mx-auto px-7 py-3">
            <div>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead></TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Task name</TableCell>
                      <TableCell><TextField id='taskNameInput' /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Task description</TableCell>
                      <TableCell><TextField id='taskDescInput' /></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <Button variant="contained" color="primary" onClick={() => createTask()}> Submit </Button> <Button variant="contained" onClick={() => setEdittingState(0)}> Cancel </Button>
          </div> : null
      }

      {
        edittingState === 0 ?
          <div>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          if (column.id === 'done') {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value === true ?
                                  <Checkbox
                                    defaultChecked
                                    color="primary"
                                    onChange={() => changeTaskStatus(row.name)}
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                  /> : null}
                                {value === false ?
                                  <Checkbox
                                    color="primary"
                                    onChange={() => changeTaskStatus(row.name)}
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                  /> : null}
                              </TableCell>
                            )
                          } else return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <Button variant="contained" color="primary" onClick={() => setEdittingState(1)}> Create task </Button> <Button variant="contained" color="secondary" onClick={() => setEdittingState(2)}> Delete task </Button>
          </div> : null
      }
    </>
  )
}
