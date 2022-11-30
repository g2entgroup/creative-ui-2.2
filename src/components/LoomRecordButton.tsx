import { setup, isSupported } from '@loomhq/record-sdk'
import { oembed } from '@loomhq/loom-embed'
import { useEffect, useState } from 'react'
import { useColorModeValue } from '@chakra-ui/system'
import { Box, Button, IconButton, Text } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

const PUBLIC_APP_ID = '15fad114-5456-481f-8047-223893e0fc4f' //process.env.NEXT_PUBLIC_LOOM
const BUTTON_ID = 'loom-record-sdk-button'

const LoomRecordButton = (props: {
  onVideoChange?: (videoUrl: string) => void
}) => {
  const [disabled, setDisabled] = useState(false)
  const [videoHTML, setVideoHTML] = useState('')

  useEffect(() => {
    async function setupLoom() {
      const { supported, error } = await isSupported()

      if (!supported) {
        console.warn(`Error setting up Loom: ${error}`)
        setDisabled(true)
        return
      }

      const button = document.getElementById(BUTTON_ID)

      if (!button) return

      const { configureButton } = await setup({
        publicAppId: PUBLIC_APP_ID,
      })

      const sdkButton = configureButton({ element: button })

      sdkButton.on('insert-click', async (video) => {
        console.log(video)
        const { html } = await oembed(video.sharedUrl, { width: 400 })
        setVideoHTML(html)
        props.onVideoChange?.(video.sharedUrl)
      })
    }

    setupLoom()
  }, [videoHTML])

  return (
    <>
      <Box display="flex" gap={2} alignItems="center">
        {!videoHTML && (
          <Button
            id={BUTTON_ID}
            color={useColorModeValue('gray.700', 'gray.50')}
            isDisabled={disabled}
          >
            Record
          </Button>
        )}
        {disabled && (
          <Text color={useColorModeValue('gray.500', 'gray.400')} fontSize="sm">
            Unsupported Browser
          </Text>
        )}
      </Box>
      {videoHTML && (
        <Box display="flex" gap={2} alignItems="center">
          <div dangerouslySetInnerHTML={{ __html: videoHTML }}></div>
          <IconButton
            aria-label="close"
            icon={<DeleteIcon />}
            onClick={() => {
              setVideoHTML('')
              props.onVideoChange?.('')
            }}
          />
        </Box>
      )}
    </>
  )
}

export default LoomRecordButton
