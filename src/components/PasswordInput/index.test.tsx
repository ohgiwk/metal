import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import PasswordInput from '.'
import { IconButton, InputLabel } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

describe('PasswordInput', () => {
  test('Snapshot Test', () => {
    const props = {
      label: 'password',
      value: 'test',
      onChange: () => {},
    }

    const component = renderer.create(<PasswordInput {...props} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('ラベルテキストが正しく表示されているか確認', () => {
    const props = {
      label: 'password',
      value: 'test',
      onChange: () => {},
    }

    // propsを受け取り mount テスト対象component生成
    const wrapper = mount(<PasswordInput {...props} />)

    // { label }にpropsで受け取った値が表示されているか確認
    expect(wrapper.find(InputLabel).text()).toBe(props.label)
  })

  test('onChangeイベントの呼び出し確認', () => {
    const props = {
      label: 'password',
      value: 'test',
      onChange: () => {},
    }

    // onChangeの監視
    const spyOnChange = jest.spyOn(props, 'onChange')

    // propsを受け取り mount テスト対象component生成
    const wrapper = mount(<PasswordInput {...props} />)

    // changeイベント実行
    wrapper.find('input').simulate('change', {
      target: { value: 'test' },
    })

    // spyOnChangeが実行されたか確認
    expect(spyOnChange).toHaveBeenCalled()
  })

  test('クリックして表示切り替え確認', () => {
    const props = {
      label: 'password',
      value: 'test',
      onChange: () => {},
    }

    // propsを受け取り mount テスト対象component生成
    const wrapper = mount(<PasswordInput {...props} />)

    // クリック前、確認
    expect(wrapper.find('input').props().type).toEqual('password')
    expect(wrapper.exists(Visibility)).toBeFalsy()
    expect(wrapper.exists(VisibilityOff)).toBeTruthy()

    // clickイベント実行
    wrapper.find(IconButton).simulate('click')

    // クリック後、確認

    expect(wrapper.find('input').props().type).toEqual('text')
    expect(wrapper.exists(Visibility)).toBeTruthy()
    expect(wrapper.exists(VisibilityOff)).toBeFalsy()
  })
})
