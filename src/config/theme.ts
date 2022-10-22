import { extendTheme } from '@chakra-ui/react';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';

const CustomSteps = {
  ...Steps,
  baseStyle: (props: any) => {
    return {
      ...Steps.baseStyle(props),
      icon: {
        ...Steps.baseStyle(props).icon,
        // your custom styles here
        strokeWidth: '1px',
      },
      steps: {
        ...Steps.baseStyle(props).steps,
        sizes: {
          lg: {
            label: {
              fontSize: '10.2rem',
            }
          }
        }
      }
    };
  },
};
const theme = extendTheme({
  colors: {
    brand: {
      orange: '#FE7A2C',
    },
  },
  fonts: {
    nav: 'Montserrat',
    heading: 'Montserrat',
    body: 'Montserrat',
  },
  styles: {},
  layerStyles: {},
  components: {
    Switch: {
      variants: {
        solid: {
          bg: 'brand.orange',
          color: 'white',
        }
      }
    },
    Button: {
      variants: {
        solid: {
          bg: 'brand.orange',
          color: 'white',
          h: 35,
          w: 150,
          fontSize: 16,
          fontWeight: 500,
          _hover: {
            bg: 'brand.orange',
            opacity: 0.7,
            _disabled: {
              bgColor: 'gray.400',
              opacity: 0.7,
            },
          },
          _disabled: {
            bg: 'gray.400',
            opacity: 0.7,
          },
        },
      },

    },
    // Steps: {

    //   sizes: {
    //     sm: {
    //       stepIconContainer: {
    //         width: '40px',
    //         height: '40px',
    //         borderWidth: '1px',
    //       },
    //     }
    //   }
    // },
    Heading: {
      variants: {
        'med-dark': {
          color: '#595959',
          fontWeight: 500,
        },
        light: {
          color: 'black',
          opacity: 0.5,
          fontWeight: 500,
        },
      },
    },
    Link: {
      baseStyle: {
        color: 'brand.orange',
      },
      variants: {
        'link-hover': {
          _hover: {
            transitionDuration: '2s',
            color: 'brand.orange',
            opacity: 0.7,
            fontWeight: 800,
            borderBottomWidth: 2,
            borderBottomColor: 'brand.orange',
            textDecoration: 'none',
          },
        },
        'link-hover-active': {
          borderBottomWidth: 2,
          borderBottomColor: 'brand.orange',
          _hover: {
            transitionDuration: '2s',
            color: 'brand.orange',
            opacity: 0.7,
            fontWeight: 800,
            textDecoration: 'none',
          },
          _focus: {
            color: 'brand.orange',
            opacity: 0.7,
            textDecoration: 'none',
          },
        },
      },
    },
    Steps: CustomSteps,
    Progress: {
      baseStyle: {
        filledTrack: {
          bg: 'orange.500',
        },

      }
    }
  },
});

export default theme;
