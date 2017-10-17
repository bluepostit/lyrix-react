import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { FilterableLyricsList } from './components/lyrics/lyrics-list.js';
import { LyricsView } from './components/lyrics/lyrics-view.js';


const Root = (props) => (
    <div className="wrapper" {...props}/>
);

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      lyricsData: {
        songs: []
      }
    };
  }

  componentDidMount() {
    console.log('did mount');
    fetch('http://localhost:8888/data/all')
    .then((data) => {
      let json = data.json();
      return json;
    }).then((json) => {
      console.log(json);
      this.setState({
        lyricsData: json
      });
    }).catch((error) => {
      console.log('Error!');
      console.log(error);
      alert(error);
    });
  }

  render() {
    let data = this.state.lyricsData;
    return (
      <Router>
        <Root>
          <Grid className="visible-md visible-lg">
            <Row className="show-grid">
              <Col md={4}>
                <div className="sidebar">
                  <FilterableLyricsList lyrics={data.songs} />
                </div>
              </Col>
              <Col md={8}>
                <div className="mainPane">
                  <Switch>
                    <Route path="/lyric/:lyricId" render={({ match }) => (
                      <LyricsView song={data.songs.find(ly => String(ly.id) === match.params.lyricId)} />
                    )}/>
                    <Route exact path="/" render={() => (
                      <h1>No Song Selected</h1>
                    )}/>
                  </Switch>
                </div>
              </Col>
            </Row>
          </Grid>
          <div className="visible-xs visible-sm">
            <Switch>
              <Route exact path="/">
                <FilterableLyricsList className="visible-xs visible-sm" lyrics={data.songs}/>
              </Route>
              <Route path="/lyric/:lyricId" render={({ match }) => (
                <LyricsView song={data.songs.find(ly => String(ly.id) === match.params.lyricId)} />
              )}/>
            </Switch>
          </div>
        </Root>
      </Router>
    );
  }
}

export default MainPage;
