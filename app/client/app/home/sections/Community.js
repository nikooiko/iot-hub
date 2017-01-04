import React from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';
import WorldMap from 'grommet/components/WorldMap';
import Legend from 'grommet/components/Legend';
import { reqPopulationPerContinent } from '../store/homeActions';

const defaultSeries = [
  {
    'continent': 'NorthAmerica',
    'label': 'North America',
    'value': 0,
    'colorIndex': 'graph-1',
  },
  {
    'continent': 'SouthAmerica',
    'label': 'South America',
    'value': 0,
    'colorIndex': 'accent-2',
  },
  {
    'continent': 'Europe',
    'label': 'Europe',
    'value': 0,
    'colorIndex': 'accent-1',
  },
  {
    'continent': 'Africa',
    'label': 'Africa',
    'value': 0,
    'colorIndex': 'graph-2',
  },
  {
    'continent': 'Asia',
    'label': 'Asia',
    'value': 0,
    'colorIndex': 'graph-3',
  },
  {
    'continent': 'Australia',
    'label': 'Australia',
    'value': 0,
    'colorIndex': 'graph-4',
  }
];

class Community extends React.Component {
  constructor(props, content) {
    super(props, content);
  }

  componentDidMount() {
    this.props.reqPopulationPerContinent()
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const populationPerContinent = this.props.populationPerContinent;
    const series = [];
    const legendSeries = [];
    defaultSeries.forEach((defaultContinent) => {
      const continent = {
        ...defaultContinent
      };
      if (populationPerContinent && populationPerContinent[continent.continent] > 0) {
        continent.value = populationPerContinent[continent.continent];
        legendSeries.push(continent);
      } else {
        continent.colorIndex = 'unset';
      }
      series.push(continent);
    });

    let headlineSize = 'medium';
    // Calculate Responsive values
    const mediaType = this.props.mediaType;
    if (mediaType === 'palm') {
      headlineSize = 'small';
    }
    return (
      <Box flex={true} responsive={false} justify='center' align='center'>
        <Headline strong={true} size={headlineSize}>
          Community
        </Headline>
        <Box size='large'>
          <WorldMap series={series} />
        </Box>
        <Legend series={legendSeries} onClick={false} total={true} announce={true} />
      </Box>
    )
  }
}

const mapStateToProps = (state) => ({
  populationPerContinent: state.home.populationPerContinent,
  mediaType: state.browser.mediaType
});

export default connect(mapStateToProps, {reqPopulationPerContinent})(Community);