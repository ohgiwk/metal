import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import copy from 'copy-to-clipboard'
import { AppContext } from '../contexts/AppContext'
import { Entry } from '../common/Types'

export const useClipboard = () => {
  const { t } = useTranslation()
  const { setSnackBar } = useContext(AppContext)

  function copyPassword(entry: Entry) {
    copy(entry.password)
    setSnackBar({
      open: true,
      type: 'success',
      message: `「${entry.title}」のパスワードを${t('COPIED')}`,
    })
  }
  return { copyPassword }
}
export default useClipboard
