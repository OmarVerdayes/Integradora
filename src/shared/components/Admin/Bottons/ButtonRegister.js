import React from 'react'
import { Button } from 'react-bootstrap'

export default function ButtonRegister() {
  return (
    <>
      <Button style={styles.Button}>Registrar</Button>{' '}
    </>
  )
}

const styles = {
    Button: {
        background: '#4AAC27',
        color: 'black',
        width: '10%',
        height: '40px',
        borderRadius: '5px',
        border: 'none',
        float: 'right',
        marginRight: "30px",
        marginTop: "30px",
    }
}
