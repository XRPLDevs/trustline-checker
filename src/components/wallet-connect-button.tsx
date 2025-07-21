'use client'

import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { Button } from '@heroui/button'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@heroui/modal'
import { useWalletConnect } from '@/hooks/useWalletConnect'
import { WalletTypes, type WalletType } from '@/config/enum'
import { toastConfig } from '@/config/site'

export const WalletConnectButton = () => {
  const t = useTranslations('WalletConnectButton')
  const tErr = useTranslations('Error')

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const { onConnect } = useWalletConnect()

  const handleConnect = async (walletType: WalletType) => {
    try {
      onOpenChange()
      await onConnect(walletType)
    } catch (error) {
      let errorCode = 'E_001_001'

      if (error instanceof Error) {
        const codeMatch = error.message.match(/E_\d{3}_\d{3}/)
        console.log('codeMatch: ', codeMatch)
        if (codeMatch) {
          errorCode = codeMatch[0]
        }
      }

      toast.error(tErr('config.label'), {
        description: tErr(`msg.${errorCode}`),
        ...toastConfig
      })
    }
  }

  return (
    <>
      <Button variant="solid" color="primary" onPress={onOpen}>
        {t('label')}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {t('modal.title')}
              </ModalHeader>
              <ModalBody>
                <Button
                  color="primary"
                  onPress={() => handleConnect(WalletTypes.XAMAN)}
                >
                  Xaman
                </Button>
                <Button color="default" disabled onPress={onOpen}>
                  GemWallet
                </Button>
                <Button color="default" disabled onPress={onOpen}>
                  CROSSMARK
                </Button>
              </ModalBody>
              <ModalFooter className="flex flex-col gap-4">
                <Button color="danger" variant="flat" onPress={onClose}>
                  {t('modal.close')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
