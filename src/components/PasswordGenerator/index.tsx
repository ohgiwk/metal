import React, { useState } from 'react'
import * as MUI from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles(() => ({
  pager: {
    background: '#333',
    padding: '1rem',
    width: '100%',
    textAlign: 'center',
  },
  checkboxes: {
    display: 'inline-block',
    margin: '10px 0 0 2rem',
  },
}))

const PasswordGenerator: React.FC<{
  onSubmit: (password: string) => void
}> = (props) => {
  const classes = useStyle()
  const [length, setLength] = useState(16)
  const [useUppercase, setUseUppercase] = useState(true)
  const [useLowercase, setUseLowercase] = useState(true)
  const [useNumber, setUseNumber] = useState(true)

  function shuffle(str: string, length: number) {
    const arr = []
    for (let i = 0; i < length; i++) {
      arr.push(str[Math.floor(Math.random() * str.length)])
    }
    return arr.join('')
  }

  function generate() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    const lowercase = useLowercase ? alphabet : ''
    const uppercase = useUppercase ? alphabet.toUpperCase() : ''
    const numbers = useNumber ? '0123456789' : ''
    const useLetters = `${uppercase}${lowercase}${numbers}`

    const password = shuffle(useLetters, length)
    props.onSubmit(password)
  }

  return (
    <MUI.Paper className={classes.pager}>
      <MUI.TextField
        type="number"
        label="パスワードの長さ"
        value={length}
        margin="dense"
        inputProps={{ min: 0 }}
        onChange={({ target: { value } }) => setLength(Number(value))}
      ></MUI.TextField>
      <div className={classes.checkboxes}>
        <MUI.FormControlLabel
          control={
            <MUI.Checkbox
              name="A-Z"
              checked={useUppercase}
              onChange={({ target: { checked } }) => setUseUppercase(checked)}
            />
          }
          label="A-Z"
        />
        <MUI.FormControlLabel
          control={
            <MUI.Checkbox
              name="a-z"
              checked={useLowercase}
              onChange={({ target: { checked } }) => setUseLowercase(checked)}
            />
          }
          label="a-z"
        />
        <MUI.FormControlLabel
          control={
            <MUI.Checkbox
              name="0-9"
              checked={useNumber}
              onChange={({ target: { checked } }) => setUseNumber(checked)}
            />
          }
          label="0-9"
        />

        <MUI.Button variant="outlined" onClick={generate}>
          適用
        </MUI.Button>
      </div>
    </MUI.Paper>
  )
}

export default PasswordGenerator
