import React from 'react';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Image from 'grommet/components/Image';
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
        <Section align='center' textAlign='center'>
          <Heading id='what'>
            What is IOTHub?
          </Heading>
          <Paragraph>
            This application is a device hub micro service, where <b>owners</b> (or consumers) can
            <b> connect</b> with their <b>devices</b>, monitor their status, control them and
            consume their data.
            <br /><br />
            Its main purpose is to serve other applications as a <b>stream</b> of incoming sensor's
            data.
            <br /><br />
            It can be used as a <b>multiplexer</b> and a <b>processor</b> of these data where many
            applications of the same owner can connect and receive <b>concurrently real-time
            data</b>.
          </Paragraph>
        </Section>
        <Section align='center' textAlign='center'>
          <Heading id='why'>
            Why should someone use it?
          </Heading>
          <Paragraph>
            All <b>IOT</b> applications receive <b>sensor's data</b> and pass them to other
            applications or services (ex analytics). Creating this functionality can be really
            <b> time consuming process</b>, especially if it isn't created as a <b>modular</b> and
            <b> easy to scale</b> service.
            <br /><br />
            IOTHub is designed with this problem in mind. It's <b>architecture</b> allows it to act
            as a <b>microservice</b> of a bigger application, but also as a stand-alone application
            that <b>collects</b> and <b>process</b> device data. Additionally it is designed to act
            as a stream of incoming data, so that owners only have to connect to it and instantly
            receive data.
          </Paragraph>
        </Section>
        <Section align='center' textAlign='center'>
          <Heading id='how'>
            How to use it?
          </Heading>
          <Paragraph>
            1. Create account and login
            <br/><br/>
            2. At your dashboard you can find your <b>owner ID</b>, under user information.
            <br/><br/>
            3. Download the
            <Anchor
              label=' IOTDevice ' href="https://github.com/nikooiko/iot-device" target='_blank'
            />
            application and replace the owner ID at it's configuration file (app/config.json).
            <br/><br/>
            <i>
              * In the future we will provide the API in order to give you the option to create
              your custom made iot devices
            </i>
          </Paragraph>
        </Section>
        <Section align='center' textAlign='center'>
          <Heading>
            Developer's Info
          </Heading>
          <Box>
            <Image
              src={myImage} alt='Nick Oikonomou Image' size={imgSize} className='my-image'
            />
          </Box>
          <Box pad={{ vertical: 'medium' }}>
            <Heading tag='h3'>
              Nick Oikonomou
            </Heading>
            <Paragraph margin='none'>
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
