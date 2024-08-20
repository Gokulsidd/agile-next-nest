import { Flex, Image, Typography } from 'antd'
import React from 'react'

const { Text, Title } = Typography

type Props = {
  title?: string
  description?: string
}

export const Header: React.FC<Props> = ({
  title = 'Writlix',
  description,
}) => {
  return (
    <>
      <Flex justify="center">
        <Image
          height={100}
          width={100}
          preview={false}
          src="https://writlix-bucket.s3.ap-south-1.amazonaws.com/writlixLogo.jpg"
        />
      </Flex>

      <Flex vertical align="center">
        <Title level={3} style={{ margin: 0 }}>
          {title}
        </Title>
        {description && <Text type="secondary">{description}</Text>}
      </Flex>
    </>
  )
}
