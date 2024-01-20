/* eslint-disable prettier/prettier */
import { Box, Container, Typography } from '@mui/material'
import { getColorLightness } from './convertHclToHsl';
// import { colorsLCH } from './colorsLCH';
import { colorsHSL } from './colorsHSL';

interface ColorProps {
    colorName: string[]
}

const ColorBox: React.FC<ColorProps> = ({ colorName }) => {

    

    const getTextColor = (backgroundColor: string) => {
        // Extract lightness value from HSL color
       const lightness = getColorLightness(backgroundColor); 

    return lightness !== null && lightness > 50 ? 'black' : 'white';
    };


    return (
        <Container>
            <Box sx={{ display: 'flex' }}>
                {colorName.map((color, index) => (
                    <Box key={index} sx={{ 
                        backgroundColor: color,
                        height: 40, 
                        width: 100}}>
                        <Typography variant='body2' sx={{ fontSize: 10,
                        color: getTextColor(color) }}>{color}</Typography> 
                    </Box> 
                ))}
            </Box>
        </Container>
    )
}

const Tint = () => {

    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
        {/* <Box sx={{width: 700}}>
                {Object.values(colorsLCH).map((colorArray, index) => (
                    <ColorBox key={index} colorName={colorArray} />
                ))}
            </Box>
        */}
            <Box sx={{width: 700}}>
                {Object.values(colorsHSL).map((colorArray, index) => (
                    <ColorBox key={index} colorName={colorArray} />
                ))}
            </Box>           
        </Box>
    )
}

export default Tint




