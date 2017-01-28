import React from 'react';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Image from 'grommet/components/Image';
import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';
import BackIcon from 'grommet/components/icons/base/LinkPrevious';
import GitHubIcon from 'grommet/components/icons/base/SocialGithub';
import LinkedInIcon from 'grommet/components/icons/base/SocialLinkedin';

const myImage = '/static/myImage.jpg';

class AboutUs extends React.Component {
  render() {
    let imgSize = 'small';

    return (
      <Article>
        <Header
          colorIndex='light-2'
          size='medium' pad={{ horizontal: 'medium', between: 'medium' }}
        >
          <Anchor
            icon={<BackIcon />}
            label='Go Back'
            animateIcon={true}
            path='/'
          />
        </Header>
        <Section align='center'>
          <Heading>
            What is IOTHub?
          </Heading>
          <Paragraph>
            TODO
          </Paragraph>
        </Section>
        <Section align='center'>
          <Heading>
            Why should someone use it?
          </Heading>
          <Paragraph>
            TODO
          </Paragraph>
        </Section>
        <Section align='center'>
          <Heading>
            How to use it?
          </Heading>
          <Paragraph>
            TODO
          </Paragraph>
        </Section>
        <Section align='center'>
          <Heading>
            Developer's Info
          </Heading>
          <Box>
            <Image
              src={myImage} alt='Nick Oikonomou Image' size={imgSize} className='my-image'
            />
          </Box>
          <Box align='center' pad={{ vertical: 'medium' }}>
            <Heading tag='h3'>
              Nick Oikonomou
            </Heading>
            <Paragraph align='center' margin='none'>
              For any additional information contact me at: <b>nikooiko@inf.uth.gr</b><br />
              Also you can find me at:
              <Anchor
                href="https://github.com/nikooiko" icon={<GitHubIcon />} target='_blank'
                animateIcon={true}
              />
              <Anchor
                href="https://gr.linkedin.com/in/nick-oikonomou-gr" icon={<LinkedInIcon />}
                animateIcon={true} target='_blank'
              />
            </Paragraph>
          </Box>
        </Section>
      </Article>
    )
  }
}

export default AboutUs;
