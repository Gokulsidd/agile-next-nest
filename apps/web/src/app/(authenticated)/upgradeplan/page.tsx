
'use client'

import { PageLayout } from '@web/layouts/Page.layout'
import { Button, Card, Col, List, Row, Typography } from 'antd'

const { Title } = Typography

const plans = [
     {
          title: 'Basic',
          benefits: [
               'Benefit 1 of Basic Plan',
               'Benefit 2 of Basic Plan',
               'Benefit 3 of Basic Plan',
          ],
          price: '$1'
     },
     {
          title: 'Standard',
          benefits: [
               'Benefit 1 of Standard Plan',
               'Benefit 2 of Standard Plan',
               'Benefit 3 of Standard Plan',
          ],
          price: '$3'
     },
     {
          title: 'Premium',
          benefits: [
               'Benefit 1 of Premium Plan',
               'Benefit 2 of Premium Plan',
               'Benefit 3 of Premium Plan',
          ],
          price: '$5'
     },
]

const PlanPage = () => {
     return (
          <PageLayout layout="full-width">
               <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
                    Choose Your Plan
               </Title>
               <Row gutter={[24, 24]} justify="center">
                    {plans.map((plan, index) => (
                         <Col xs={24} sm={12} md={8} key={index}>
                              <Card style={{
                                   border: '1px solid #d9d9d9',
                                   borderRadius: '8px',
                                   textAlign: 'left',
                                   marginBottom: '24px',
                                   display: 'flex',
                                   flexDirection: 'column',
                                   alignItems: 'left',
                                   padding: '16px'
                              }}>
                                   <Title level={4} style={{ textAlign: 'center' }}>{plan.title}</Title>
                                   <Title level={5} style={{ textAlign: 'center', margin: '16px 0' }}>{plan.price} / month</Title>
                                   <List
                                        dataSource={plan.benefits}
                                        renderItem={(benefit, idx) => (
                                             <List.Item>
                                                  <List.Item.Meta
                                                       title={<span style={{ alignItems: "left", fontWeight: 400 }}>{idx + 1}. {benefit}</span>}
                                                  />
                                             </List.Item>
                                        )}
                                   />
                                   <Button style={{
                                        backgroundColor: 'black',
                                        color: 'white',
                                        marginTop: '16px',
                                        width: '30%',
                                        border: 'none',
                                        textAlign: 'center',
                                        marginLeft:'35%'
                                        
                                   }}>
                                        Buy
                                   </Button>
                              </Card>
                         </Col>
                    ))}
               </Row>
          </PageLayout>
     )
}

export default PlanPage
