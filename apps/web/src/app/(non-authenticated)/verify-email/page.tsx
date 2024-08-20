'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import styles from './verify-email.module.css'
import { Flex, Image, Typography } from 'antd'
import React from 'react'
import { Api, Model } from '@web/domain'

const VerifyEmail = () => {
  const searchParams = useSearchParams()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<'success' | 'error' | 'invalid' | ''>('')
  const router = useRouter()
  const [redirectCountdown, setRedirectCountdown] = useState(5)

  useEffect(() => {
    const token = searchParams.get('data')

    if (!token) {
      setMessage('Invalid verification link.')
      setLoading(false)
      setStatus('invalid');
      return
    }


    Api.Authentication.verifyEmail(token)
      .then(response => {
        setMessage('Email verified successfully!')
        setStatus('success')

        const countdownInterval = setInterval(() => {
          setRedirectCountdown(prev => {
            if (prev === 1) {
              clearInterval(countdownInterval)
              router.push('/login')
            }
            return prev - 1
          })
        }, 1000)
      })
      .catch(error => {
        if (error.response && error.response.data) {
          setMessage(error.response.data.message)
        } else {
          setMessage('An error occurred during verification.')
        }
        setStatus('error')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [searchParams, router])

  // if (loading) {
  //   return <p className={styles.loading}>Loading...</p>
  // }

  return (
    <div className={styles.container}>
      <Flex justify="center">
        <Image
          height={100}
          width={200}
          preview={false}
          src="https://writlix-bucket.s3.ap-south-1.amazonaws.com/writlixLogo.jpg"
        />
      </Flex>
      {status === 'success' && (
        <div className={`${styles.statusContainer} ${styles.success}`}>
          <div className={styles.icon}>
            {' '}
            <img
              src="/assets/check-solid.svg"
              alt="Success"
              className={styles.icon}
            />
          </div>
          <h1 className={styles.statusMessage}>{message}</h1>
          <p className={styles.redirectMessage}>
            Redirecting you to login in {redirectCountdown}s...
          </p>
        </div>
      )}
      {status === 'error' && (
        <div className={`${styles.statusContainer} ${styles.error}`}>
          <div className={styles.icon}>
            {' '}
            <img
              src="/assets/xmark-solid.svg"
              alt="Error"
              className={styles.icon}
            />
          </div>
          <h1 className={styles.statusMessage}>{message}</h1>
        </div>
      )}
      {status === 'invalid' && (
        <div className={`${styles.statusContainer} ${styles.invalid}`}>
          <div className={styles.icon}>
            {' '}
            <img
              src="/assets/triangle-exclamation-solid.svg"
              alt="Error"
              className={styles.icon}
            />
          </div>
          <h1 className={styles.statusMessage}>{message}</h1>
        </div>
      )}
    </div>
  )
}
export default VerifyEmail
