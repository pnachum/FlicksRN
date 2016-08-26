/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import MovieShape from './MovieShape';
import { getImageUri } from './Api';
import Rating from './Rating';
import { getYear } from './getYear';
import BackdropImage from './BackdropImage';

const propTypes = {
  movie: MovieShape,
};

export default class MovieDetail extends Component {

  state = { width: 0, height: 0 }

  onLayout = ({ nativeEvent }) => {
    const { width, height } = nativeEvent.layout;
    this.setState({ width, height });
  }

  render() {
    const {
      movie: {
        backdrop_path,
        poster_path,
        overview,
        release_date,
        title,
        video,
        vote_average,
      }
    } = this.props;

    const { width, height } = this.state;
    const isLandscape = width > height;
    return (
      <View style={[styles.container, isLandscape && styles.row]} onLayout={this.onLayout}>
        <BackdropImage
          deviceWidth={width}
          deviceHeight={height}
          source={getImageUri(backdrop_path || poster_path)}
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text>{getYear(release_date)}</Text>
          <Rating rating={vote_average} />
          <Text>{overview}</Text>
        </View>
      </View>
    );
  }
}

MovieDetail.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    marginTop: 63,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    // justifyContent: 'space-around',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  detailsContainer: {
    margin: 10,
    flex: 1,
    justifyContent: 'space-around'
  }
});
