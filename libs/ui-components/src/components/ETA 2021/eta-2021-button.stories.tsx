import React from 'react'
import { Button } from '../button'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ETA2021Button } from './eta-2021-button'

export default {
  title: 'Components/ETA 2021/Button',
  component: ETA2021Button,
} as ComponentMeta<typeof ETA2021Button>

const Template: ComponentStory<typeof ETA2021Button> = (args) => (
  <div className="mx-auto w-min">
    <ETA2021Button {...args} />
  </div>
)

export const Blue = Template.bind({})

Blue.args = {
  children: 'See if you\'ve won',
  color: 'blue',
  size: 'large'
}

export const Green = Template.bind({})

Green.args = {
  children: 'Watch the event',
  color: 'green',
  size: 'large'
}

export const WhiteSmall = Template.bind({})

WhiteSmall.args = {
  children: 'See the winners',
  color: 'white',
  size: 'small',
}

export const Yellow = Template.bind({})

Yellow.args = {
  children: 'Share on LinkedIn!',
  color: 'yellow',
  size: 'large'
}


