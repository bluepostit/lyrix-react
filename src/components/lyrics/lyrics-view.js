import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

class LyricsView extends Component {
  render() {
    let song = this.props.song;
    if (!!song && !!song.artist_name) {
      return (
        <Grid className="lyrics-container">
          <Row className="show-grid">
            <Col xs={12} md={8}>
              <h1 className="title">{song.title}</h1>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={8}><h2 className="artist">{song.artist_name}</h2></Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={8}><div className="lyrics">{song.lyrics}</div></Col>
          </Row>
        </Grid>
      );
    } else {
      return (
        <h3>No Song Selected</h3>
      );
    }
  }
}

export { LyricsView };