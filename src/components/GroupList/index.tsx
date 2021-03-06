import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  ListSubheader,
} from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder'
import DeleteIcon from '@material-ui/icons/Delete'
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial'

import OptionMenu from '../OptionMenu'
import { ListContext } from '../../contexts/ListContext'

const GroupList: React.FC<{}> = () => {
  const { t } = useTranslation()

  const {
    groups,
    setSelectedEntry,
    selectedGroup,
    setSelectedGroup,
  } = useContext(ListContext)

  return (
    <List dense subheader={<ListSubheader>{t('HOME.GROUPS')}</ListSubheader>}>
      <ListItem
        button
        selected={!selectedGroup}
        onClick={() => {
          setSelectedGroup(undefined)
        }}
      >
        <ListItemIcon>
          <FolderSpecialIcon />
        </ListItemIcon>
        <ListItemText primary="ALL" />
      </ListItem>
      {groups.map((group, i) => (
        <React.Fragment key={i}>
          <ListItem
            button
            selected={selectedGroup?.id === group.id}
            onClick={() => {
              setSelectedGroup(group)
              setSelectedEntry(undefined)
            }}
          >
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary={group.name} />

            {selectedGroup?.id === group.id && (
              <ListItemSecondaryAction>
                <OptionMenu
                  iconSize="small"
                  items={[
                    {
                      label: 'Delete Group',
                      Icon: <DeleteIcon />,
                      onClick: () => {},
                    },
                  ]}
                />
              </ListItemSecondaryAction>
            )}
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  )
}

export default GroupList
