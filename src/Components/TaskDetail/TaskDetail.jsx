import React, { useContext, useRef, useState } from 'react'
import styled from 'styled-components'
import Rename from '@/assets/images/icons/rename.svg'
import Description from '@/assets/images/icons/description.svg'
import Activity from '@/assets/images/icons/activity.svg'
import useLocalStorage from '@/Hooks/useLocalStorage'
import { ModalContext } from '@/Context/ModalContext'
import {
  deleteTaskFromFirebase,
  updateTitleFromFirebase,
  updateDescriptionFromFirebase,
} from '@/Services/API-firebase'
import { useTranslation } from 'react-i18next'
import ActivityCard from './ActivityCard'
import GeneralButton from '@/Components/UI/GeneralButton'
import { formatedDate } from '@/Utils/date'
import { useUserAuth } from '@/Context/authContext'

const TaskDetail = ({
  title,
  id,
  boardId,
  status,
  author,
  date,
  activities,
}) => {
  const [titleTask, setTitle] = useState(title)
  const [descriptionArea, setDescriptionArea] = useState('')
  const [value] = useLocalStorage('theme', `light`)
  const { close } = useContext(ModalContext)
  const formRef = useRef(null)
  const { t } = useTranslation('global')
  const {
    user: { displayName },
  } = useUserAuth()
  const activityAuthor = displayName
  const activity = activities.map((activity) => {
    console.log('task detail task', activity)
    return (
      <ActivityCard
        key={formatedDate(date)}
        author={author}
        date={date}
        activity={activity.activity}
        time={formatedDate(date)}
        description={activity.description}
        activityAuthor={activity.activityAuthor}
      />
    )
  })
  return (
    <TaskDetailContainer>
      <Header>
        <HeaderImg src={Rename} alt="rename a task" />
        <HeaderContent>
          <FormTitle
            onSubmit={(e) => {
              e.preventDefault()
              updateTitleFromFirebase(
                id,
                boardId,
                titleTask,
                activityAuthor,
                value
              )
            }}
            ref={formRef}
          >
            <Input
              type="text"
              value={titleTask}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormTitle>
          <HeaderContentSpan>
            {t('inList')} {status}
          </HeaderContentSpan>
        </HeaderContent>
      </Header>
      <DescriptionPart>
        <DescriptionSide>
          <HeaderImg src={Description} alt="description icon" />
          <Div>
            <H3>{t('description')}</H3>
            <TextArea
              name=""
              id=""
              cols="50"
              rows="6"
              placeholder="Add a description"
              value={descriptionArea}
              onChange={(e) => setDescriptionArea(e.target.value)}
            ></TextArea>
            <Cta>
              <GeneralButton
                onClick={() => {
                  updateDescriptionFromFirebase(
                    id,
                    boardId,
                    descriptionArea,
                    activityAuthor,
                    value
                  )
                  setDescriptionArea('')
                }}
              >
                {t('save')}
              </GeneralButton>
              <GeneralButton onClick={close}>Cancel</GeneralButton>
            </Cta>
          </Div>
        </DescriptionSide>
        <Div>
          <H4>{t('action')}</H4>

          <GeneralButton
            onClick={() => deleteTaskFromFirebase(id, boardId, value)}
          >
            {t('delete')}
          </GeneralButton>
        </Div>
      </DescriptionPart>
      <Activities>
        <HeaderImg src={Activity} alt="activity icon" />
        <ActivityContainer>
          <H3>{t('activities')}</H3>
          <ActivitiesContainer>{activity}</ActivitiesContainer>
        </ActivityContainer>
      </Activities>
    </TaskDetailContainer>
  )
}
export default TaskDetail
const ActivityContainer = styled.div``
const ActivitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 250px;
  overflow-y: auto;
`
const TaskDetailContainer = styled.article`
  padding: 25px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow:
    rgba(0, 0, 0, 0.04) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`
const Header = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`
const HeaderImg = styled.img``
const HeaderContent = styled.div``
/* const H2 = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 7px;
` */
const HeaderContentSpan = styled.span`
  font-size: 0.9rem;
  color: #828282;
`
const DescriptionPart = styled.div`
  display: flex;
  gap: 30px;
`
const DescriptionSide = styled(Header)``
const Activities = styled(Header)``
const H3 = styled.h3`
  font-size: 1.15rem;
  margin-bottom: 10px;
  &::first-letter {
    text-transform: uppercase;
  }
`
const H4 = styled.h4`
  margin-bottom: 10px;
`
const TextArea = styled.textarea`
  resize: none;
  background-color: white;
  border-radius: 4px;
  outline: none;
  border: none;
  padding: 15px;
  margin-bottom: 10px;
`
const Cta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const Div = styled.div``
const Input = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  width: max-content;
  font-size: 1.3rem;
  margin-bottom: 7px;
  display: block;
`
const FormTitle = styled.form``
