import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import * as MUI from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder'
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial'

import OptionMenu from './OptionMenu'
import DeleteIcon from '@material-ui/icons/Delete'

import { ListContext } from '../contexts/ListContext'

const GroupList: React.FC<{}> = () => {
  const { t } = useTranslation()

  const {
    groups,
    setSelectedEntry,
    selectedGroup,
    setSelectedGroup,
  } = useContext(ListContext)

  return (
    <MUI.List
      dense
      subheader={<MUI.ListSubheader>{t('HOME.GROUPS')}</MUI.ListSubheader>}
    >
      <MUI.ListItem
        button
        selected={!selectedGroup}
        onClick={() => {
          setSelectedGroup(undefined)
        }}
      >
        <MUI.ListItemIcon>
          <FolderSpecialIcon />
        </MUI.ListItemIcon>
        <MUI.ListItemText primary="ALL" />
      </MUI.ListItem>
      {groups.map((group, i) => (
        <React.Fragment key={i}>
          <MUI.ListItem
            button
            selected={selectedGroup?.id === group.id}
            onClick={() => {
              setSelectedGroup(group)
              setSelectedEntry(undefined)

              // const arr = [...groupOpens]
              // arr[i] = !arr[i]
              // setGroupOpens(arr)
            }}
          >
            <MUI.ListItemIcon>
              <FolderIcon />
            </MUI.ListItemIcon>
            <MUI.ListItemText primary={group.name} />

            {selectedGroup?.id === group.id && (
              <MUI.ListItemSecondaryAction>
                <OptionMenu
                  items={[
                    {
                      label: 'Delete Group',
                      Icon: <DeleteIcon />,
                      onClick: () => {},
                    },
                  ]}
                />
              </MUI.ListItemSecondaryAction>
            )}
          </MUI.ListItem>

          {/*<MUI.Collapse in={groupOpens[i]} timeout="auto" unmountOnExit>
              <MUI.List component="div" disablePadding>
                 {group.entries.map((entry, j) => (
                      <EntryListItem
                        key={j}
                        entry={entry}
                        index={i}
                        selected={selectedIndex === i}
                        className={classes.nested}
                      />
                    ))}
              </MUI.List>
            </MUI.Collapse>*/}
        </React.Fragment>
      ))}
    </MUI.List>
  )
}

export default GroupList
