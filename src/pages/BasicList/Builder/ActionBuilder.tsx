/*
 * 2022/5/23 22:06
 * author: francesca
 * email: 1549465329@qq.com
 */
import {Button} from 'antd';
import type {ButtonType} from 'antd/lib/button';

const ActionBuilder = (actions: BasicApi.Action[] | undefined) => {
  return (actions || []).map((action) => {
    if (action.component === 'button') {
      return <Button key={action.text} type={action.type as ButtonType}>{action.text}</Button>;
    }
    return null;
  });
};
export default ActionBuilder;
