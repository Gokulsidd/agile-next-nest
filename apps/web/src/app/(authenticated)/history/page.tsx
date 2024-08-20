'use client'

import { ClockCircleOutlined } from '@ant-design/icons'
import { Api } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import { useAuthentication } from '@web/modules/authentication'
import { Space, Table, Typography } from 'antd'
import dayjs from 'dayjs'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
const { Title, Text } = Typography

export default function HistoryPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [historyData, setHistoryData] = useState([])

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('User not found, please login.', { variant: 'error' })
      router.push('/home')
      return
    }

    const fetchHistory = async () => {
      try {
        const data = await Api.History.findManyByUserId(userId, {
          includes: ['historyentrys', 'historyentrys.requirement'],
        })
        setHistoryData(data.slice(0, 5)) // Get only the last 5 histories
      } catch (error) {
        enqueueSnackbar('Failed to fetch history data.', { variant: 'error' })
      }
    }

    fetchHistory()
  }, [userId, router])

  const columns = [
    {
      title: 'Date',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: text => <Text>{dayjs(text).format('YYYY-MM-DD HH:mm')}</Text>,
    },
    {
      title: 'Entries',
      dataIndex: 'historyentrys',
      key: 'historyentrys',
      render: historyentrys => (
        <Space direction="vertical">
          {historyentrys?.map(entry => (
            <Text key={entry.id}>
              <ClockCircleOutlined />{' '}
              {entry.timestamp
                ? dayjs(entry.timestamp).format('YYYY-MM-DD HH:mm')
                : 'N/A'}{' '}
              - Requirement: {entry.requirementId}
            </Text>
          ))}
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Title level={2}>History</Title>
      <Text type="secondary">
        Below is the history of the last 5 requests and responses made by you.
      </Text>
      <Table
        dataSource={historyData}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </PageLayout>
  )
}
