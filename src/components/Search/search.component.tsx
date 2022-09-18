import { FC, ChangeEventHandler } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Search as SearchComponent, SearchIconWrapper, StyledInputBase } from './styles';

interface Props {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const Search: FC<Props> = ({ value, onChange }) => (
  <SearchComponent>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase value={value} onChange={onChange} placeholder='Поиск' />
  </SearchComponent>
);
