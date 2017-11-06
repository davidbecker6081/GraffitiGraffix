import React, { Component } from 'react';
import Filter from '../Filter/Filter';
import './Artists.css';
import SingleArtist from '../SingleArtist/SingleArtist';
import missingImg from '../assets/missingImg.jpg';
import missingTag from '../assets/missing-tag.png';

export default class Artists extends Component {
  constructor() {
    super();
    this.state = {
      artists: []
    };
    this.sortNewest = this.sortNewest.bind(this);
    this.sortAlphabetically = this.sortAlphabetically.bind(this);
  }

  componentDidMount() {
    return Promise.all([
      this.fetchArtists(),
      this.fetchImages()
    ]).then(response =>
      this.setState({ artists: this.assignImages(response[0], response[1]) })
    );
  }

  fetchArtists() {
    return fetch('http://localhost:3001/api/v1/users')
      .then(response => response.json())
      .then(artists => artists);
  }

  fetchImages() {
    return fetch('http://localhost:3001/api/v1/images')
      .then(response => response.json())
      .then(images => images);
  }

  assignImages(artists, images) {
    return artists.map((artist, i) => {
      const artistImages = images.filter(image => image.user_id === artist.id);
      for (let j = 0; j < 3; j++) {
        if (!artistImages[j]) {
          artistImages.push({ url: missingImg });
        }
      }

      if (!artist.tag) {
        artist.tag = missingTag;
      }
      return Object.assign({}, artist, {
        latestImages: artistImages.slice(0, 3)
      });
    });
  }

  sortNewest() {
    const { artists } = this.state;
    const datedArtists = artists.map(artist => {
      artist.created_at = artist.created_at.split(' ')[0].split('T')[0]
      return artist
    })
    const sortedArtists = datedArtists.sort((a, b) => a.created_at < b.created_at)

    this.setState({artists: sortedArtists})
  }

  sortAlphabetically() {
    
  }

  render() {
    const artistList = this.state.artists.map((artist, i) =>
      <SingleArtist key={i} {...artist} />
    );

    return (
      <section className="l-artists">
        <Filter sortNewest={this.sortNewest} sortAlphabetically={this.sortAlphabetically}/>
        {artistList}
      </section>
    );
  }
}
