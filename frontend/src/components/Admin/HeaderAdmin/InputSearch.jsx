import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;
export default function InputSearch() {
   const onSearch = value => console.log(value);

   return (
      <Search placeholder="Search" onSearch={onSearch} enterButton style={{width: 300, height: 36}} />
   )
}
