import React from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { Formik, Form as FormikForm, Field as FormikField } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'

import theme from 'app/theme'
import { CREATE_DRAFT, UPDATE_ITEM } from './Mutation'
import GET_ONE_ITEM from './Query'

import MuiAppBar from '@material-ui/core/AppBar'
import MuiTabs from '@material-ui/core/Tabs'
import MuiTab from '@material-ui/core/Tab'
import MuiButton from '@material-ui/core/Button'

import InputField from 'components/atoms/InputField'
import Loading from 'components/atoms/Loading'
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
  id: '',
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

const submit = (mutation, redirectToPublications, msgSucesso) => async ({ id, title, content }, { setSubmitting }) => {
  try {
    await mutation({
      variables:
      {
        id,
        title,
        content
      }
    })

    Alert('success', 'Sucesso', msgSucesso)
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
  const createDraft = useMutation(CREATE_DRAFT);
  const updatePost = useMutation(UPDATE_ITEM);
  const id = history.location.pathname.split('/').pop()
  let result, item, mutation, msgSucesso

  if (id.length >= 25) {
    result = useQuery(GET_ONE_ITEM, { variables: { id }})
    mutation = updatePost
    msgSucesso = 'Item editado com sucesso!'
      
    if (!result || result.loading) return <Loading />
    item = result.data.post
  } else {
    mutation = createDraft
    msgSucesso = 'Rascunho adicionado com sucesso!'
  }

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
            <MuiTab label={`${id.length >= 25 ? 'Editar' : 'Adicionar'} Item`} />
          </MuiTabs>
        </MuiAppBar>
        <TabContainer>
            <Formik
              initialValues={!!item ? item : initialValues}
              validationSchema={validationSchema}
              onSubmit={submit(mutation, redirectToPublications, msgSucesso)}
            > 
            {({ onSubmit }) => (
              <Form>
                <FormFields>
                  <FormikField
                    id='title'
                    required
                    name='title'
                    label='Título'
                    placeholder='Título da Publicação'
                    component={InputField}
                  />
                  <FormikField
                    id='content'
                    required
                    name='content'
                    label='Conteúdo'
                    component={InputField}
                    multiline={true}
                    rows={5}
                    rowsMax={20}
                  />
                </FormFields>
                <CustomButton id='save-draft' type='submit' variant='outlined' color='primary' onClick={onSubmit}>
                  {id.length >= 25 ? 'Editar' : 'Adicionar'}
                </CustomButton>
                <Footer>
                  <CustomButton type='button' color='primary' onClick={redirectToPublications}>
                    Voltar
                  </CustomButton>
                </Footer>
              </Form>
            )}
            </Formik>
        </TabContainer>
      </Paper>
    </CustomFlex>
  )
}

export default NewEditItem
