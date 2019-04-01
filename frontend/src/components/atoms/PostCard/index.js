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

const PostCard = ({ title, content, date }) => (
  <CustomCard>
    <CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" color="primary">
          { title }
        </Typography>
        <CustomContent gutterBottom component="p">
         { content }
        </CustomContent>
        <Typography variant="caption">
         { date }
        </Typography>
      </CardContent>
    </CardActionArea>
  </CustomCard>
)

PostCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
}

export default PostCard