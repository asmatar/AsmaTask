import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import Searchimg from '@/assets/images/icons/search.svg'
import { useDispatch } from 'react-redux'
import { searchByName } from '@/RTK/reducers/tasksReducer'
const Search = () => {
  const { t } = useTranslation('global')
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(search)
    setSearch(e.target.value)
  }
  useEffect(() => {
    dispatch(searchByName(search))
  }, [search, dispatch])
  return (
    <SearchContainer>
      <SearchBox>
        <Button>
          <Img src={Searchimg} alt="search" />
        </Button>
        <Input
          type="text"
          placeholder={t('search')}
          value={search}
          onChange={(event) => handleSubmit(event)}
        />
      </SearchBox>
    </SearchContainer>
  )
}
export default Search

const SearchContainer = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`
const SearchBox = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;
`
const Input = styled.input`
  box-sizing: border-box;
  height: 50px;
  width: 50px;
  border-style: none;
  padding: 10px;
  font-size: 16px;
  letter-spacing: 2px;
  outline: none;
  border-radius: 100%;
  transition: all 0.5s ease-in-out;
  background-color: #a881ff;
  padding-right: 40px;
  color: ${({ theme }) => theme.colorBlackWhite};
  &::placeholder {
    color: ${({ theme }) => theme.colorBlackWhite};
    font-size: 14px;
    letter-spacing: 2px;
    font-weight: 100;
  }
  &:focus {
    width: 300px;
    border-radius: 0px;
    background-color: transparent;
    border-bottom: 1px solid ${({ theme }) => theme.colorBlackWhite};
    transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
  }
`

const Button = styled.button`
  width: 50px;
  height: 50px;
  border-style: none;
  font-size: 20px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  border-radius: 100%;
  position: absolute;
  right: 0px;
  color: #ffffff;
  background-color: transparent;
  pointer-events: painted;
  &:focus ~ ${Input} {
    width: 300px;
    border-radius: 0px;
    background-color: transparent;
    border-bottom: 1px solid ${({ theme }) => theme.colorBlackWhite};
    transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
  }
`
const Img = styled.img``
