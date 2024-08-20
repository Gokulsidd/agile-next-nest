'use client'

import { ClearOutlined, PlusOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import Pagination from '@mui/material/Pagination'
import { styled } from '@mui/material/styles'
import { useConfiguration } from '@web/core/configuration'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import { useAuthentication } from '@web/modules/authentication'
import { Button, Input, List, Modal, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { PacmanLoader } from 'react-spinners'

const { Title, Text } = Typography

interface RequirementItem {
  id: string
  description: string
  title: string
  dateCreated: string
}

const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    borderRadius: '50%',
    '&.Mui-selected': {
      backgroundColor: 'black',
      color: 'white',
    },
    '&:not(.Mui-selected)': {
      backgroundColor: 'white',
      color: 'black',
    },
  },
}))

export default function RequirementInputPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [requirements, setRequirements] = useState<Model.Requirement[]>([])
  const [requirementsTitle, setRequirementsTitle] = useState('')
  const [newRequirementDesc, setNewRequirementDesc] = useState('')
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const configValue = useConfiguration()

  // // Pagination state
  // const [currentPage, setCurrentPage] = useState(1)
  // const itemsPerPage = configValue.REQUIREMENTS_LIST_COUNT || 5 // Default to 5 if undefined
  // console.log('Items Per Page:', itemsPerPage)
  // // Calculate the user's requirement count from the requirements state
  // const userRequirementCount = requirements?.length
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = configValue.REQUIREMENTS_LIST_COUNT || 10 // Default to 20 if undefined
  console.log('Items Per Page:', itemsPerPage)

  // Calculate the user's requirement count from the requirements state
  const userRequirementCount = requirements?.length

  useEffect(() => {
    const fetchRequirements = async () => {
      if (userId) {
        try {
          const requirementsFound = await Api.Requirement.findManyByUserId(
            userId,
            {
              includes: ['user', 'userstorys.requirement'],
              orders: { dateCreated: 'DESC' },
            },
          )
          setRequirements(requirementsFound)
        } catch (error) {
          enqueueSnackbar('Failed to fetch requirements', { variant: 'error' })
        }
      }
    }

    fetchRequirements()
  }, [userId, enqueueSnackbar, loading])

  const handleCreateRequirement = async () => {
    if (!requirementsTitle) {
      enqueueSnackbar('Title cannot be empty', { variant: 'error' })
      return
    }
    if (!newRequirementDesc) {
      enqueueSnackbar('Description cannot be empty', { variant: 'error' })
      return
    }

    if (userRequirementCount >= configValue?.MAX_REQUIREMENTS) {
      setModalMessage('Please upgrade your plan...!')
      setIsModalVisible(true)
      setRequirementsTitle('')
      setNewRequirementDesc('')
      return
    }

    setLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))

      const aiResponse = await Api.Ai.chat(newRequirementDesc)
      const newRequirement = await Api.Requirement.createOneByUserId(userId, {
        title: requirementsTitle,
        description: aiResponse,
        givenDescription: newRequirementDesc,
      })
      setRequirements([...requirements, newRequirement])

      setRequirementsTitle('')
      setNewRequirementDesc('')
      enqueueSnackbar('Requirement created successfully', {
        variant: 'success',
      })
    } catch (error) {
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const handleViewUserStories = (id: string) => {
    router.push(`/requirements/${id}/user-stories`)
  }

  const handleRegenerateDescription = async (item: Model.Requirement) => {
    try {
      const aiResponse = await Api.Ai.chat(item.description)
      const updatedRequirement = await Api.Requirement.updateOne(item.id, {
        description: aiResponse,
      })
      setRequirements(
        requirements.map(req =>
          req.id === item.id ? updatedRequirement : req,
        ),
      )
      enqueueSnackbar('Requirement description updated successfully', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to update requirement description', {
        variant: 'error',
      })
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const modalTextStyle = css`
    font-size: 18px;
    font-weight: bold;
    color: #333;
    text-align: center;
  `

  const modalFooterStyle = css`
    display: flex;
    justify-content: space-between;
  `

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = requirements.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value)
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Requirement Input</Title>
      <Text type="secondary">
        Enter your high-level requirements to generate user stories.
      </Text>
      <div style={{ position: 'relative', marginTop: 16 }}>
        {loading && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <PacmanLoader color="black" />
            <Text type="secondary" style={{ marginTop: 16 }}>
              Hang on! Our Bots are busy writing the stories for you.
            </Text>
          </div>
        )}
        <Input
          placeholder="Enter requirement title"
          value={requirementsTitle}
          onChange={e => setRequirementsTitle(e.target.value)}
          style={{ marginBottom: 8 }}
          disabled={loading}
        />

        <Input.TextArea
          autoSize={{ minRows: 6, maxRows: 10 }}
          maxLength={500}
          showCount={true}
          placeholder="Enter requirement description"
          value={newRequirementDesc}
          onChange={e => setNewRequirementDesc(e.target.value)}
          disabled={loading}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 25,
            marginBottom: 8,
          }}
        >
          <Button
            icon={<PlusOutlined />}
            onClick={handleCreateRequirement}
            style={{ marginRight: 8 }}
            disabled={loading}
          >
            Generate
          </Button>
          <Button
            icon={<ClearOutlined />}
            onClick={() => {
              setRequirementsTitle('')
              setNewRequirementDesc('')
            }}
            disabled={loading}
          >
            Clear Form
          </Button>
        </div>
      </div>

      <List
        itemLayout="horizontal"
        dataSource={currentItems}
        renderItem={(item: RequirementItem) => (
          <List.Item
            actions={[
              <Text
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {new Date(item.dateCreated).toLocaleString()}
              </Text>,
              <Button
                type="link"
                onClick={() => handleViewUserStories(item.id)}
                disabled={loading}
              >
                View User Stories
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={
                <div
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                  }}
                >
                  {item.title}
                </div>
              }
            />
          </List.Item>
        )}
      />

      {requirements.length > itemsPerPage && (
        <StyledPagination
          count={Math.ceil(requirements.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          style={{
            marginTop: '16px',
            display: 'flex',
            justifyContent: 'center',
          }}
        />
      )}

      <Modal
        title="Requirement Limit Exceeded"
        visible={isModalVisible}
        onCancel={handleCancel}
        centered
        footer={[
          <Button
            key="upgrade"
            style={{ backgroundColor: 'black', color: 'white' }}
            onClick={() => router.push('/upgradeplan')}
          >
            Upgrade Plan
          </Button>,
          <Button
            key="cancel"
            onClick={handleCancel}
            style={{ backgroundColor: 'black', color: 'white' }}
          >
            Cancel
          </Button>,
        ]}
      >
        <p style={modalTextStyle}>Please upgrade your plan.</p>
      </Modal>
    </PageLayout>
  )
}
