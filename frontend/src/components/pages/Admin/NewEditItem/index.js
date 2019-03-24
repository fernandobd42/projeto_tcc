import React from 'react'
import { Mutation } from 'react-apollo'
import { Formik, Form as FormikForm, Field as FormikField } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'

import CREATE_DRAFT from './Mutation'

import theme from 'app/theme'

import MuiAppBar from '@material-ui/core/AppBar'
import MuiTabs from '@material-ui/core/Tabs'
import MuiTab from '@material-ui/core/Tab'
import MuiButton from '@material-ui/core/Button'

import InputField from 'components/atoms/InputField'
import Flex from 'components/atoms/Flex'
import Paper from 'components/atoms/Paper'
import Alert from 'components/atoms/Alert'
import TabContainer from 'components/atoms/TabContainer'

const CustomFlex = styled(Flex)`
  && {
   max-height: 100vh;
  }
`

const Form = styled(FormikForm)`
  && {
    width: 100%;
    padding: ${theme.spacing.unit * 2}px;
  }
`

const FormFields = styled.div`
  && {
    margin-bottom: ${theme.spacing.unit * 4}px;
  }
`

const CustomButton = styled(MuiButton)`
  && {
    width: 100%;
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${theme.spacing.unit * 3}px;
`

const initialValues = {
  title: '',
  content: '',
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Título é obrigatório')
    .min(6, 'Título deve ter no mínimo 6 caracteres'),
  content: Yup.string()
    .required('Conteúdo é obrigatório')
    .min(50, 'Conteúdo deve ter no mínimo 50 caracteres'),
})

const submit = (mutation, redirectToPublications) => async ({ title, content}, { setSubmitting }) => {
  try {
    await mutation({
      variables:
      {
        title,
        content
      }
    })

    Alert('success', 'Sucesso', 'Rascunho adicionado com sucesso!')
    redirectToPublications()
  } catch (error) {
    if (!!error.networkError) {
      Alert('error', 'Error', 'Servidor fora do ar!')
    }
  }
  
  setSubmitting(false)
}

const NewEditItem = ({ history }) => {
  const redirectToPublications= () => history.push('/admin/publications')

  return (
    <CustomFlex direction='column' justify='start' height='auto'>
      <Paper elevation={7}> 
        <MuiAppBar position='static' color='default'>
          <MuiTabs
            value={0}
            indicatorColor='primary'
            textColor='primary'
            variant='fullWidth'
          >
            <MuiTab label='Adicionar Item' />
          </MuiTabs>
        </MuiAppBar>
        <TabContainer dir={theme.direction}>
          <Mutation mutation={CREATE_DRAFT}>
            {(createDraft, { loading }) => (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={submit(createDraft, redirectToPublications)}
            > 
            {({ onSubmit }) => (
              <Form>
                <FormFields>
                  <FormikField
                    required
                    name='title'
                    label='Título'
                    placeholder='Título da Publicação'
                    component={InputField}
                  />
                  <FormikField
                    required
                    name='content'
                    label='Conteúdo'
                    component={InputField}
                    multiline={true}
                    rows={5}
                    rowsMax={20}
                  />
                </FormFields>
                <CustomButton type='submit' variant='outlined' color='primary' disabled={loading} onClick={onSubmit}>
                  Adicionar
                </CustomButton>
                <Footer>
                  <CustomButton type='button' color='primary' onClick={() => redirectToPublications()}>
                    Voltar
                  </CustomButton>
                </Footer>
              </Form>
            )}
            </Formik>
          )}
          </Mutation>
        </TabContainer>
      </Paper>
    </CustomFlex>
  )
}

export default NewEditItem
