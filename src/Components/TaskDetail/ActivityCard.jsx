import { formatedDate } from '@/Utils/date'
import React from 'react'
/* import { useUserAuth } from '@/Context/authContext' */
import styled from 'styled-components'
const ActivityCard = ({
  author,
  date,
  time,
  activity,
  description,
  activityAuthor,
}) => {
  const activityAuthorInitial = activityAuthor?.charAt(0)

  return (
    <ActivityArticle>
      <Avatar>{activityAuthorInitial}</Avatar>
      <CardInfo>
        <ActivityCardContent>
          <ActivityCardP>
            <ActivityCardSpan>{activityAuthor}</ActivityCardSpan> {activity}
          </ActivityCardP>
          {
            description && (
              <CardDescription key={activity.date}>
                {description}
              </CardDescription>
            )
            /*  <CardDescription>
              je suis la card description, je vais bien, bous ujeghkjf ehbkfb
              jeqhbe fqbleqb hf qeb ilvib qlviub
            </CardDescription> */
          }
          <Date>{time || formatedDate(date)}</Date>
        </ActivityCardContent>
      </CardInfo>
    </ActivityArticle>
  )
}

export default ActivityCard
const CardDescription = styled.p`
  background-color: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 5px 30px 0 rgb(0 0 0 / 10%);
  width: 370px;
`
const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const ActivityArticle = styled.article`
  display: flex;
  align-items: baseline;
  gap: 5px;
`
const ActivityCardP = styled.p`
  color: #828282;
`
const ActivityCardSpan = styled.span`
  font-weight: 600;
  color: #363636;
`
const Date = styled.p`
  font-size: 0.9rem;
  color: #828282;
  &::first-letter {
    text-transform: uppercase;
  }
`
const ActivityCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: #a881ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
`
