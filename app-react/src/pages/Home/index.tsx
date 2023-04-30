import React, { useEffect, useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Grid, Hidden, TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import { useStyles } from './style'
import {
  EntryDialog,
  EntryList,
  GroupList,
  GroupSelect,
  FAB,
} from '../../components'

import { Entry, Group } from '../../common/Types'
import { ListContext } from '../../contexts/ListContext'
import useHotkeys from '../../hooks/useHotKeys'
import useClipboard from '../../hooks/useClipboard'
import useAPI from '../../hooks/useAPI'

export default function Home() {
  const { fetchEntries } = useAPI()
  const { entries, groups, selectedEntry, selectedGroup } =
    useContext(ListContext)
  const { copyPassword } = useClipboard()

  // 初回のみ実行
  useEffect(() => {
    // エントリ取得
    fetchEntries()

    // 無限ループになるので、空配列のままで
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 検索文字列
  const [searchText, setSearchText] = useState('')
  // ソート項目
  const [sort, setSort] = useState<keyof Entry>('createdAt')

  // 検索文字列から表示するエントリを絞り込み、ソートする
  const visibleEntries = entries
    // グループが選択されている場合は、そのグループのみ表示
    .filter((e) => (selectedGroup ? e.group === selectedGroup : true))
    // 検索文字列が含まれるエントリのみ表示
    .filter((e) => e.title.toLowerCase().includes(searchText))
    // ソート
    .sort((a, b) => (a?.[sort] > b[sort] ? -1 : a[sort] < b[sort] ? 1 : 0))

  // ショートカットキーを登録
  useHotkeys([
    // TODO: エントリ新規作成
    {
      // エントリをクリップボードにコピー
      sequence: 'command+c',
      handler: () => selectedEntry && copyPassword(selectedEntry),
    },
  ])

  return (
    <HomeView
      {...{
        visibleEntries,
        groups,
        searchText,
        sort,
        onChangeSearchField: (value: string) => setSearchText(value),
        onChangeSortSelect: (value: string) => setSort(value as keyof Entry),
      }}
    ></HomeView>
  )
}

interface ViewProps {
  visibleEntries: Entry[]
  groups: Group[]
  searchText: string
  sort: keyof Entry
  onChangeSearchField: (value: string) => void
  onChangeSortSelect: (value: string) => void
}

const HomeView: React.FC<ViewProps> = (props) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Container className="app-content" maxWidth="md">
      <EntryDialog />

      <SearchIcon className={classes.searchIcon} />
      <TextField
        label={t('HOME.SEARCH')}
        margin="dense"
        className={classes.searchField}
        value={props.searchText}
        onChange={({ target: { value } }) => props.onChangeSearchField(value)}
      />

      {/* <MUI.Select
        className={classes.sortField}
        label={t('HOME.SORT')}
        value={props.sort}
        onChange={({ target: { value } }) =>
          props.onChangeSortSelect(value as string)
        }
      >
        <MUI.MenuItem value="createdAt">{t('HOME.CREATED_DATE')}</MUI.MenuItem>
        <MUI.MenuItem value="updatedAt">{t('HOME.UPDATE_DATE')}</MUI.MenuItem>
      </MUI.Select> */}

      <Grid container spacing={3}>
        <Hidden smUp>
          <Grid item xs={12}>
            <GroupSelect />
          </Grid>
        </Hidden>

        <Hidden xsDown>
          <Grid item sm={3}>
            <GroupList groups={props.groups} />
          </Grid>
        </Hidden>

        <Grid item xs={12} sm={9}>
          <EntryList entries={props.visibleEntries} />
        </Grid>
      </Grid>

      <FAB />
    </Container>
  )
}
