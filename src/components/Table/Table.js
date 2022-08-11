import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv';
import { apiFetch } from '../../API/ApiFetch'
import styles from './Table.module.css'

const HEADERS = [
  { label: "Nombre", key: "name" },
  { label: "Apellido", key: "lastName" },
  { label: "Edad", key: "age" },
  { label: "Genero", key: "gender" },
  { label: "Email", key: "email" },
  { label: "Nacionalidad", key: "nationality" },
  { label: "Foto", key: "picture" }
];

const FILE_NAME = 'JARVIS_USERS.csv'

const Table = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    apiFetch().then(data => {
      setUsers(data.results.sort((a,b) => a.dob['age'] - b.dob['age']).map((user) => ({
        name: user.name['first'],
        lastName: user.name['last'],
        age: user.dob['age'],
        gender: user.gender,
        email: user.email,
        nationality: user.nat,
        picture: user.picture['thumbnail']
      }))
      )})
  }, [])

  function graphRow(user){
    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.lastName}</td>
        <td>{user?.age}</td>
        <td>{user.gender}</td>
        <td className={styles.rowEmail}>{user.email}</td>
        <td>{user.nationality}</td>
        <td>
          <img src={`${user.picture}`} alt="user_picture" />
        </td>
      </tr>
    )
  }

  return (
    <>
      <div style={{overflowX:'auto'}}>
        <table className={styles.tableContainer}>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Genero</th>
            <th>Email</th>
            <th>Nacionalidad</th>
            <th>Foto</th>
          </tr>
          {users.map(
            user => graphRow(user)
          )}
        </table>
      </div>
      {users.length > 0 && (
        <div>
          <CSVLink data={users} filename={FILE_NAME} headers={HEADERS} >Export to CSV</CSVLink>
        </div>
      )}
    </>
  )
}

export default Table