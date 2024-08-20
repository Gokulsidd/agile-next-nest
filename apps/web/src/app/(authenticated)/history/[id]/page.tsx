'use client'

import { useEffect, useState } from 'react'
import { Typography, Descriptions, Spin, Button } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HistoryDetailPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const { enqueueSnackbar } = useSnackbar()
  const [history, setHistory] = useState<Model.History | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const fetchedHistory = await Api.History.findOne(params.id, {
          includes: ['user', 'historyentrys', 'historyentrys.requirement'],
        })
        setHistory(fetchedHistory)
      } catch (error) {
        enqueueSnackbar('Failed to fetch history details', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchHistory()
    }
  }, [params.id])

  return (
    <PageLayout layout="full-width">
      <Title level={2}>History Detail</Title>
      <Text type="secondary">Detailed view of a specific history entry.</Text>

      {loading ? (
        <Spin size="large" />
      ) : history ? (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="User">
            {history.user?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Date Created">
            {dayjs(history.dateCreated).format('YYYY-MM-DD HH:mm')}
          </Descriptions.Item>
          <Descriptions.Item label="Entries">
            {history.historyentrys?.map((entry, index) => (
              <div key={index}>
                <Text>{dayjs(entry.timestamp).format('YYYY-MM-DD HH:mm')}</Text>
                <Text> - {entry.requirement?.description}</Text>
              </div>
            ))}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <Text>History not found.</Text>
      )}

      <Button
        type="primary"
        onClick={() => router.push('/history')}
        icon={<ClockCircleOutlined />}
      >
        Back to History
      </Button>
    </PageLayout>
  )
}
