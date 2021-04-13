import React from 'react'

import Box from 'components/Box'
import {
  MeilisearchLogo as MeilisearchLogoIcon,
  ArrowDown as ArrowDownIcon,
  Cross as CrossIcon,
  DocumentBig as DocumentBigIcon,
  DocumentMedium as DocumentMediumIcon,
  GithubLogo as GithubLogoIcon,
  Indexes as IndexesIcon,
  InterrogationMark as InterrogationMarkIcon,
  Key as KeyIcon,
  KeyBig as KeyBigIcon,
  LogoText as LogoTextIcon,
  Picture as PictureIcon,
  SearchMedium as SearchMediumIcon,
  SearchSmall as SearchSmallIcon,
  SettingsMedium as SettingsMediumIcon,
  SettingsBig as SettingsBigIcon,
  SlackLogo as SlackLogoIcon,
  Speed as SpeedIcon,
} from 'components/icons'

export default {
  title: 'Components/Icons',
}

const Template = (args) => <Box style={{ maxWidth: 64 }} {...args} />

export const MeilisearchLogo = Template.bind({})
MeilisearchLogo.args = {
  children: <MeilisearchLogoIcon />,
}

export const ArrowDown = Template.bind({})
ArrowDown.args = {
  children: <ArrowDownIcon />,
}

export const Cross = Template.bind({})
Cross.args = {
  children: <CrossIcon />,
}

export const DocumentBig = Template.bind({})
DocumentBig.args = {
  children: <DocumentBigIcon />,
}

export const DocumentMedium = Template.bind({})
DocumentMedium.args = {
  children: <DocumentMediumIcon />,
}

export const Github = Template.bind({})
Github.args = {
  children: <GithubLogoIcon />,
}

export const Indexes = Template.bind({})
Indexes.args = {
  children: <IndexesIcon />,
}

export const InterrogationMark = Template.bind({})
InterrogationMark.args = {
  children: <InterrogationMarkIcon />,
}

export const Key = Template.bind({})
Key.args = {
  children: <KeyIcon />,
}

export const KeyBig = Template.bind({})
KeyBig.args = {
  children: <KeyBigIcon />,
}

export const LogoText = Template.bind({})
LogoText.args = {
  children: <LogoTextIcon width={200} />,
}

export const Picture = Template.bind({})
Picture.args = {
  children: <PictureIcon />,
}

export const SearchSmall = Template.bind({})
SearchSmall.args = {
  children: <SearchSmallIcon />,
}

export const SearchMedium = Template.bind({})
SearchMedium.args = {
  children: <SearchMediumIcon />,
}

export const SettingsMedium = Template.bind({})
SettingsMedium.args = {
  children: <SettingsMediumIcon />,
}

export const SettingsBig = Template.bind({})
SettingsBig.args = {
  children: <SettingsBigIcon />,
}

export const SlackLogo = Template.bind({})
SlackLogo.args = {
  children: <SlackLogoIcon />,
}

export const Speed = Template.bind({})
Speed.args = {
  children: <SpeedIcon />,
}
