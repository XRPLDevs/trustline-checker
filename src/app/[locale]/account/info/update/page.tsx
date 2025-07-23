'use client'

import { useTranslations } from 'next-intl'
import { XummSdkJwt } from 'xumm-sdk'
import { toast } from 'sonner'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button'
import { typography } from '@/components/Typography'
import { useRequestAccountInfo } from '@/hooks'
import { z } from 'zod'
import { stringToHex } from '@/utils/string'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@heroui/modal'
import { toastConfig } from '@/config/site'
import type { AccountSet } from 'xrpl'
import type { AccountInfoRes } from '@/app/api/xrpl/request/account-info/schema'

type AccountRoot = AccountInfoRes['root'] | null

const schema = z.object({
  domain: z
    .string()
    .max(256, { message: 'Maximum length is 256 bytes.' })
    .regex(/^[a-z0-9.-]*$/, {
      message:
        'Only lowercase ASCII letters, numbers, hyphens, and dots are allowed.'
    })
})

export default function AccountInfoUpdate() {
  const tPage = useTranslations('AccountInfoUpdatePage')
  const t = useTranslations('AccountInfoUpdate')

  const [accRoot, setAccRoot] = useState<AccountRoot>(null)
  const [payload, setPayload] = useState<{
    isReady: boolean
    qrCode: string
    nextAlways: string
  }>({
    isReady: false,
    qrCode: '',
    nextAlways: ''
  })

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data: accountInfo, refetch } = useRequestAccountInfo()

  useEffect(() => {
    if (accountInfo) {
      setAccRoot(accountInfo.root)
    }
  }, [accountInfo])

  const form = useForm({
    defaultValues: {
      domain: accRoot?.domain ?? ''
    },
    validators: {
      onSubmit: schema
    },
    onSubmit: async ({ value }) => {
      try {
        const strageJwt = localStorage.getItem('XummPkceJwt')
        const json = JSON.parse(strageJwt ?? '{}')
        const { jwt, me } = json

        if (!jwt || !me) {
          throw new Error('JWT is not valid')
        }

        const xumm = new XummSdkJwt(jwt)

        const params: AccountSet = {
          TransactionType: 'AccountSet',
          Account: me.sub,
          Domain: stringToHex(value.domain)
        }

        const payload = await xumm.payload.createAndSubscribe(
          params,
          ({ data }) => {
            const isSignedEvent = 'signed' in data

            if (isSignedEvent) {
              const isSigned = data.signed
              if (isSigned) {
                refetch()
                onClose()
                setPayload({
                  isReady: false,
                  qrCode: '',
                  nextAlways: ''
                })
                toast.success(t('toast.success.title'), {
                  description: t('toast.success.description'),
                  ...toastConfig
                })
              } else {
                onClose()
                setPayload({
                  isReady: false,
                  qrCode: '',
                  nextAlways: ''
                })
                toast.error(t('toast.error.title'), {
                  description: t('toast.error.description'),
                  ...toastConfig
                })
              }
            }
          }
        )

        setPayload({
          isReady: true,
          qrCode: payload.created.refs.qr_png,
          nextAlways: payload.created.next.no_push_msg_received ?? ''
        })

        onOpen()
      } catch (error) {
        console.error('error: ', error)
        toast.error('Failed', {
          description: 'Transaction failed.',
          ...toastConfig
        })
      }
    }
  })

  return (
    <div className="container flex flex-col gap-10 mx-auto max-w-xl">
      <h1 className={typography({ heading: 'pageTitle' })}>{tPage('title')}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <div className="grid grid-flow-col grid-rows-2 gap-4">
          <div className="grid grid-cols-6 gap-2 items-center">
            <div className="col-span-2">
              <p className={typography({ heading: 'h6' })}>Domain</p>
            </div>
            <div className="col-span-4">
              <form.Field
                name="domain"
                children={(field) => (
                  <Input
                    placeholder="example.com"
                    value={field.state.value}
                    isInvalid={!!field.state.meta.errors?.[0]}
                    errorMessage={field.state.meta.errors?.[0]?.message}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button color="primary" onPress={() => form.handleSubmit()}>
              {t('form.button')}
            </Button>
          </div>
        </div>
      </form>

      <Modal isOpen={isOpen} hideCloseButton size="sm">
        <ModalContent>
          <ModalHeader className="flex justify-center">
            <h2 className={typography({ heading: 'h6' })}>
              {t('modal.title')}
            </h2>
          </ModalHeader>
          <ModalBody>
            {payload.isReady ? (
              <div className="flex justify-center">
                <Image
                  src={payload.qrCode}
                  alt="QR Code"
                  width={200}
                  height={200}
                />
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </ModalBody>
          <ModalFooter className="flex justify-center gap-4">
            <Button
              color="primary"
              onPress={() => {
                window.open(payload.nextAlways, '_blank')
              }}
            >
              {t('modal.button')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
