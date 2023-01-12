import { Stack, Card, Flex, Text } from "@sanity/ui"
import { NavbarProps } from "sanity"
import React from "react"

export const DatasetNavbar = (props: NavbarProps) => {
  const dataset = import.meta.env.SANITY_STUDIO_DATASET ?? "staging"

  const isStaging = dataset === "staging"

  const message = isStaging
    ? "⚠️ STAGING DATASET ⚠️ - EDITING NON LIVE DATA!"
    : "Production"
  return (
    <Stack>
      <Card padding={3} tone={isStaging ? "critical" : "default"}>
        <Flex justify="center">
          <Text accent={isStaging}>{message}</Text>
        </Flex>
      </Card>
      <>{props.renderDefault(props)}</>
    </Stack>
  )
}
