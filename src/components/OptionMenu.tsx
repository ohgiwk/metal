import React, { ReactNode, useState, MouseEvent } from 'react'
// prettier-ignore
import { IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

const useStyles = makeStyles(() => ({
  menuItemIcon: { minWidth: '30px' },
}))

const OptionMenu: React.FC<{
  iconSize?: 'small' | 'medium'
  items: { label: string; Icon: ReactNode; onClick: () => void }[]
}> = (props) => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <IconButton onClick={handleClick} size={props.iconSize}>
        <MoreHorizIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {props.items.map((item, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              item.onClick()
              handleClose()
            }}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              {item.Icon}
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              {item.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
export default OptionMenu
