import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import theme from 'app/theme'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const CustomCard = styled(Card)`
  && {
    margin: ${theme.spacing.unit * 2}px 0;
    width: 600px;
  
    @media (max-width: 1000px) {
      width: 500px;
    }
  
    @media (max-width: 800px) {
      width: 400px;
    }
  
    @media (max-width: 600px) {
      width: 300px;
    }
  }
`

const CustomContent = styled(Typography)`
  && {
    height: 65px;
    overflow: hidden;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`

const formatDateAndTime = date => {
  const dateFormated = date.split('T').shift().split('-').reverse().join('/')
  const timeFormated = new Date(date).toTimeString().split(' ').shift()

  return `${dateFormated} ${timeFormated}`

}

const PostCard = ({ row: { id, title, content, updatedAt, author } }) => (
  <CustomCard>
    <CardActionArea>
      <CardContent>
        <Typography gutterBottom variant='h5' component='h2' color='primary'>
          { title }
        </Typography>
        <CustomContent gutterBottom component='p'>
         { content }
        </CustomContent>
        <Typography variant='caption'>
         { formatDateAndTime(updatedAt) }
        </Typography>
        <Typography variant='caption' align='right'>
          { author.name }
        </Typography>
      </CardContent>
    </CardActionArea>
  </CustomCard>
)

PostCard.propTypes = {
  row: PropTypes.object.isRequired,
}

export default PostCard