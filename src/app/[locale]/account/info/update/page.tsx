'use client'

import { XummSdkJwt } from 'xumm-sdk'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button'
import { typography } from '@/components/Typography'
import { useRequestAccountInfo } from '@/hooks'
import { z } from 'zod'
import type { AccountSet } from 'xrpl'
import type { AccountInfoRes } from '@/app/api/xrpl/request/account-info/schema'
import { stringToHex } from '@/utils/string'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@heroui/modal'

type AccountRoot = AccountInfoRes['root'] | null

type SetAccountForm = {
  domain: string
}

const schema = z.object({
  domain: z.string()
})

export default function AccountInfoUpdate() {
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

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const { data: accountInfo } = useRequestAccountInfo()

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

        const jwt = json.jwt
        const me = json.me

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
          (event) => {
            console.log('event: ', event)
            const { data } = event

            const isSignedEvent = 'signed' in data

            if (isSignedEvent) {
              const isSigned = data.signed
              if (isSigned) {
                console.log('送信されました: ', data.signed)
                onClose()
              } else {
                console.log('キャンセルされました')
                onClose()
              }
            }
          }
        )
        console.log('payload: ', payload)
        console.log('payload.meta: ', payload.created.refs.qr_png)

        setPayload({
          isReady: true,
          qrCode: payload.created.refs.qr_png,
          nextAlways: payload.created.next.no_push_msg_received ?? ''
        })

        onOpen()
      } catch (error) {
        console.error('error: ', error)
      }
    }
  })

  return (
    <div className="container flex flex-col gap-10 mx-auto max-w-xl">
      <h1 className={typography({ heading: 'pageTitle' })}>アカウント設定</h1>
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
              送信
            </Button>
          </div>
        </div>
      </form>

      <Modal isOpen={isOpen} hideCloseButton size="sm">
        <ModalContent>
          <ModalHeader className="flex justify-center">
            <h2 className={typography({ heading: 'h6' })}>
              Sign the transaction in your Xaman
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
              Open Xaman
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
