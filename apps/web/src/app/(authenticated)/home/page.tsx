'use client'

import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Typography, Space } from 'antd'
import {
  UserOutlined,
  HistoryOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('User not found, please login.', { variant: 'error' })
      return
    }

    Api.User.findOne(userId, {
      includes: ['notifications', 'requirements', 'historys'],
    })
      .then(setUser)
      .catch(() =>
        enqueueSnackbar('Failed to fetch user data.', { variant: 'error' }),
      )
  }, [userId])

  const navigateTo = path => {
    router.push(path)
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center">
        <Col span={24}>
          <Title level={2}>Welcome to the Dashboard</Title>
          <Text>
            Welcome {user?.name || 'User'}, manage your tasks efficiently.
          </Text>
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            hoverable
            onClick={() => navigateTo('/requirements')}
            title="Input Requirements"
            bordered={false}
            actions={[<FileTextOutlined key="input" />]}
          >
            <Text>Input new requirements for your projects.</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            hoverable
            onClick={() => navigateTo('/history')}
            title="View History"
            bordered={false}
            actions={[<HistoryOutlined key="history" />]}
          >
            <Text>View the history of all your activities and changes.</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            hoverable
            onClick={() => {
              if (user?.requirements?.length > 0) {
                navigateTo(
                  `/requirements/${user.requirements[0].id}/user-stories`,
                )
              } else {
                enqueueSnackbar(
                  'No requirements found to generate user stories.',
                  { variant: 'info' },
                )
              }
            }}
            title="Generate User Stories"
            bordered={false}
            actions={[<UserOutlined key="userstory" />]}
          >
            <Text>
              Generate and manage user stories based on your requirements.
            </Text>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
