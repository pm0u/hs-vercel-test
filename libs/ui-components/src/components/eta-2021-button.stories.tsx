import React from 'react'
import { Button } from './button'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ETA2021Button } from './eta-2021-button'

export default {
  title: 'Examples/ETA 2021 Button',
  component: ETA2021Button,
} as ComponentMeta<typeof ETA2021Button>

const Template: ComponentStory<typeof ETA2021Button> = (args) => (
  <div className="mx-auto w-min">
    <ETA2021Button {...args} />
  </div>
)

export const Blue = Template.bind({})

Blue.args = {
  label: 'Blue',
  color: 'blue',
  size: 'large'
}

export const Green = Template.bind({})

Green.args = {
  label: 'Green',
  color: 'green',
  size: 'large'
}

export const White = Template.bind({})

White.args = {
  label: 'White',
  color: 'white',
  size: 'large',
}

export const Yellow = Template.bind({})

Yellow.args = {
  label: 'Yellow',
  color: 'yellow',
  size: 'large'
}


