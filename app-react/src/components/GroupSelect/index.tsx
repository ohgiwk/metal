import React, { useContext } from 'react'
import * as MUI from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { ListContext } from '../../contexts/ListContext'

const useStyles = makeStyles(() => ({
  select: { width: '100%' },
}))

const GroupSelect: React.FC<{}> = () => {
  const classes = useStyles()

  const { groups, selectedGroup, setSelectedGroup } = useContext(ListContext)
  const onChangeGroup = (value: number) => setSelectedGroup(groups[value])

  return (
    <MUI.Box p={2} pb={0}>
      <MUI.FormControl className={classes.select}>
        <MUI.InputLabel>グループ</MUI.InputLabel>
        <MUI.Select
          defaultValue={-1}
          value={selectedGroup}
          onChange={({ target: { value } }) => onChangeGroup(Number(value))}
        >
          <MUI.MenuItem value={-1}>ALL</MUI.MenuItem>

          {groups.map((group, i) => (
            <MUI.MenuItem key={i} value={i}>
              {group}
            </MUI.MenuItem>
          ))}
        </MUI.Select>
      </MUI.FormControl>
    </MUI.Box>
  )
}
export default GroupSelect
