import React from 'react'
import {
    Box,
    Container,
    Grid,
    Typography,
    IconButton,
    Link,
} from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import EmailIcon from '@mui/icons-material/Email'
import TypographyTitle from '../components/TypographyTitle'

const links = [
    { text: 'Privacy Policy', url: '/privacy-policy' },
    { text: 'Terms of Service', url: '/terms-of-service' },
    { text: 'Cookie Policy', url: '/cookie-policy' },
    { text: 'Sitemap', url: '/sitemap' },
]

const socialMediaLinks = [
    { platform: 'Email', icon: EmailIcon, url: 'mailto:your@email.com' },
    {
        platform: 'Instagram',
        icon: InstagramIcon,
        url: 'https://www.instagram.com/your_instagram',
    },
    {
        platform: 'Facebook',
        icon: FacebookIcon,
        url: 'https://www.facebook.com/your_facebook',
    },
    {
        platform: 'Twitter',
        icon: TwitterIcon,
        url: 'https://twitter.com/your_twitter',
    },
]

const Footer = () => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '280px',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                p: 4,
                mt: 'auto',
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h6" color="inherit" mt="1rem">
                        Follow us on
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {socialMediaLinks.map((socialMediaLink, index) => (
                            <IconButton
                                key={index}
                                component={Link}
                                href={socialMediaLink.url}
                                color="inherit"
                            >
                                <socialMediaLink.icon />
                            </IconButton>
                        ))}
                    </Box>
                    <Box width="70%">
                        <Grid
                            container
                            spacing={2}
                            justifyContent="center"
                            mt="1rem"
                        >
                            {links.map((link, index) => (
                                <Grid item key={index} xs={6} sm={6} md={3}>
                                    <Box display="flex" justifyContent="center">
                                        <Typography variant="body2">
                                            <Link
                                                href={link.url}
                                                color="inherit"
                                                //sx={{ mr: 2 }}
                                            >
                                                {link.text}
                                            </Link>
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        mt="1rem"
                    >
                        <Typography variant="body2" color="inherit">
                            © {new Date().getFullYear()}
                        </Typography>
                        <TypographyTitle
                            color="primary.contrastText"
                            fontSize="16px"
                        />
                        <Typography variant="body2" color="inherit">
                            . All rights reserved.
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Footer
